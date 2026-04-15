import { MessageSquare, BarChart3, Settings, FileText } from "lucide-react";

export default function Dashboard() {
  return (
    <div data-testid="dashboard-page" className="min-h-screen bg-[#FAFAFA]">
      <nav className="border-b border-[#E4E4E7] bg-white px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <a href="/" className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Bricolage Grotesque' }}>
            <span className="text-[#0A0A0A]">wraft</span>
            <span className="text-[#25D366]">.</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#52525B]">Welcome back</span>
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white text-sm font-semibold">W</div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: 'Bricolage Grotesque' }}>Dashboard</h1>
        <p className="text-[#52525B] mb-10">Manage your AI agents and monitor conversations.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: MessageSquare, label: "Total Conversations", value: "0", color: "#25D366" },
            { icon: FileText, label: "Documents Uploaded", value: "0", color: "#0A0A0A" },
            { icon: BarChart3, label: "Messages This Month", value: "0/50", color: "#25D366" },
            { icon: Settings, label: "Active Agents", value: "0", color: "#52525B" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E4E4E7] p-6 hover:shadow-md transition-shadow">
              <item.icon className="w-5 h-5 mb-3" style={{ color: item.color }} />
              <p className="text-sm text-[#52525B] mb-1">{item.label}</p>
              <p className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Bricolage Grotesque' }}>{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 bg-white rounded-xl border border-[#E4E4E7] p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-7 h-7 text-[#25D366]" />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Bricolage Grotesque' }}>Create Your First Agent</h2>
          <p className="text-[#52525B] text-sm mb-6 max-w-md mx-auto">Upload your business documents, set up WhatsApp integration, and start automating customer conversations.</p>
          <button data-testid="create-agent-btn" className="bg-[#25D366] hover:bg-[#1EAC52] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5">
            Create Agent
          </button>
        </div>
      </div>
    </div>
  );
}
