import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    messages: "50 messages/mo",
    description: "Try Wraft with no commitment",
    features: [
      "50 AI messages per month",
      "1 WhatsApp agent",
      "Basic document upload",
      "Website preview",
      "Community support",
    ],
    cta: "Start Free",
    popular: false,
    accent: false,
  },
  {
    name: "Standard",
    price: "999",
    period: "/month",
    messages: "2,000 messages/mo",
    description: "Perfect for growing businesses",
    features: [
      "2,000 AI messages per month",
      "WhatsApp + Website integration",
      "Unlimited document uploads",
      "Multilingual support (10+ languages)",
      "Appointment booking",
      "Email support",
      "Free setup & onboarding",
    ],
    cta: "Get Started",
    popular: true,
    accent: false,
  },
  {
    name: "Pro",
    price: "1,899",
    period: "/month",
    messages: "8,000 messages/mo",
    description: "For high-traffic businesses",
    features: [
      "8,000 AI messages per month",
      "Everything in Standard",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
      "Multiple agents",
      "API access",
    ],
    cta: "Get Started",
    popular: false,
    accent: true,
  },
  {
    name: "Business",
    price: "4,999",
    period: "/month",
    messages: "40,000 messages/mo",
    description: "Enterprise-grade for large operations",
    features: [
      "40,000 AI messages per month",
      "Everything in Pro",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom integrations",
      "SLA guarantee",
      "White-label option",
    ],
    cta: "Contact Sales",
    popular: false,
    accent: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <section id="pricing" data-testid="pricing-section" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#25D366] mb-4">Pricing</p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4"
            style={{ fontFamily: 'Bricolage Grotesque' }}
          >
            Simple, transparent pricing
          </h2>
          <p className="text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto">
            Start free. Scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div
                data-testid={`pricing-${plan.name.toLowerCase()}-card`}
                className={`h-full rounded-2xl border p-6 sm:p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  plan.accent
                    ? "bg-[#0A0A0A] border-[#0A0A0A] text-white"
                    : plan.popular
                    ? "bg-white border-[#25D366] shadow-sm"
                    : "bg-white border-[#E4E4E7]"
                }`}
              >
                <div className="mb-6">
                  <h3
                    className={`text-lg font-bold mb-1 ${plan.accent ? "text-white" : "text-[#0A0A0A]"}`}
                    style={{ fontFamily: 'Bricolage Grotesque' }}
                  >
                    {plan.name}
                  </h3>
                  <p className={`text-xs ${plan.accent ? "text-white/60" : "text-[#52525B]"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-sm ${plan.accent ? "text-white/60" : "text-[#52525B]"}`}>&#8377;</span>
                    <span
                      className={`text-4xl font-bold tracking-tight ${plan.accent ? "text-white" : "text-[#0A0A0A]"}`}
                      style={{ fontFamily: 'Bricolage Grotesque' }}
                    >
                      {plan.price}
                    </span>
                    <span className={`text-sm ${plan.accent ? "text-white/60" : "text-[#52525B]"}`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 font-medium ${plan.accent ? "text-[#25D366]" : "text-[#25D366]"}`}>
                    {plan.messages}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.accent ? "text-[#25D366]" : "text-[#25D366]"}`} />
                      <span className={`text-sm ${plan.accent ? "text-white/80" : "text-[#52525B]"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  data-testid={`pricing-${plan.name.toLowerCase()}-btn`}
                  onClick={() => navigate("/dashboard")}
                  className={`w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                    plan.accent
                      ? "bg-[#25D366] text-white hover:bg-[#1EAC52]"
                      : plan.popular
                      ? "bg-[#25D366] text-white hover:bg-[#1EAC52] hover:shadow-md hover:shadow-[#25D366]/25"
                      : "bg-[#0A0A0A] text-white hover:bg-[#25D366]"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
