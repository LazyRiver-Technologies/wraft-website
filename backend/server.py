from pathlib import Path
from dotenv import load_dotenv
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import logging
import uuid
import secrets
import bcrypt
import jwt as pyjwt
from datetime import datetime, timezone, timedelta
from typing import List, Optional
from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, UploadFile, File, Form, Depends
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from bson import ObjectId
import io

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ── Config ──
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
JWT_SECRET = os.environ.get('JWT_SECRET', 'change-me')
JWT_ALGORITHM = "HS256"
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:3000')

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ── Password helpers ──
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

# ── JWT helpers ──
def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(hours=24), "type": "access"}
    return pyjwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "refresh"}
    return pyjwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def set_auth_cookies(response: Response, access_token: str, refresh_token: str):
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=True, samesite="none", max_age=86400, path="/")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=True, samesite="none", max_age=604800, path="/")

# ── Auth middleware ──
async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = pyjwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["id"] = str(user["_id"])
        del user["_id"]
        user.pop("password_hash", None)
        return user
    except pyjwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except pyjwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def user_response(user_doc: dict) -> dict:
    result = {k: v for k, v in user_doc.items() if k != "_id" and k != "password_hash"}
    result["id"] = str(user_doc["_id"])
    if "created_at" in result and isinstance(result["created_at"], datetime):
        result["created_at"] = result["created_at"].isoformat()
    if "updated_at" in result and isinstance(result["updated_at"], datetime):
        result["updated_at"] = result["updated_at"].isoformat()
    return result

# ── Auth Models ──
class RegisterInput(BaseModel):
    email: str
    password: str
    name: str = ""

class LoginInput(BaseModel):
    email: str
    password: str

# ── Auth Routes ──
@api_router.post("/auth/register")
async def register(input: RegisterInput, response: Response):
    email = input.email.strip().lower()
    if await db.users.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    user_doc = {
        "email": email,
        "password_hash": hash_password(input.password),
        "name": input.name or email.split("@")[0],
        "role": "user",
        "plan": "free",
        "monthly_message_count": 0,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }
    result = await db.users.insert_one(user_doc)
    user_doc["_id"] = result.inserted_id
    access_token = create_access_token(str(result.inserted_id), email)
    refresh_token = create_refresh_token(str(result.inserted_id))
    set_auth_cookies(response, access_token, refresh_token)
    return {**user_response(user_doc), "access_token": access_token}

@api_router.post("/auth/login")
async def login(input: LoginInput, request: Request, response: Response):
    email = input.email.strip().lower()
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{email}"
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    if attempt and attempt.get("count", 0) >= 5:
        lockout_until = attempt.get("locked_until")
        if lockout_until and datetime.now(timezone.utc) < lockout_until:
            raise HTTPException(status_code=429, detail="Too many attempts. Try again in 15 minutes.")
        else:
            await db.login_attempts.delete_one({"identifier": identifier})
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(input.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$inc": {"count": 1}, "$set": {"locked_until": datetime.now(timezone.utc) + timedelta(minutes=15)}},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")
    await db.login_attempts.delete_one({"identifier": identifier})
    access_token = create_access_token(str(user["_id"]), email)
    refresh_token = create_refresh_token(str(user["_id"]))
    set_auth_cookies(response, access_token, refresh_token)
    return {**user_response(user), "access_token": access_token}

@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Logged out"}

