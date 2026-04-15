"""
Wraft SaaS Backend Tests - Auth, Bots CRUD, Demo, Plans
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestAuth:
    """Authentication endpoint tests"""

    def test_login_admin_success(self):
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@wraft.in",
            "password": "wraft@admin2025"
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["email"] == "admin@wraft.in"
        assert isinstance(data["access_token"], str)

    def test_login_invalid_credentials(self):
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@wraft.in",
            "password": "wrongpassword"
        })
        assert response.status_code == 401

    def test_register_new_user(self):
        import uuid
        unique_email = f"TEST_{uuid.uuid4().hex[:8]}@example.com"
        response = requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": unique_email,
            "password": "test123456",
            "name": "Test User"
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["email"] == unique_email

    def test_register_duplicate_email(self):
        response = requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": "admin@wraft.in",
            "password": "test123456",
            "name": "Dup"
        })
        assert response.status_code == 400

    def test_get_me_with_token(self):
        # Login first
        login = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@wraft.in", "password": "wraft@admin2025"
        })
        token = login.json()["access_token"]
        response = requests.get(f"{BASE_URL}/api/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == "admin@wraft.in"

    def test_get_me_unauthenticated(self):
        response = requests.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 401


class TestBots:
    """Bot CRUD tests"""

    @pytest.fixture(autouse=True)
    def setup(self):
        login = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@wraft.in", "password": "wraft@admin2025"
        })
        assert login.status_code == 200, "Login failed"
        self.token = login.json()["access_token"]
        self.headers = {"Authorization": f"Bearer {self.token}"}
        self.created_ids = []
        yield
        for bot_id in self.created_ids:
            requests.delete(f"{BASE_URL}/api/bots/{bot_id}", headers=self.headers)

    def test_create_bot(self):
        response = requests.post(f"{BASE_URL}/api/bots", json={"name": "TEST_Bot_Create"}, headers=self.headers)
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["name"] == "TEST_Bot_Create"
        self.created_ids.append(data["id"])

    def test_list_bots(self):
        # Create a bot first
        create = requests.post(f"{BASE_URL}/api/bots", json={"name": "TEST_Bot_List"}, headers=self.headers)
        bot_id = create.json()["id"]
        self.created_ids.append(bot_id)
        response = requests.get(f"{BASE_URL}/api/bots", headers=self.headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

    def test_get_bot(self):
        create = requests.post(f"{BASE_URL}/api/bots", json={"name": "TEST_Bot_Get"}, headers=self.headers)
        bot_id = create.json()["id"]
        self.created_ids.append(bot_id)
        response = requests.get(f"{BASE_URL}/api/bots/{bot_id}", headers=self.headers)
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == bot_id
        assert "sources" in data

    def test_update_bot(self):
        create = requests.post(f"{BASE_URL}/api/bots", json={"name": "TEST_Bot_Update"}, headers=self.headers)
        bot_id = create.json()["id"]
        self.created_ids.append(bot_id)
        response = requests.put(f"{BASE_URL}/api/bots/{bot_id}", json={"name": "TEST_Bot_Updated"}, headers=self.headers)
        assert response.status_code == 200

    def test_delete_bot(self):
        create = requests.post(f"{BASE_URL}/api/bots", json={"name": "TEST_Bot_Delete"}, headers=self.headers)
        bot_id = create.json()["id"]
        response = requests.delete(f"{BASE_URL}/api/bots/{bot_id}", headers=self.headers)
        assert response.status_code == 200
        get = requests.get(f"{BASE_URL}/api/bots/{bot_id}", headers=self.headers)
        assert get.status_code == 404

    def test_add_text_source(self):
        create = requests.post(f"{BASE_URL}/api/bots", json={"name": "TEST_Bot_Source"}, headers=self.headers)
        bot_id = create.json()["id"]
        self.created_ids.append(bot_id)
        response = requests.post(
            f"{BASE_URL}/api/bots/{bot_id}/sources",
            data={"source_type": "text", "content": "Wraft is an AI-powered WhatsApp chatbot platform.", "name": "Test Source"},
            headers=self.headers
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data

    def test_bots_require_auth(self):
        response = requests.get(f"{BASE_URL}/api/bots")
        assert response.status_code == 401


class TestDemo:
    """Demo endpoint tests"""

    def test_demo_start_with_text(self):
        response = requests.post(f"{BASE_URL}/api/demo/start", json={"text": "Wraft helps businesses automate WhatsApp customer support using AI."})
        assert response.status_code == 200
        data = response.json()
        assert "session_id" in data
        assert isinstance(data["session_id"], str)

    def test_demo_start_empty_fails(self):
        response = requests.post(f"{BASE_URL}/api/demo/start", json={"text": "", "url": ""})
        assert response.status_code == 400

    def test_demo_chat(self):
        start = requests.post(f"{BASE_URL}/api/demo/start", json={"text": "Wraft pricing: Free plan is 0 rupees. Standard plan is 999 rupees per month."})
        session_id = start.json()["session_id"]
        response = requests.post(f"{BASE_URL}/api/demo/chat", json={"session_id": session_id, "message": "What is the free plan price?"})
        assert response.status_code == 200
        data = response.json()
        assert "reply" in data
        assert "limit_reached" in data

    def test_demo_limit_after_2_messages(self):
        start = requests.post(f"{BASE_URL}/api/demo/start", json={"text": "Test business content about products and services."})
        session_id = start.json()["session_id"]
        # Send 2 messages
        requests.post(f"{BASE_URL}/api/demo/chat", json={"session_id": session_id, "message": "Question 1"})
        requests.post(f"{BASE_URL}/api/demo/chat", json={"session_id": session_id, "message": "Question 2"})
        # 3rd message should get limit_reached
        response = requests.post(f"{BASE_URL}/api/demo/chat", json={"session_id": session_id, "message": "Question 3"})
        assert response.status_code == 200
        data = response.json()
        assert data.get("limit_reached") == True


class TestPlans:
    """Plans endpoint tests"""

    def test_get_plans(self):
        response = requests.get(f"{BASE_URL}/api/plans")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 4
        prices = [p["price"] for p in data]
        assert 0 in prices
        assert 999 in prices
        assert 1899 in prices
        assert 4999 in prices

    def test_payment_create_order_mock(self):
        response = requests.post(f"{BASE_URL}/api/payments/create-order", json={"plan_id": "standard"})
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data.get("currency") == "INR"
