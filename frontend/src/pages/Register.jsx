import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setError("");
    setLoading(true);
    const result = await register(email, password, name);
    setLoading(false);
    if (result.success) navigate("/dashboard");
    else setError(result.error);
  };

  return (
    <div data-testid="register-page" className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Satoshi' }}>
            wraft<span className="text-[#25D366]">.</span>
          </Link>
          <h1 className="text-2xl font-bold mt-6 text-[#0A0A0A]" style={{ fontFamily: 'Satoshi' }}>Create your account</h1>
          <p className="text-sm text-[#52525B] mt-1">Start with 50 free messages — no credit card needed</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E4E4E7] p-8 shadow-sm">
          {error && (
            <div data-testid="register-error" className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>
          )}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#0A0A0A] mb-1.5 block">Name</label>
              <input
                data-testid="register-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E4E4E7] text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0A0A0A] mb-1.5 block">Email</label>
              <input
                data-testid="register-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E4E4E7] text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366]"
                placeholder="you@business.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0A0A0A] mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  data-testid="register-password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E4E4E7] text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] pr-10"
                  placeholder="Min 6 characters"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B]">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
          <button
            data-testid="register-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#25D366] hover:bg-[#1EAC52] text-white py-2.5 rounded-full font-semibold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Creating account..." : "Create Account"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
        <p className="text-center text-sm text-[#52525B] mt-6">
          Already have an account? <Link to="/login" className="text-[#25D366] font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
