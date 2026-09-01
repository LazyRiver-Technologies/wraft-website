import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, FileText, Globe, Upload, ArrowRight, Sparkles, CheckCircle2, Bot } from "lucide-react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function LearningAnimation({ sourceName, onComplete }) {
  const steps = [
    { text: "Reading your data...", delay: 0 },
    { text: "Extracting key information", delay: 800 },
    { text: "Building knowledge graph", delay: 1600 },
    { text: "Optimizing for multilingual support", delay: 2400 },
    { text: "Agent ready!", delay: 3200, highlight: true },
  ];
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    const timers = steps.map((_, i) =>
      setTimeout(() => setVisibleSteps(i + 1), steps[i].delay)
    );
    const doneTimer = setTimeout(onComplete, 4200);
    return () => { timers.forEach(clearTimeout); clearTimeout(doneTimer); };
  }, []);

  return (
    <div className="max-w-lg mx-auto text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-6"
      >
        <Bot className="w-9 h-9 text-[#25D366]" />
      </motion.div>
      <h2 className="text-2xl font-bold text-[#0A0A0A] mb-2" style={{ fontFamily: 'Satoshi' }}>
        AI is learning your data
      </h2>
      <p className="text-sm text-[#52525B] mb-8">Source: {sourceName}</p>

      <div className="space-y-3 text-left max-w-xs mx-auto mb-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: i < visibleSteps ? 1 : 0, x: i < visibleSteps ? 0 : -15 }}
            className="flex items-center gap-3"
          >
            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${step.highlight ? "text-[#25D366]" : "text-[#25D366]/50"}`} />
            <span className={`text-sm ${step.highlight ? "font-bold text-[#25D366]" : "text-[#52525B]"}`}>{step.text}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 3.5, ease: "easeOut" }}
        className="h-2 bg-[#25D366] rounded-full max-w-xs mx-auto"
      />
    </div>
  );
}

export default function DemoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlSession = searchParams.get("session");
  const urlSource = searchParams.get("source");

  const [step, setStep] = useState(urlSession ? "learning" : "input");
  const [sourceType, setSourceType] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [sessionId, setSessionId] = useState(urlSession || null);
  const [sourceName, setSourceName] = useState(urlSource || "");
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
      setStep("learning");
    } catch (e) { console.error(e); }
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
      if (data.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      }
      // After 1 message, show limit
      setTimeout(() => setStep("limit"), 3000);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Error: " + (e.response?.data?.detail || e.message) }]);
    }
    setLoading(false);
  };

  return (
    <div data-testid="demo-page" className="min-h-screen bg-[#FAFAFA]">
      <nav className="border-b border-[#E4E4E7] bg-white px-6 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Link to="/" className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Satoshi' }}>
            wraft<span className="text-[#25D366]">.</span>
          </Link>
          <div className="flex items-center gap-3">
            <a href="https://wraft-ten.vercel.app/" className="text-xs font-medium text-[#52525B] hover:text-[#0A0A0A]">Sign In</a>
            <a href="https://wraft-ten.vercel.app/" className="text-xs font-semibold bg-[#0A0A0A] text-white px-4 py-1.5 rounded-full hover:bg-[#25D366] transition-colors">Sign Up Free</a>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Input Step */}
        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> Live Demo
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A] mb-3" style={{ fontFamily: 'Satoshi' }}>
                  Try Wraft AI — Right Now
                </h1>
                <p className="text-base text-[#52525B] max-w-lg mx-auto">
                  Upload your business data and watch AI answer questions from it. No sign-up required.
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
                      className="w-full px-5 py-4 rounded-xl border border-[#E4E4E7] text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 resize-none"
                    />
                  )}
                  {sourceType === "url" && (
                    <input data-testid="demo-url-input" value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="https://yourbusiness.com" className="w-full px-5 py-4 rounded-xl border border-[#E4E4E7] text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/30" />
                  )}
                  {sourceType === "pdf" && (
                    <div className="border-2 border-dashed border-[#E4E4E7] rounded-xl p-10 text-center hover:border-[#25D366]/30 transition-colors">
                      <Upload className="w-8 h-8 text-[#52525B]/20 mx-auto mb-2" />
                      <input data-testid="demo-pdf-input" id="demo-pdf-upload" type="file" accept=".pdf" className="text-sm" />
                    </div>
                  )}
                  <button data-testid="demo-start-btn" type="submit" disabled={starting} className="w-full mt-6 bg-[#25D366] hover:bg-[#1EAC52] text-white py-3 rounded-full font-semibold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {starting ? "Processing..." : "Start Chatting with AI"}
                    {!starting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Learning Animation */}
          {step === "learning" && (
            <motion.div key="learning" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="pt-10">
              <LearningAnimation sourceName={sourceName} onComplete={() => setStep("chat")} />
            </motion.div>
          )}

          {/* Chat Step */}
          {step === "chat" && (
            <motion.div key="chat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-[#0A0A0A]" style={{ fontFamily: 'Satoshi' }}>Your AI Agent is Ready</h2>
                <p className="text-xs text-[#52525B]">Source: {sourceName} — Ask it anything about your data</p>
              </div>
              <div className="bg-white rounded-2xl border border-[#E4E4E7] overflow-hidden max-w-2xl mx-auto shadow-sm">
                <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">W</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">Wraft AI Demo</p>
                    <p className="text-white/60 text-[10px]">Powered by Wraft AI</p>
                  </div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" /><span className="text-[10px] text-white/40">live</span></div>
                </div>
                <div className="bg-[#ECE5DD] p-4 space-y-3 min-h-[260px] max-h-[360px] overflow-y-auto">
                  <div className="flex justify-start">
                    <div className="bg-white px-3.5 py-2.5 rounded-xl rounded-tl-none text-sm shadow-sm max-w-[80%]">
                      Hi! I've learned your business data. Ask me anything — you have <strong>1 free question</strong>.
                    </div>
                  </div>
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-sm shadow-sm ${
                        m.role === "user" ? "bg-[#DCF8C6] rounded-tr-none" : "bg-white rounded-tl-none"
                      }`}>{m.content}</div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-white px-4 py-3 rounded-xl rounded-tl-none shadow-sm flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#52525B]/30 typing-dot" />
                        <span className="w-2 h-2 rounded-full bg-[#52525B]/30 typing-dot" />
                        <span className="w-2 h-2 rounded-full bg-[#52525B]/30 typing-dot" />
                      </div>
                    </div>
                  )}
                  <div ref={endRef} />
                </div>
                <form onSubmit={sendMessage} className="flex gap-2 p-3 bg-[#F0F0F0]">
                  <input data-testid="demo-chat-input" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask a question about your business data..." className="flex-1 px-4 py-2.5 rounded-full border-none text-sm bg-white focus:outline-none" />
                  <button data-testid="demo-chat-send" type="submit" className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#1EAC52]">
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Limit Reached */}
          {step === "limit" && (
            <motion.div key="limit" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center pt-8">
              <div className="bg-white rounded-2xl border border-[#E4E4E7] p-10 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-5">
                  <Sparkles className="w-8 h-8 text-[#25D366]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0A0A0A] mb-2" style={{ fontFamily: 'Satoshi' }}>
                  Impressed? Get unlimited access.
                </h2>
                <p className="text-sm text-[#52525B] mb-8 leading-relaxed">
                  That was just one question. Imagine this running <strong>24/7 on WhatsApp</strong> — answering customers in Kannada, Hindi, or any language, booking appointments, handling queries. All starting at <strong>₹0</strong>.
                </p>
                <div className="space-y-3">
                  <button
                    data-testid="demo-signup-btn"
                    onClick={() => window.location.href = "https://wraft-ten.vercel.app/"}
                    className="w-full bg-[#25D366] hover:bg-[#1EAC52] text-white py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25D366]/25"
                  >
                    Get 50 Free Messages <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate("/#pricing")}
                    className="w-full border border-[#E4E4E7] py-3.5 rounded-full font-semibold text-sm text-[#52525B] hover:border-[#0A0A0A] transition-all"
                  >
                    View All Plans — Starting ₹0
                  </button>
                </div>
                <button onClick={() => { setStep("input"); setMessages([]); setSessionId(null); }} className="mt-5 text-xs text-[#52525B] hover:text-[#25D366] transition-colors">
                  Try with different data
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
