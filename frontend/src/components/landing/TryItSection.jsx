import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Globe, Upload, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function TryItSection() {
  const navigate = useNavigate();
  const [sourceType, setSourceType] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTry = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (sourceType === "pdf") {
        const f = document.getElementById("tryit-pdf");
        if (!f?.files[0]) { setLoading(false); return; }
        const formData = new FormData();
        formData.append("file", f.files[0]);
        res = await axios.post(`${API}/demo/upload`, formData);
      } else {
        res = await axios.post(`${API}/demo/start`, {
          text: sourceType === "text" ? textInput : "",
          url: sourceType === "url" ? urlInput : "",
        });
      }
      navigate(`/demo?session=${res.data.session_id}&source=${encodeURIComponent(res.data.source_name)}`);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <section id="try-it" data-testid="try-it-section" className="py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Try It Now — Free
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4" style={{ fontFamily: 'Bricolage Grotesque' }}>
            See the magic yourself
          </h2>
          <p className="text-base sm:text-lg text-[#52525B] max-w-xl mx-auto">
            Paste your business info, drop a URL, or upload a PDF. Watch AI learn it in seconds and answer questions from it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-[#E4E4E7] p-6 sm:p-8 shadow-sm"
        >
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: "text", label: "Paste Text", icon: FileText },
              { id: "url", label: "Website URL", icon: Globe },
              { id: "pdf", label: "Upload PDF", icon: Upload },
            ].map(t => (
              <button
                key={t.id}
                data-testid={`tryit-tab-${t.id}`}
                onClick={() => setSourceType(t.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                  sourceType === t.id
                    ? "bg-[#0A0A0A] text-white shadow-md"
                    : "bg-[#F4F4F5] text-[#52525B] hover:bg-[#E4E4E7]"
                }`}
              >
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleTry}>
            {sourceType === "text" && (
              <textarea
                data-testid="tryit-text-input"
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                rows={6}
                placeholder={"Paste your business information here...\n\nExample:\nCity Clinic - Dr. Sharma\nServices: General checkup (₹500), Dental (₹800), Eye care (₹600)\nTimings: Mon-Sat, 9 AM - 6 PM\nAddress: #42, MG Road, Bangalore\nLanguages: Kannada, Hindi, English"}
                className="w-full px-5 py-4 rounded-xl border border-[#E4E4E7] text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 resize-none leading-relaxed"
              />
            )}
            {sourceType === "url" && (
              <input
                data-testid="tryit-url-input"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                placeholder="https://yourbusiness.com"
                className="w-full px-5 py-4 rounded-xl border border-[#E4E4E7] text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/30"
              />
            )}
            {sourceType === "pdf" && (
              <div className="border-2 border-dashed border-[#E4E4E7] rounded-xl p-10 text-center hover:border-[#25D366]/30 transition-colors">
                <Upload className="w-10 h-10 text-[#52525B]/20 mx-auto mb-3" />
                <p className="text-sm text-[#52525B] mb-2">Drop your PDF here or click to browse</p>
                <input data-testid="tryit-pdf-input" id="tryit-pdf" type="file" accept=".pdf" className="text-sm" />
              </div>
            )}
            <button
              data-testid="tryit-start-btn"
              type="submit"
              disabled={loading}
              className="w-full mt-5 bg-[#25D366] hover:bg-[#1EAC52] text-white py-3.5 rounded-full font-semibold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25D366]/25"
            >
              {loading ? "Processing your data..." : "Try AI Agent — Free"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-[11px] text-[#52525B]/50 mt-4">No sign-up needed. 1 free message to test.</p>
        </motion.div>
      </div>
    </section>
  );
}
