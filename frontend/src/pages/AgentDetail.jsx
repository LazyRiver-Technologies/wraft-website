import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Send, FileText, Globe, Upload, Trash2, MessageSquare, Settings, Wifi, Plus, Check } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function ChatTab({ botId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/bots/${botId}/chat`, { message: userMsg });
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Error: " + (e.response?.data?.detail || e.message) }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAFAFA] rounded-t-xl">
        {messages.length === 0 && <p className="text-center text-sm text-[#52525B]/50 mt-20">Send a message to test your agent</p>}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm ${m.role === "user" ? "bg-[#25D366] text-white rounded-tr-none" : "bg-white border border-[#E4E4E7] text-[#0A0A0A] rounded-tl-none"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><div className="bg-white border border-[#E4E4E7] px-4 py-3 rounded-xl rounded-tl-none flex gap-1"><span className="w-2 h-2 rounded-full bg-[#52525B]/30 typing-dot" /><span className="w-2 h-2 rounded-full bg-[#52525B]/30 typing-dot" /><span className="w-2 h-2 rounded-full bg-[#52525B]/30 typing-dot" /></div></div>}
        <div ref={endRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2 p-3 border-t border-[#E4E4E7] bg-white rounded-b-xl">
        <input
          data-testid="agent-chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask your agent something..."
          className="flex-1 px-4 py-2 rounded-full border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#25D366]"
        />
        <button data-testid="agent-chat-send" type="submit" className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#1EAC52] transition-colors">
          <Send className="w-4 h-4 text-white" />
        </button>
      </form>
    </div>
  );
}

function SourcesTab({ botId, sources, onRefresh }) {
  const [sourceType, setSourceType] = useState("text");
  const [textContent, setTextContent] = useState("");
  const [urlContent, setUrlContent] = useState("");
  const [uploading, setUploading] = useState(false);

  const addSource = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("source_type", sourceType);
      if (sourceType === "text") { formData.append("content", textContent); formData.append("name", "Text Input"); }
      else if (sourceType === "url") { formData.append("content", urlContent); formData.append("name", urlContent); }
      else if (sourceType === "pdf") {
        const f = document.getElementById("agent-pdf-upload");
        if (f?.files[0]) { formData.append("file", f.files[0]); formData.append("name", f.files[0].name); }
      }
      await axios.post(`${API}/bots/${botId}/sources`, formData);
      setTextContent(""); setUrlContent("");
      onRefresh();
    } catch (e) { console.error(e); }
    setUploading(false);
  };

  const deleteSource = async (sourceId) => {
    await axios.delete(`${API}/bots/${botId}/sources/${sourceId}`);
    onRefresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-3">
        {[{ id: "text", icon: FileText }, { id: "url", icon: Globe }, { id: "pdf", icon: Upload }].map(t => (
          <button key={t.id} onClick={() => setSourceType(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${sourceType === t.id ? "bg-[#0A0A0A] text-white" : "bg-[#F4F4F5] text-[#52525B]"}`}>
            <t.icon className="w-3 h-3" /> {t.id.toUpperCase()}
          </button>
        ))}
      </div>
      <form onSubmit={addSource} className="space-y-3">
        {sourceType === "text" && <textarea value={textContent} onChange={e => setTextContent(e.target.value)} rows={4} placeholder="Paste business info..." className="w-full px-4 py-2.5 rounded-lg border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#25D366] resize-none" />}
        {sourceType === "url" && <input value={urlContent} onChange={e => setUrlContent(e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 rounded-lg border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#25D366]" />}
        {sourceType === "pdf" && <input id="agent-pdf-upload" type="file" accept=".pdf" className="text-sm" />}
        <button type="submit" disabled={uploading} className="bg-[#0A0A0A] text-white px-4 py-2 rounded-full text-xs font-semibold disabled:opacity-50 flex items-center gap-1"><Plus className="w-3 h-3" /> {uploading ? "Adding..." : "Add Source"}</button>
      </form>
      {sources.length > 0 && (
        <div className="space-y-2 mt-4">
          {sources.map(s => (
            <div key={s.id} className="flex items-center gap-3 bg-[#FAFAFA] rounded-lg px-4 py-2.5 border border-[#E4E4E7]/50">
              <Check className="w-4 h-4 text-[#25D366]" />
              <span className="text-xs font-medium flex-1">{s.name}</span>
              <span className="text-[10px] text-[#25D366] font-bold">{s.status}</span>
              <button onClick={() => deleteSource(s.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WhatsAppTab({ botId, config }) {
  const [phone, setPhone] = useState(config?.phone_number_id || "");
  const [waba, setWaba] = useState(config?.waba_id || "");
  const [token, setToken] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await axios.post(`${API}/bots/${botId}/whatsapp`, { phone_number_id: phone, waba_id: waba, access_token: token });
      setSaved(true);
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  return (
    <div className="space-y-5">
      <div className="bg-[#25D366]/5 border border-[#25D366]/20 rounded-xl p-4">
        <h4 className="text-sm font-bold text-[#0A0A0A] mb-1">Connect to WhatsApp Business</h4>
        <p className="text-xs text-[#52525B]">You need a Meta Business account and WhatsApp Business API access. <a href="https://developers.facebook.com/docs/whatsapp" target="_blank" rel="noreferrer" className="text-[#25D366] underline">Learn more</a></p>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-[#0A0A0A] mb-1 block">Phone Number ID</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="From Meta Business dashboard" className="w-full px-4 py-2 rounded-lg border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#25D366]" />
        </div>
        <div>
          <label className="text-xs font-medium text-[#0A0A0A] mb-1 block">WhatsApp Business Account ID</label>
          <input value={waba} onChange={e => setWaba(e.target.value)} placeholder="WABA ID" className="w-full px-4 py-2 rounded-lg border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#25D366]" />
        </div>
        <div>
          <label className="text-xs font-medium text-[#0A0A0A] mb-1 block">Permanent Access Token</label>
          <input value={token} onChange={e => setToken(e.target.value)} type="password" placeholder="System user token" className="w-full px-4 py-2 rounded-lg border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#25D366]" />
        </div>
      </div>
      <button onClick={save} disabled={saving} className="bg-[#25D366] hover:bg-[#1EAC52] text-white px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all disabled:opacity-50">
        {saving ? "Saving..." : saved ? "Saved!" : "Save & Connect"}
      </button>
      {config?.is_connected && (
        <div className="flex items-center gap-2 text-[#25D366] text-sm font-semibold">
          <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" /> Connected
        </div>
      )}
    </div>
  );
}

export default function AgentDetail() {
  const { botId } = useParams();
  const [bot, setBot] = useState(null);
  const [tab, setTab] = useState("chat");
  const [loading, setLoading] = useState(true);

  const fetchBot = async () => {
    try {
      const { data } = await axios.get(`${API}/bots/${botId}`);
      setBot(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchBot(); }, [botId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-sm text-[#52525B]">Loading...</div>;
  if (!bot) return <div className="min-h-screen flex items-center justify-center text-sm text-red-500">Agent not found</div>;

  const tabs = [
    { id: "chat", label: "Test Chat", icon: MessageSquare },
    { id: "sources", label: "Data Sources", icon: FileText },
    { id: "whatsapp", label: "WhatsApp", icon: Wifi },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div data-testid="agent-detail-page" className="min-h-screen bg-[#FAFAFA]">
      <nav className="border-b border-[#E4E4E7] bg-white px-6 py-3">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-[#52525B] hover:text-[#0A0A0A]">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <span className="text-sm font-bold text-[#0A0A0A]" style={{ fontFamily: 'Bricolage Grotesque' }}>{bot.name}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bot.is_active ? "bg-[#25D366]/10 text-[#25D366]" : "bg-red-50 text-red-500"}`}>
            {bot.is_active ? "Active" : "Inactive"}
          </span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-[#F4F4F5] p-1 rounded-xl mb-6 w-fit">
          {tabs.map(t => (
            <button
              key={t.id}
              data-testid={`tab-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${tab === t.id ? "bg-white text-[#0A0A0A] shadow-sm" : "text-[#52525B] hover:text-[#0A0A0A]"}`}
            >
              <t.icon className="w-3.5 h-3.5" /> {t.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-6">
          {tab === "chat" && <ChatTab botId={botId} />}
          {tab === "sources" && <SourcesTab botId={botId} sources={bot.sources || []} onRefresh={fetchBot} />}
          {tab === "whatsapp" && <WhatsAppTab botId={botId} config={bot.whatsapp} />}
          {tab === "settings" && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#0A0A0A] mb-1.5 block">Agent Name</label>
                <input defaultValue={bot.name} className="w-full px-4 py-2.5 rounded-lg border border-[#E4E4E7] text-sm" readOnly />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0A0A0A] mb-1.5 block">System Prompt</label>
                <textarea defaultValue={bot.system_prompt} rows={4} className="w-full px-4 py-2.5 rounded-lg border border-[#E4E4E7] text-sm resize-none" readOnly />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FAFAFA] rounded-lg p-4 border border-[#E4E4E7]/50">
                  <p className="text-xs text-[#52525B]">Messages</p>
                  <p className="text-xl font-bold" style={{ fontFamily: 'Bricolage Grotesque' }}>{bot.message_count || 0}</p>
                </div>
                <div className="bg-[#FAFAFA] rounded-lg p-4 border border-[#E4E4E7]/50">
                  <p className="text-xs text-[#52525B]">Sources</p>
                  <p className="text-xl font-bold" style={{ fontFamily: 'Bricolage Grotesque' }}>{bot.source_count || 0}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
