import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import WraftLogo from "@/components/ui/WraftLogo";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Compare", href: "#comparison" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Status", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 group">
              <WraftLogo className="w-8 h-8" stroke="white" />
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Bricolage Grotesque' }}>
                wraft<span className="text-[#25D366]">.</span>
              </span>
            </a>
            <p className="text-sm text-white/50 mt-4 leading-relaxed max-w-xs">
              AI-powered WhatsApp agents for local businesses. Serve customers in their language, 24/7.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366]/20 flex items-center justify-center transition-colors">
                <MessageCircle className="w-4 h-4 text-white/60 hover:text-[#25D366]" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366]/20 flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4 text-white/60" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366]/20 flex items-center justify-center transition-colors">
                <Phone className="w-4 h-4 text-white/60" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/40 hover:text-[#25D366] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Wraft. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <MapPin className="w-3 h-3" />
            <span>Made in India</span>
          </div>
        </div>

        {/* Large brand text */}
        <div className="mt-16 text-center">
          <span
            className="text-[8rem] sm:text-[12rem] font-bold tracking-tighter text-white/[0.03] leading-none select-none"
            style={{ fontFamily: 'Bricolage Grotesque' }}
          >
            wraft
          </span>
        </div>
      </div>
    </footer>
  );
}
