import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Plus, MessageSquare, FileText, BarChart3, Bot, MoreVertical, Trash2, ExternalLink, LogOut } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    try {
      const { data } = await axios.get(`${API}/bots`);
      setBots(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const deleteBot = async (id) => {
    if (!window.confirm("Delete this agent?")) return;
    try {
      await axios.delete(`${API}/bots/${id}`);
      setBots(bots.filter(b => b.id !== id));
    } catch (e) { console.error(e); }
    setMenuOpen(null);
  };

  const stats = [
    { label: "Total Agents", value: bots.length, icon: Bot, color: "#25D366" },
    { label: "Total Messages", value: bots.reduce((s, b) => s + (b.message_count || 0), 0), icon: MessageSquare, color: "#0A0A0A" },
    { label: "Data Sources", value: bots.reduce((s, b) => s + (b.source_count || 0), 0), icon: FileText, color: "#25D366" },
    { label: "Plan", value: user?.plan?.charAt(0).toUpperCase() + user?.plan?.slice(1) || "Free", icon: BarChart3, color: "#52525B" },
  ];

  return (
    <div data-testid="dashboard-page" className="min-h-screen bg-[#FAFAFA]">
      {/* Nav */}
      <nav className="border-b border-[#E4E4E7] bg-white px-6 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Bricolage Grotesque' }}>
            wraft<span className="text-[#25D366]">.</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/demo" className="text-xs font-medium text-[#52525B] hover:text-[#25D366] transition-colors">Try Demo</Link>
            <span className="text-sm text-[#52525B]">{user?.name || user?.email}</span>
            <button data-testid="logout-btn" onClick={() => { logout(); navigate("/"); }} className="text-xs text-[#52525B] hover:text-red-500 transition-colors flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0A0A0A]" style={{ fontFamily: 'Bricolage Grotesque' }}>Dashboard</h1>
            <p className="text-sm text-[#52525B] mt-1">Manage your AI agents</p>
          </div>
          <button
            data-testid="create-agent-btn"
            onClick={() => navigate("/dashboard/create")}
            className="bg-[#25D366] hover:bg-[#1EAC52] text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> New Agent
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E4E4E7] p-5 hover:shadow-sm transition-shadow">
              <s.icon className="w-4 h-4 mb-2" style={{ color: s.color }} />
              <p className="text-xs text-[#52525B] mb-0.5">{s.label}</p>
              <p className="text-2xl font-bold tracking-tight text-[#0A0A0A]" style={{ fontFamily: 'Bricolage Grotesque' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Bot List */}
        {loading ? (
          <div className="text-center py-20 text-sm text-[#52525B]">Loading...</div>
        ) : bots.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E4E4E7] p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
              <Bot className="w-7 h-7 text-[#25D366]" />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Bricolage Grotesque' }}>Create Your First Agent</h2>
            <p className="text-sm text-[#52525B] mb-6 max-w-sm mx-auto">Upload your business documents, configure responses, and deploy to WhatsApp.</p>
            <button onClick={() => navigate("/dashboard/create")} className="bg-[#25D366] hover:bg-[#1EAC52] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all">
              Create Agent
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bots.map((bot) => (
              <div key={bot.id} className="bg-white rounded-xl border border-[#E4E4E7] p-5 hover:shadow-md transition-all hover:-translate-y-0.5 relative group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-[#25D366]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#0A0A0A]">{bot.name}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bot.is_active ? "bg-[#25D366]/10 text-[#25D366]" : "bg-red-50 text-red-500"}`}>
                        {bot.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <button onClick={() => setMenuOpen(menuOpen === bot.id ? null : bot.id)} className="p-1 hover:bg-[#F4F4F5] rounded">
                      <MoreVertical className="w-4 h-4 text-[#52525B]" />
                    </button>
                    {menuOpen === bot.id && (
                      <div className="absolute right-0 top-8 bg-white border border-[#E4E4E7] rounded-lg shadow-lg py-1 w-36 z-10">
                        <button onClick={() => { navigate(`/dashboard/agent/${bot.id}`); setMenuOpen(null); }} className="w-full text-left px-3 py-2 text-sm hover:bg-[#F4F4F5] flex items-center gap-2">
                          <ExternalLink className="w-3.5 h-3.5" /> Manage
                        </button>
                        <button onClick={() => deleteBot(bot.id)} className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-500 flex items-center gap-2">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-[#52525B]">
                  <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {bot.source_count || 0} sources</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {bot.message_count || 0} msgs</span>
                </div>
                <button
                  onClick={() => navigate(`/dashboard/agent/${bot.id}`)}
                  className="mt-4 w-full py-2 rounded-lg border border-[#E4E4E7] text-xs font-semibold text-[#52525B] hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                >
                  Manage Agent
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
