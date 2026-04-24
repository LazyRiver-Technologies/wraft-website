import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section data-testid="cta-section" className="py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 16 }}
          className="relative rounded-3xl bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1a1a1a] p-10 sm:p-16 text-center overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#25D366]/15 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#25D366]/8 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#25D366]/5 rounded-full blur-[120px]" />

          <div className="relative z-10">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4"
              style={{ fontFamily: 'Bricolage Grotesque' }}
            >
              Ready to automate your
              <br />
              <span className="text-[#25D366]">customer conversations?</span>
            </h2>
            <p className="text-base text-white/60 max-w-xl mx-auto mb-8">
              Join businesses across India who are using Wraft to serve customers in their own language, 24/7. Start with 50 free messages.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                data-testid="cta-get-started-btn"
                onClick={() => navigate("/dashboard")}
                className="group bg-[#25D366] hover:bg-[#1EAC52] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25D366]/25 flex items-center gap-2"
              >
                Start Free Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#pricing"
                className="text-sm font-semibold text-white/80 hover:text-white border border-white/20 hover:border-white/40 px-8 py-3.5 rounded-full transition-all duration-300"
              >
                View Pricing
              </a>
            </div>
            <div className="flex items-center justify-center gap-6 mt-10 text-white/40 text-xs">
              <span>No credit card required</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Free setup</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
