import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, FileText, Globe, Upload, ArrowRight, Sparkles, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function DemoPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState("input"); // input | chat | limit
  const [sourceType, setSourceType] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [sourceName, setSourceName] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const startDemo = async (e) => {
    e?.preventDefault();
    setStarting(true);
    try {
      let res;
      if (sourceType === "pdf") {
        const f = document.getElementById("demo-pdf-upload");
        if (!f?.files[0]) { setStarting(false); return; }
        const formData = new FormData();
        formData.append("file", f.files[0]);
        res = await axios.post(`${API}/demo/upload`, formData);
      } else {
        res = await axios.post(`${API}/demo/start`, {
          text: sourceType === "text" ? textInput : "",
          url: sourceType === "url" ? urlInput : "",
        });
      }
      setSessionId(res.data.session_id);
      setSourceName(res.data.source_name);
      setStep("chat");
    } catch (e) {
      console.error(e);
    }
    setStarting(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || loading) return;
    const userMsg = chatInput;
    setChatInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/demo/chat`, { session_id: sessionId, message: userMsg });
      if (data.limit_reached && !data.reply) {
        setStep("limit");
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
        if (data.limit_reached) {
          setTimeout(() => setStep("limit"), 2000);
        }
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Error: " + (e.response?.data?.detail || e.message) }]);
    }
    setLoading(false);
  };

  return (
    <div data-testid="demo-page" className="min-h-screen bg-[#FAFAFA]">
      {/* Nav */}
      <nav className="border-b border-[#E4E4E7] bg-white px-6 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Link to="/" className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Bricolage Grotesque' }}>
            wraft<span className="text-[#25D366]">.</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-xs font-medium text-[#52525B] hover:text-[#0A0A0A]">Sign In</Link>
            <Link to="/register" className="text-xs font-semibold bg-[#0A0A0A] text-white px-4 py-1.5 rounded-full hover:bg-[#25D366] transition-colors">Sign Up</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Input Step */}
        {step === "input" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Live Demo
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A] mb-3" style={{ fontFamily: 'Bricolage Grotesque' }}>
                Try Wraft AI — Right Now
              </h1>
              <p className="text-base text-[#52525B] max-w-lg mx-auto">
                Upload your business data and watch the AI answer questions from it. No sign-up required. 2 free messages.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E4E4E7] p-8 max-w-2xl mx-auto shadow-sm">
              <div className="flex gap-2 mb-6">
                {[
                  { id: "text", label: "Paste Text", icon: FileText },
                  { id: "url", label: "Website URL", icon: Globe },
                  { id: "pdf", label: "Upload PDF", icon: Upload },
                ].map(t => (
                  <button
                    key={t.id}
                    data-testid={`demo-tab-${t.id}`}
                    onClick={() => setSourceType(t.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold transition-all ${
                      sourceType === t.id ? "bg-[#0A0A0A] text-white" : "bg-[#F4F4F5] text-[#52525B] hover:bg-[#E4E4E7]"
                    }`}
                  >
                    <t.icon className="w-4 h-4" /> {t.label}
                  </button>
                ))}
              </div>

              <form onSubmit={startDemo}>
                {sourceType === "text" && (
                  <textarea
                    data-testid="demo-text-input"
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}
                    rows={8}
                    placeholder={"Paste your business info here...\n\nExample:\nCity Clinic - Dr. Sharma\nServices: General checkup, Dental, Eye care\nTimings: Mon-Sat 9 AM - 6 PM\nAddress: MG Road, Bangalore\nFees: Consultation ₹500, Follow-up ₹200"}
                    className="w-full px-4 py-3 rounded-xl border border-[#E4E4E7] text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 resize-none"
                  />
                )}
                {sourceType === "url" && (
                  <input
                    data-testid="demo-url-input"
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    placeholder="https://yourbusiness.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#E4E4E7] text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/30"
                  />
                )}
                {sourceType === "pdf" && (
                  <div className="border-2 border-dashed border-[#E4E4E7] rounded-xl p-8 text-center hover:border-[#25D366]/30 transition-colors">
                    <Upload className="w-8 h-8 text-[#52525B]/30 mx-auto mb-2" />
                    <input data-testid="demo-pdf-input" id="demo-pdf-upload" type="file" accept=".pdf" className="text-sm" />
                  </div>
                )}
                <button
                  data-testid="demo-start-btn"
                  type="submit"
                  disabled={starting}
                  className="w-full mt-6 bg-[#25D366] hover:bg-[#1EAC52] text-white py-3 rounded-full font-semibold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {starting ? "Processing..." : "Start Chatting with AI"}
                  {!starting && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Chat Step */}
        {step === "chat" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#0A0A0A]" style={{ fontFamily: 'Bricolage Grotesque' }}>Chat with your AI Agent</h2>
              <p className="text-xs text-[#52525B]">Source: {sourceName} — 2 free messages</p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E4E4E7] overflow-hidden max-w-2xl mx-auto shadow-sm">
              {/* WhatsApp-style header */}
              <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">W</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Wraft AI Demo</p>
                  <p className="text-white/60 text-[10px]">Powered by Gemini 2.5 Flash</p>
                </div>
              </div>

              <div className="bg-[#ECE5DD] p-4 space-y-3 min-h-[300px] max-h-[400px] overflow-y-auto">
                <div className="flex justify-start">
                  <div className="bg-white px-3 py-2 rounded-lg rounded-tl-none text-sm shadow-sm max-w-[80%]">
                    Hi! I've learned your business data. Ask me anything about it!
                  </div>
                </div>
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm shadow-sm ${
                      m.role === "user" ? "bg-[#DCF8C6] rounded-tr-none" : "bg-white rounded-tl-none"
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white px-4 py-3 rounded-lg rounded-tl-none shadow-sm flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#52525B]/30 typing-dot" />
                      <span className="w-2 h-2 rounded-full bg-[#52525B]/30 typing-dot" />
                      <span className="w-2 h-2 rounded-full bg-[#52525B]/30 typing-dot" />
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              <form onSubmit={sendMessage} className="flex gap-2 p-3 bg-[#F0F0F0]">
                <input
                  data-testid="demo-chat-input"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-2 rounded-full border-none text-sm bg-white focus:outline-none"
                />
                <button data-testid="demo-chat-send" type="submit" className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#1EAC52]">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Limit Reached */}
        {step === "limit" && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center">
            <div className="bg-white rounded-2xl border border-[#E4E4E7] p-10 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#25D366]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-2" style={{ fontFamily: 'Bricolage Grotesque' }}>
                Impressed? There's more.
              </h2>
              <p className="text-sm text-[#52525B] mb-6">
                You've used your 2 free demo messages. Sign up to get <strong>50 free messages</strong>, WhatsApp integration, and unlimited document uploads.
              </p>
              <div className="space-y-3">
                <button
                  data-testid="demo-signup-btn"
                  onClick={() => navigate("/register")}
                  className="w-full bg-[#25D366] hover:bg-[#1EAC52] text-white py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  Get 50 Free Messages <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate("/#pricing")}
                  className="w-full border border-[#E4E4E7] py-3 rounded-full font-semibold text-sm text-[#52525B] hover:border-[#0A0A0A] transition-all"
                >
                  View All Plans
                </button>
              </div>
              <button onClick={() => { setStep("input"); setMessages([]); setSessionId(null); }} className="mt-4 text-xs text-[#52525B] hover:text-[#25D366]">
                Try with different data
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
