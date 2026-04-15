import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Upload, Globe, FileText, Check } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CreateAgent() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("You are a helpful assistant for my business. Answer questions from the provided context. Be friendly and concise.");
  const [botId, setBotId] = useState(null);
  const [sources, setSources] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [sourceType, setSourceType] = useState("text");
  const [textContent, setTextContent] = useState("");
  const [urlContent, setUrlContent] = useState("");
  const [error, setError] = useState("");

  const createBot = async () => {
    if (!name.trim()) { setError("Enter agent name"); return; }
    setError("");
    try {
      const { data } = await axios.post(`${API}/bots`, { name, system_prompt: prompt });
      setBotId(data.id);
      setStep(1);
    } catch (e) {
      setError(e.response?.data?.detail || "Failed to create agent");
    }
  };

  const addSource = async (e) => {
    e?.preventDefault();
    if (!botId) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("source_type", sourceType);
      if (sourceType === "text") {
        formData.append("content", textContent);
        formData.append("name", "Text Input");
      } else if (sourceType === "url") {
        formData.append("content", urlContent);
        formData.append("name", urlContent);
      } else if (sourceType === "pdf") {
        const fileInput = document.getElementById("pdf-upload");
        if (fileInput?.files[0]) {
          formData.append("file", fileInput.files[0]);
          formData.append("name", fileInput.files[0].name);
        }
      }
      const { data } = await axios.post(`${API}/bots/${botId}/sources`, formData);
      setSources([...sources, data]);
      setTextContent("");
      setUrlContent("");
    } catch (e) {
      setError(e.response?.data?.detail || "Failed to add source");
    }
    setUploading(false);
  };

  return (
    <div data-testid="create-agent-page" className="min-h-screen bg-[#FAFAFA]">
      <nav className="border-b border-[#E4E4E7] bg-white px-6 py-3">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-[#52525B] hover:text-[#0A0A0A]">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <span className="text-sm font-medium text-[#52525B]">Step {step + 1} of 3</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Progress */}
        <div className="flex gap-2 mb-10">
          {["Name & Configure", "Add Data Sources", "Done"].map((label, i) => (
            <div key={i} className="flex-1">
              <div className={`h-1 rounded-full mb-2 ${i <= step ? "bg-[#25D366]" : "bg-[#E4E4E7]"}`} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${i <= step ? "text-[#25D366]" : "text-[#52525B]/40"}`}>{label}</span>
            </div>
          ))}
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-6">{error}</div>}

        {/* Step 0: Name */}
        {step === 0 && (
          <div className="bg-white rounded-2xl border border-[#E4E4E7] p-8">
            <h2 className="text-xl font-bold mb-1 text-[#0A0A0A]" style={{ fontFamily: 'Bricolage Grotesque' }}>Create your AI agent</h2>
            <p className="text-sm text-[#52525B] mb-6">Give it a name and tell it how to behave.</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#0A0A0A] mb-1.5 block">Agent Name</label>
                <input
                  data-testid="agent-name-input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g., City Clinic AI, My Restaurant Bot"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E4E4E7] text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0A0A0A] mb-1.5 block">System Prompt</label>
                <textarea
                  data-testid="agent-prompt-input"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E4E4E7] text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] resize-none"
                />
              </div>
            </div>
            <button
              data-testid="create-bot-btn"
              onClick={createBot}
              className="mt-6 bg-[#25D366] hover:bg-[#1EAC52] text-white px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 1: Sources */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E4E4E7] p-8">
              <h2 className="text-xl font-bold mb-1 text-[#0A0A0A]" style={{ fontFamily: 'Bricolage Grotesque' }}>Add data sources</h2>
              <p className="text-sm text-[#52525B] mb-6">Your agent will answer questions from this data.</p>

              <div className="flex gap-2 mb-4">
                {[{ id: "text", label: "Text", icon: FileText }, { id: "url", label: "Website URL", icon: Globe }, { id: "pdf", label: "PDF", icon: Upload }].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSourceType(t.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${sourceType === t.id ? "bg-[#0A0A0A] text-white" : "bg-[#F4F4F5] text-[#52525B] hover:bg-[#E4E4E7]"}`}
                  >
                    <t.icon className="w-3.5 h-3.5" /> {t.label}
                  </button>
                ))}
              </div>

              <form onSubmit={addSource}>
                {sourceType === "text" && (
                  <textarea
                    data-testid="source-text-input"
                    value={textContent}
                    onChange={e => setTextContent(e.target.value)}
                    rows={6}
                    placeholder="Paste your business information, FAQs, services, timings..."
                    className="w-full px-4 py-3 rounded-lg border border-[#E4E4E7] text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 resize-none"
                  />
                )}
                {sourceType === "url" && (
                  <input
                    data-testid="source-url-input"
                    value={urlContent}
                    onChange={e => setUrlContent(e.target.value)}
                    placeholder="https://yourbusiness.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E4E4E7] text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/30"
                  />
                )}
                {sourceType === "pdf" && (
                  <input data-testid="source-pdf-input" id="pdf-upload" type="file" accept=".pdf" className="text-sm" />
                )}
                <button
                  data-testid="add-source-btn"
                  type="submit"
                  disabled={uploading}
                  className="mt-4 bg-[#0A0A0A] hover:bg-[#25D366] text-white px-5 py-2 rounded-full text-xs font-semibold transition-all disabled:opacity-50"
                >
                  {uploading ? "Processing..." : "Add Source"}
                </button>
              </form>
            </div>

            {sources.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#E4E4E7] p-6">
                <h3 className="text-sm font-bold text-[#0A0A0A] mb-3">Added Sources ({sources.length})</h3>
                <div className="space-y-2">
                  {sources.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#FAFAFA] rounded-lg px-4 py-2.5 border border-[#E4E4E7]/50">
                      <Check className="w-4 h-4 text-[#25D366]" />
                      <span className="text-xs font-medium text-[#0A0A0A] flex-1">{s.name}</span>
                      <span className="text-[10px] text-[#25D366] font-bold">{s.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button onClick={() => setStep(0)} className="text-sm text-[#52525B] hover:text-[#0A0A0A] flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                data-testid="finish-setup-btn"
                onClick={() => setStep(2)}
                disabled={sources.length === 0}
                className="bg-[#25D366] hover:bg-[#1EAC52] text-white px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Done */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-[#E4E4E7] p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-[#25D366]" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-[#0A0A0A]" style={{ fontFamily: 'Bricolage Grotesque' }}>Agent Created!</h2>
            <p className="text-sm text-[#52525B] mb-6 max-w-md mx-auto">
              <strong>{name}</strong> is ready with {sources.length} data source(s). You can now test it, connect WhatsApp, or customize settings.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => navigate(`/dashboard/agent/${botId}`)}
                className="bg-[#25D366] hover:bg-[#1EAC52] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
              >
                Manage Agent
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="border border-[#E4E4E7] px-6 py-2.5 rounded-full text-sm font-semibold text-[#52525B] hover:border-[#0A0A0A] transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
