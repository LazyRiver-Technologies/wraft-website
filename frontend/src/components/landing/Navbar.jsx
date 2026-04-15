import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Compare", href: "#comparison" },
  { label: "Try Demo", href: "/demo", isRoute: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      data-testid="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-white/40 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" data-testid="navbar-logo" className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Bricolage Grotesque' }}>
            <span className="text-[#0A0A0A]">wraft</span>
            <span className="text-[#25D366]">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isRoute ? (
                <button
                  key={link.label}
                  onClick={() => navigate(link.href)}
                  className="text-sm font-semibold text-[#25D366] hover:text-[#1EAC52] transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              data-testid="nav-sign-in-btn"
              onClick={() => navigate("/login")}
              className="text-sm font-semibold text-[#0A0A0A] hover:text-[#25D366] transition-colors px-4 py-2"
            >
              Sign In
            </button>
            <button
              data-testid="nav-sign-up-btn"
              onClick={() => navigate("/register")}
              className="text-sm font-semibold bg-[#0A0A0A] text-white px-5 py-2 rounded-full hover:bg-[#25D366] transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Started Free
            </button>
          </div>

          <button
            data-testid="mobile-menu-btn"
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[#E4E4E7]"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-[#E4E4E7] flex flex-col gap-2">
                <button
                  onClick={() => { navigate("/login"); setMobileOpen(false); }}
                  className="text-sm font-semibold text-[#0A0A0A] py-2"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { navigate("/register"); setMobileOpen(false); }}
                  className="text-sm font-semibold bg-[#0A0A0A] text-white px-5 py-2.5 rounded-full"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