@api_router.get("/auth/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    return user

@api_router.post("/auth/refresh")
async def refresh_token(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = pyjwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        access_token = create_access_token(str(user["_id"]), user["email"])
        set_auth_cookies(response, access_token, token)
        return {"access_token": access_token}
    except pyjwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

# ── Bot Models ──
class BotCreate(BaseModel):
    name: str
    system_prompt: str = "You are a helpful assistant. Answer only from the provided context."

class BotUpdate(BaseModel):
    name: Optional[str] = None
    system_prompt: Optional[str] = None
    is_active: Optional[bool] = None

# ── Bot Routes ──
@api_router.post("/bots")
async def create_bot(input: BotCreate, request: Request):
    user = await get_current_user(request)
    slug = input.name.lower().replace(" ", "-") + "-" + str(uuid.uuid4())[:6]
    bot_doc = {
        "owner_id": user["id"],
        "name": input.name,
        "slug": slug,
        "system_prompt": input.system_prompt,
        "is_active": True,
        "source_count": 0,
        "message_count": 0,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }
    result = await db.bots.insert_one(bot_doc)
    bot_doc["id"] = str(result.inserted_id)
    del bot_doc["_id"]
    for k in ["created_at", "updated_at"]:
        if isinstance(bot_doc.get(k), datetime):
            bot_doc[k] = bot_doc[k].isoformat()
    return bot_doc

@api_router.get("/bots")
async def list_bots(request: Request):
    user = await get_current_user(request)
    bots = await db.bots.find({"owner_id": user["id"]}, {"_id": 1, "name": 1, "slug": 1, "is_active": 1, "source_count": 1, "message_count": 1, "created_at": 1, "updated_at": 1}).to_list(100)
    for b in bots:
        b["id"] = str(b["_id"])
        del b["_id"]
        for k in ["created_at", "updated_at"]:
            if isinstance(b.get(k), datetime):
                b[k] = b[k].isoformat()
    return bots

@api_router.get("/bots/{bot_id}")
async def get_bot(bot_id: str, request: Request):
    user = await get_current_user(request)
    bot = await db.bots.find_one({"_id": ObjectId(bot_id), "owner_id": user["id"]})
    if not bot:
        raise HTTPException(status_code=404, detail="Bot not found")
    bot["id"] = str(bot["_id"])
    del bot["_id"]
    for k in ["created_at", "updated_at"]:
        if isinstance(bot.get(k), datetime):
            bot[k] = bot[k].isoformat()
    sources = await db.data_sources.find({"bot_id": bot_id}, {"_id": 1, "name": 1, "type": 1, "status": 1, "chunk_count": 1, "created_at": 1}).to_list(100)
    for s in sources:
        s["id"] = str(s["_id"])
        del s["_id"]
        if isinstance(s.get("created_at"), datetime):
            s["created_at"] = s["created_at"].isoformat()
    bot["sources"] = sources
    whatsapp = await db.whatsapp_configs.find_one({"bot_id": bot_id}, {"_id": 0})
    bot["whatsapp"] = whatsapp
    return bot

@api_router.put("/bots/{bot_id}")
async def update_bot(bot_id: str, input: BotUpdate, request: Request):
    user = await get_current_user(request)
    updates = {k: v for k, v in input.model_dump().items() if v is not None}
    updates["updated_at"] = datetime.now(timezone.utc)
    result = await db.bots.update_one({"_id": ObjectId(bot_id), "owner_id": user["id"]}, {"$set": updates})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Bot not found")
    return {"message": "Updated"}

@api_router.delete("/bots/{bot_id}")
async def delete_bot(bot_id: str, request: Request):
    user = await get_current_user(request)
    result = await db.bots.delete_one({"_id": ObjectId(bot_id), "owner_id": user["id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Bot not found")
    await db.data_sources.delete_many({"bot_id": bot_id})
    return {"message": "Deleted"}

# ── Data Source Routes ──
@api_router.post("/bots/{bot_id}/sources")
async def add_source(bot_id: str, request: Request, source_type: str = Form(...), name: str = Form(""), content: str = Form(""), file: Optional[UploadFile] = File(None)):
    user = await get_current_user(request)
    bot = await db.bots.find_one({"_id": ObjectId(bot_id), "owner_id": user["id"]})
    if not bot:
        raise HTTPException(status_code=404, detail="Bot not found")
    raw_text = ""
    if source_type == "text":
        raw_text = content
        name = name or "Text Input"
    elif source_type == "url":
        name = name or content
        try:
            import requests as req
            from bs4 import BeautifulSoup
            resp = req.get(content, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
            soup = BeautifulSoup(resp.text, "html.parser")
            for tag in soup(["script", "style", "nav", "footer", "header"]):
                tag.decompose()
            raw_text = soup.get_text(separator="\n", strip=True)[:10000]
        except Exception as e:
            raw_text = f"Could not fetch URL: {str(e)}"
    elif source_type == "pdf" and file:
        name = name or file.filename
        try:
            from PyPDF2 import PdfReader
            file_bytes = await file.read()
            reader = PdfReader(io.BytesIO(file_bytes))
            raw_text = "\n".join(page.extract_text() or "" for page in reader.pages)[:15000]
        except Exception as e:
            raw_text = f"Could not parse PDF: {str(e)}"
    else:
        raise HTTPException(status_code=400, detail="Invalid source type")

    source_doc = {
        "bot_id": bot_id,
        "type": source_type,
        "name": name,
        "status": "ready",
        "raw_text": raw_text,
        "chunk_count": len(raw_text) // 500 + 1,
        "created_at": datetime.now(timezone.utc),
    }
    result = await db.data_sources.insert_one(source_doc)
    await db.bots.update_one({"_id": ObjectId(bot_id)}, {"$inc": {"source_count": 1}})
    source_doc["id"] = str(result.inserted_id)
    del source_doc["_id"]
    source_doc["created_at"] = source_doc["created_at"].isoformat()
    source_doc.pop("raw_text", None)
    return source_doc

@api_router.delete("/bots/{bot_id}/sources/{source_id}")
async def delete_source(bot_id: str, source_id: str, request: Request):
    user = await get_current_user(request)
    bot = await db.bots.find_one({"_id": ObjectId(bot_id), "owner_id": user["id"]})
    if not bot:
        raise HTTPException(status_code=404, detail="Bot not found")
    result = await db.data_sources.delete_one({"_id": ObjectId(source_id), "bot_id": bot_id})
    if result.deleted_count:
        await db.bots.update_one({"_id": ObjectId(bot_id)}, {"$inc": {"source_count": -1}})
    return {"message": "Deleted"}

# ── Bot Chat Route ──
@api_router.post("/bots/{bot_id}/chat")
async def bot_chat(bot_id: str, request: Request):
    user = await get_current_user(request)
    body = await request.json()
    message = body.get("message", "")
    bot = await db.bots.find_one({"_id": ObjectId(bot_id), "owner_id": user["id"]})
    if not bot:
        raise HTTPException(status_code=404, detail="Bot not found")
    sources = await db.data_sources.find({"bot_id": bot_id}, {"raw_text": 1}).to_list(50)
    context = "\n\n---\n\n".join(s.get("raw_text", "") for s in sources if s.get("raw_text"))
    if not context:
        return {"reply": "No documents uploaded yet. Please add some data sources first.", "sources_used": 0}
    system_prompt = bot.get("system_prompt", "You are a helpful assistant.") + f"\n\nUse ONLY the following context to answer. If the answer is not in the context, say so.\n\nCONTEXT:\n{context[:8000]}"
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        chat = LlmChat(api_key=EMERGENT_LLM_KEY, session_id=f"bot-{bot_id}-{uuid.uuid4().hex[:8]}", system_message=system_prompt)
        chat.with_model("gemini", "gemini-2.5-flash")
        response = await chat.send_message(UserMessage(text=message))
        await db.bots.update_one({"_id": ObjectId(bot_id)}, {"$inc": {"message_count": 1}})
        return {"reply": response, "sources_used": len(sources)}
    except Exception as e:
        logger.error(f"Chat error: {e}")
        return {"reply": f"Error generating response: {str(e)}", "sources_used": 0}

# ── Demo Routes ──
class DemoStart(BaseModel):
    text: str = ""
    url: str = ""

@api_router.post("/demo/start")
async def demo_start(input: DemoStart):
    raw_text = ""
    source_name = ""
    if input.text:
        raw_text = input.text[:10000]
        source_name = "Text input"
    elif input.url:
        source_name = input.url
        try:
            import requests as req
            from bs4 import BeautifulSoup
            resp = req.get(input.url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
            soup = BeautifulSoup(resp.text, "html.parser")
            for tag in soup(["script", "style", "nav", "footer", "header"]):
                tag.decompose()
            raw_text = soup.get_text(separator="\n", strip=True)[:10000]
        except Exception as e:
            raw_text = f"Could not fetch: {str(e)}"
    if not raw_text:
        raise HTTPException(status_code=400, detail="Provide text or a URL")
    session_id = str(uuid.uuid4())
    await db.demo_sessions.insert_one({
        "session_id": session_id,
        "raw_text": raw_text,
        "source_name": source_name,
        "message_count": 0,
        "created_at": datetime.now(timezone.utc),
    })
    return {"session_id": session_id, "source_name": source_name, "text_length": len(raw_text)}

@api_router.post("/demo/upload")
async def demo_upload(file: UploadFile = File(...)):
    try:
        from PyPDF2 import PdfReader
        file_bytes = await file.read()
        reader = PdfReader(io.BytesIO(file_bytes))
        raw_text = "\n".join(page.extract_text() or "" for page in reader.pages)[:10000]
    except Exception:
        raw_text = (await file.read()).decode("utf-8", errors="ignore")[:10000]
    session_id = str(uuid.uuid4())
    await db.demo_sessions.insert_one({
        "session_id": session_id,
        "raw_text": raw_text,
        "source_name": file.filename,
        "message_count": 0,
        "created_at": datetime.now(timezone.utc),
    })
    return {"session_id": session_id, "source_name": file.filename, "text_length": len(raw_text)}

class DemoChat(BaseModel):
    session_id: str
    message: str

@api_router.post("/demo/chat")
async def demo_chat(input: DemoChat):
    session = await db.demo_sessions.find_one({"session_id": input.session_id})
    if not session:
        raise HTTPException(status_code=404, detail="Demo session not found")
    if session.get("message_count", 0) >= 2:
        return {"reply": "", "limit_reached": True, "message_count": session["message_count"]}
    context = session.get("raw_text", "")
    system_prompt = f"You are a helpful AI assistant for a business. Answer questions ONLY based on the following business data. Be concise and helpful. If the answer is not in the data, say you don't have that information.\n\nBUSINESS DATA:\n{context[:8000]}"
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        chat = LlmChat(api_key=EMERGENT_LLM_KEY, session_id=f"demo-{input.session_id}", system_message=system_prompt)
        chat.with_model("gemini", "gemini-2.5-flash")
        response = await chat.send_message(UserMessage(text=input.message))
        new_count = session.get("message_count", 0) + 1
        await db.demo_sessions.update_one({"session_id": input.session_id}, {"$inc": {"message_count": 1}})
        return {"reply": response, "limit_reached": new_count >= 2, "message_count": new_count}
    except Exception as e:
        logger.error(f"Demo chat error: {e}")
        return {"reply": f"Error: {str(e)}", "limit_reached": False, "message_count": session.get("message_count", 0)}

# ── Plans Route ──
@api_router.get("/plans")
async def get_plans():
    return [
        {"id": "free", "name": "Free", "price": 0, "messages": 50, "features": ["50 AI messages/mo", "1 WhatsApp agent", "Basic document upload", "Website preview"]},
        {"id": "standard", "name": "Standard", "price": 999, "messages": 2000, "features": ["2,000 AI messages/mo", "WhatsApp + Website", "Unlimited uploads", "Multilingual (10+)", "Free setup", "Email support"]},
        {"id": "pro", "name": "Pro", "price": 1899, "messages": 8000, "features": ["8,000 AI messages/mo", "Everything in Standard", "Priority support", "Advanced analytics", "Custom branding", "API access"]},
        {"id": "business", "name": "Business", "price": 4999, "messages": 40000, "features": ["40,000 AI messages/mo", "Everything in Pro", "Dedicated manager", "24/7 phone support", "Custom integrations", "SLA guarantee"]},
    ]

# ── Payment Routes (MOCKED - needs real Razorpay keys) ──
@api_router.post("/payments/create-order")
async def create_payment_order(request: Request):
    body = await request.json()
    plan_id = body.get("plan_id")
    plans = {"standard": 99900, "pro": 189900, "business": 499900}
    amount = plans.get(plan_id)
    if not amount:
        raise HTTPException(status_code=400, detail="Invalid plan")
    try:
        import razorpay as rzp
        rz_client = rzp.Client(auth=(os.environ.get("RAZORPAY_KEY_ID", ""), os.environ.get("RAZORPAY_KEY_SECRET", "")))
        order = rz_client.order.create({"amount": amount, "currency": "INR", "payment_capture": 1})
        return order
    except Exception as e:
        return {"id": f"order_mock_{uuid.uuid4().hex[:12]}", "amount": amount, "currency": "INR", "status": "created", "mocked": True, "note": "Razorpay keys not configured. Add real keys to .env"}

# ── WhatsApp Config Routes ──
class WhatsAppConfig(BaseModel):
    phone_number_id: str = ""
    waba_id: str = ""
    access_token: str = ""
    verify_token: str = ""

@api_router.post("/bots/{bot_id}/whatsapp")
async def save_whatsapp_config(bot_id: str, config: WhatsAppConfig, request: Request):
    user = await get_current_user(request)
    bot = await db.bots.find_one({"_id": ObjectId(bot_id), "owner_id": user["id"]})
    if not bot:
        raise HTTPException(status_code=404, detail="Bot not found")
    await db.whatsapp_configs.update_one(
        {"bot_id": bot_id},
        {"$set": {
            "bot_id": bot_id,
            "phone_number_id": config.phone_number_id,
            "waba_id": config.waba_id,
            "access_token_enc": config.access_token,
            "verify_token": config.verify_token or secrets.token_urlsafe(16),
            "is_connected": bool(config.phone_number_id and config.access_token),
            "updated_at": datetime.now(timezone.utc),
        }},
        upsert=True,
    )
    return {"message": "WhatsApp config saved", "is_connected": bool(config.phone_number_id and config.access_token)}

# ── Startup ──
@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    await db.bots.create_index("owner_id")
    await db.data_sources.create_index("bot_id")
    await db.demo_sessions.create_index("session_id")
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@wraft.in")
    admin_password = os.environ.get("ADMIN_PASSWORD", "wraft@admin2025")
    existing = await db.users.find_one({"email": admin_email})
    if not existing:
        await db.users.insert_one({"email": admin_email, "password_hash": hash_password(admin_password), "name": "Admin", "role": "admin", "plan": "business", "monthly_message_count": 0, "created_at": datetime.now(timezone.utc), "updated_at": datetime.now(timezone.utc)})
        logger.info(f"Admin seeded: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
    # Write test credentials
    cred_path = Path("/app/memory/test_credentials.md")
    cred_path.parent.mkdir(parents=True, exist_ok=True)
    cred_path.write_text(f"# Test Credentials\n\n## Admin\n- Email: {admin_email}\n- Password: {admin_password}\n- Role: admin\n\n## Auth Endpoints\n- POST /api/auth/register\n- POST /api/auth/login\n- POST /api/auth/logout\n- GET /api/auth/me\n")
    logger.info("Startup complete")

@app.on_event("shutdown")
async def shutdown():
    client.close()

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
