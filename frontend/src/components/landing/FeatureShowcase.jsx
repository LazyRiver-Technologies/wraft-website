import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import {
  Bell,
  UserPlus,
  Sparkles,
  BarChart3,
  Building2,
  HeartPulse,
  Utensils,
  GraduationCap,
  Store,
  Check,
  TrendingUp,
  Phone,
  Mail,
  MessageSquare,
  Wand2,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                              FEATURE METADATA                              */
/* -------------------------------------------------------------------------- */
const FEATURES = [
  {
    id: "owner-alert",
    eyebrow: "Owner Alerts",
    title: "WhatsApp notifications to the owner",
    description:
      "The moment a lead asks about pricing, books an appointment, or shows real intent — you get a WhatsApp ping with full context. No dashboards to check.",
    bullets: [
      "Real-time DM the second intent is detected",
      "Customer name, number, and chat snippet included",
      "Mute, snooze or route to teammates",
    ],
    Icon: Bell,
    accent: "#25D366",
    visual: "owner-alert",
  },
  {
    id: "lead-capture",
    eyebrow: "Lead Capture",
    title: "Lead capture, on autopilot",
    description:
      "The agent qualifies the lead inside the chat — name, phone, intent, budget — then drops it cleanly into your CRM-style lead inbox.",
    bullets: [
      "Smart, conversational lead forms",
      "Validates phone & email automatically",
      "One-tap export to CSV / CRM",
    ],
    Icon: UserPlus,
    accent: "#25D366",
    visual: "lead-capture",
  },
  {
    id: "ai-actions",
    eyebrow: "AI Suggestions",
    title: "AI-suggested next actions",
    description:
      "After every conversation, the AI suggests what to do next — send a quote, book a follow-up, share a brochure — so nothing slips through the cracks.",
    bullets: [
      "Context-aware action recommendations",
      "One-click apply or dismiss",
      "Learns from what you accept",
    ],
    Icon: Sparkles,
    accent: "#25D366",
    visual: "ai-actions",
  },
  {
    id: "topics-analytics",
    eyebrow: "Topics Analytics",
    title: "Know what customers really ask",
    description:
      "We auto-cluster every chat into topics — pricing, hours, refunds, services — so you see the patterns and fix the gaps before they cost you revenue.",
    bullets: [
      "Auto-clustered conversation topics",
      "Trends over time, week-on-week",
      "Surfaces missing answers in your data",
    ],
    Icon: BarChart3,
    accent: "#25D366",
    visual: "analytics",
  },
  {
    id: "onboarding",
    eyebrow: "Onboarding",
    title: "Business-type onboarding in minutes",
    description:
      "Pick your industry — clinic, restaurant, school, retail — and we pre-configure tone, FAQs, and lead questions tailored for it. You're live in 10 minutes.",
    bullets: [
      "Pre-built templates by industry",
      "Tone & FAQs preloaded",
      "Customise everything later",
    ],
    Icon: Building2,
    accent: "#25D366",
    visual: "onboarding",
  },
];

/* -------------------------------------------------------------------------- */
/*                            VISUAL: WINDOW FRAME                            */
/* -------------------------------------------------------------------------- */
function WindowFrame({ children, variant = "phone" }) {
  if (variant === "phone") {
    return (
      <div className="relative mx-auto w-full max-w-[340px] aspect-[9/19] rounded-[2.8rem] bg-[#0A0A0A] p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0A0A0A] rounded-b-2xl z-20" />
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#075E54] to-[#0F4A43]">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-full max-w-[540px] mx-auto rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] overflow-hidden border border-[#E4E4E7]">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#E4E4E7] bg-[#FAFAFA]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[10px] text-[#52525B] font-medium tracking-wide">
          dashboard.wraft.ai
        </span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                       VISUAL 1: OWNER WHATSAPP ALERT                       */
/* -------------------------------------------------------------------------- */
function OwnerAlertVisual() {
  return (
    <WindowFrame variant="phone">
      {/* status bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 text-[10px] text-white/80 font-medium">
        <span>9:41</span>
        <span>•••</span>
      </div>
      {/* WA header */}
      <div className="flex items-center gap-3 px-4 py-2 bg-[#075E54] border-b border-white/10">
        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-white text-[13px] font-semibold">Wraft</p>
          <p className="text-white/60 text-[10px]">Owner alerts</p>
        </div>
      </div>
      {/* chat */}
      <div className="bg-[#ECE5DD] h-[calc(100%-100px)] p-3 flex flex-col gap-2 overflow-hidden">
        <motion.div
          key="msg1"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 20 }}
          className="self-start max-w-[85%] bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm"
        >
          <p className="text-[10px] font-bold text-[#25D366] mb-0.5">
            🔔 New lead alert
          </p>
          <p className="text-[11px] text-[#0A0A0A] leading-snug">
            <span className="font-semibold">Priya Sharma</span> just asked about
            pricing for the dental cleaning package.
          </p>
          <p className="text-[10px] text-[#52525B] mt-1">
            📞 +91 98xxx 12345
          </p>
        </motion.div>

        <motion.div
          key="typing"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="self-start bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm flex items-center gap-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              className="w-1.5 h-1.5 rounded-full bg-[#52525B]/60"
            />
          ))}
        </motion.div>

        <motion.div
          key="msg2"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 220, damping: 20 }}
          className="self-start max-w-[85%] bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm"
        >
          <p className="text-[11px] text-[#0A0A0A] leading-snug">
            Want me to send the brochure? Tap{" "}
            <span className="text-[#25D366] font-semibold">Yes</span>
          </p>
        </motion.div>

        <motion.div
          key="reply"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.9, type: "spring", stiffness: 220 }}
          className="self-end max-w-[60%] bg-[#DCF8C6] rounded-2xl rounded-tr-sm px-3 py-2 shadow-sm"
        >
          <p className="text-[11px] text-[#0A0A0A]">Yes ✅</p>
        </motion.div>
      </div>
    </WindowFrame>
  );
}

/* -------------------------------------------------------------------------- */
/*                        VISUAL 2: LEAD CAPTURE INBOX                        */
/* -------------------------------------------------------------------------- */
function LeadCaptureVisual() {
  const leads = [
    { name: "Priya Sharma", intent: "Dental cleaning", time: "now" },
    { name: "Rahul Verma", intent: "Pricing query", time: "2m" },
    { name: "Anita Joshi", intent: "Booking demo", time: "5m" },
  ];
  return (
    <WindowFrame variant="phone">
      <div className="flex items-center justify-between px-4 pt-3 pb-2 text-[10px] text-white/80 font-medium">
        <span>9:41</span>
        <span>•••</span>
      </div>
      <div className="flex items-center gap-3 px-4 py-2 bg-[#075E54] border-b border-white/10">
        <UserPlus className="w-4 h-4 text-white" />
        <p className="text-white text-[13px] font-semibold">Lead Inbox</p>
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="ml-auto px-2 py-0.5 bg-[#25D366] rounded-full text-white text-[9px] font-bold"
        >
          3 NEW
        </motion.span>
      </div>
      <div className="bg-white h-[calc(100%-100px)] p-2 flex flex-col gap-2 overflow-hidden">
        {leads.map((lead, i) => (
          <motion.div
            key={lead.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.18, type: "spring", stiffness: 200, damping: 18 }}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F4F4F5] border border-[#E4E4E7]"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#25D366] to-[#1EAC52] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
              {lead.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-[#0A0A0A] truncate">
                {lead.name}
              </p>
              <p className="text-[9.5px] text-[#52525B] truncate">{lead.intent}</p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.18, type: "spring", stiffness: 300 }}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#25D366]/10"
            >
              <Check className="w-2.5 h-2.5 text-[#25D366]" strokeWidth={3} />
              <span className="text-[8.5px] font-bold text-[#25D366]">
                {lead.time}
              </span>
            </motion.div>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-auto flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-[#25D366]/10 to-transparent border border-[#25D366]/20"
        >
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 text-[#25D366]" />
            <span className="text-[10px] font-semibold text-[#0A0A0A]">
              +12 leads today
            </span>
          </div>
          <span className="text-[9px] text-[#25D366] font-bold">EXPORT →</span>
        </motion.div>
      </div>
    </WindowFrame>
  );
}

/* -------------------------------------------------------------------------- */
/*                       VISUAL 3: AI ACTION SUGGESTIONS                      */
/* -------------------------------------------------------------------------- */
function AiActionsVisual() {
  const actions = [
    { icon: Mail, label: "Send pricing brochure", to: "Priya Sharma", confidence: 92 },
    { icon: Phone, label: "Schedule callback", to: "Rahul Verma", confidence: 86 },
    { icon: Wand2, label: "Offer 10% first-visit discount", to: "Anita Joshi", confidence: 78 },
  ];
  return (
    <WindowFrame variant="dashboard">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#25D366] to-[#1EAC52] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0A0A0A]">AI Suggestions</p>
            <p className="text-[10px] text-[#52525B]">3 actions ready</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-6 h-6 rounded-full border-2 border-[#25D366]/20 border-t-[#25D366]"
        />
      </div>

      <div className="space-y-2.5">
        {actions.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.15, type: "spring", stiffness: 180, damping: 18 }}
            whileHover={{ x: 4 }}
            className="group relative p-3 rounded-xl border border-[#E4E4E7] bg-white hover:border-[#25D366]/40 hover:shadow-[0_4px_20px_rgba(37,211,102,0.08)] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <a.icon className="w-4 h-4 text-[#25D366]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-[#0A0A0A]">
                  {a.label}
                </p>
                <p className="text-[9.5px] text-[#52525B]">to {a.to}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold text-[#25D366]">
                    {a.confidence}%
                  </span>
                </div>
                <div className="w-12 h-1 bg-[#F4F4F5] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${a.confidence}%` }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-[#25D366] to-[#1EAC52]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-[#25D366] to-[#1EAC52] text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-[0_4px_14px_rgba(37,211,102,0.3)]"
        >
          Apply all <ChevronRight className="w-3 h-3" />
        </motion.button>
      </div>
    </WindowFrame>
  );
}

/* -------------------------------------------------------------------------- */
/*                          VISUAL 4: TOPICS ANALYTICS                        */
/* -------------------------------------------------------------------------- */
function AnalyticsVisual() {
  const topics = [
    { label: "Pricing", count: 42, color: "#25D366" },
    { label: "Hours", count: 31, color: "#1EAC52" },
    { label: "Booking", count: 27, color: "#34D399" },
    { label: "Refunds", count: 18, color: "#86EFAC" },
    { label: "Other", count: 11, color: "#BBF7D0" },
  ];
  const max = Math.max(...topics.map((t) => t.count));
  return (
    <WindowFrame variant="dashboard">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-bold text-[#0A0A0A]">Top topics this week</p>
          <p className="text-[10px] text-[#52525B]">129 conversations analysed</p>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#25D366]/10"
        >
          <TrendingUp className="w-3 h-3 text-[#25D366]" />
          <span className="text-[9.5px] font-bold text-[#25D366]">+24% WoW</span>
        </motion.div>
      </div>

      <div className="space-y-2.5 mb-4">
        {topics.map((t, i) => (
          <div key={t.label} className="flex items-center gap-3">
            <span className="text-[10px] font-medium text-[#0A0A0A] w-14 truncate">
              {t.label}
            </span>
            <div className="flex-1 h-2.5 bg-[#F4F4F5] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(t.count / max) * 100}%` }}
                transition={{
                  delay: 0.2 + i * 0.12,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${t.color}, ${t.color}cc)`,
                }}
              />
            </div>
            <span className="text-[10px] font-bold text-[#52525B] w-6 text-right">
              {t.count}
            </span>
          </div>
        ))}
      </div>

      {/* sparkline */}
      <div className="pt-3 border-t border-[#E4E4E7]">
        <p className="text-[9.5px] text-[#52525B] mb-2 font-medium">
          Conversations · last 7d
        </p>
        <svg viewBox="0 0 200 50" className="w-full h-12">
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#25D366" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#25D366" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,40 L30,30 L60,35 L90,20 L120,25 L150,12 L180,18 L200,8"
            stroke="#25D366"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <motion.path
            d="M0,40 L30,30 L60,35 L90,20 L120,25 L150,12 L180,18 L200,8 L200,50 L0,50 Z"
            fill="url(#sparkGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          />
        </svg>
      </div>
    </WindowFrame>
  );
}

/* -------------------------------------------------------------------------- */
/*                           VISUAL 5: ONBOARDING                             */
/* -------------------------------------------------------------------------- */
function OnboardingVisual() {
  const types = [
    { icon: HeartPulse, label: "Clinic", color: "#EF4444" },
    { icon: Utensils, label: "Restaurant", color: "#F59E0B" },
    { icon: GraduationCap, label: "Education", color: "#3B82F6" },
    { icon: Store, label: "Retail", color: "#25D366" },
  ];
  return (
    <WindowFrame variant="dashboard">
      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#25D366] mb-1">
          Step 1 of 3
        </p>
        <p className="text-sm font-bold text-[#0A0A0A]">
          Pick your business type
        </p>
        <p className="text-[10px] text-[#52525B]">
          We'll preload tone, FAQs and lead questions
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {types.map((t, i) => {
          const isSelected = t.label === "Clinic";
          return (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -2 }}
              className={cn(
                "relative p-3 rounded-xl border-2 cursor-pointer transition-all",
                isSelected
                  ? "border-[#25D366] bg-[#25D366]/5"
                  : "border-[#E4E4E7] bg-white hover:border-[#25D366]/30"
              )}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center"
                >
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </motion.div>
              )}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center mb-1.5"
                style={{ background: `${t.color}15` }}
              >
                <t.icon className="w-4 h-4" style={{ color: t.color }} />
              </div>
              <p className="text-[11px] font-bold text-[#0A0A0A]">{t.label}</p>
              <p className="text-[8.5px] text-[#52525B]">12 templates</p>
            </motion.div>
          );
        })}
      </div>

      {/* progress */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[9.5px] text-[#52525B]">
          <span>Setup progress</span>
          <span className="font-bold text-[#25D366]">~ 8 min left</span>
        </div>
        <div className="h-1.5 bg-[#F4F4F5] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "33%" }}
            transition={{ delay: 0.5, duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-full bg-gradient-to-r from-[#25D366] to-[#1EAC52] rounded-full"
          />
        </div>
      </div>
    </WindowFrame>
  );
}

/* -------------------------------------------------------------------------- */
/*                           VISUAL DISPATCHER                                */
/* -------------------------------------------------------------------------- */
function FeatureVisual({ id }) {
  // remount on id change so animations replay each switch
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -8 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full"
      >
        {id === "owner-alert" && <OwnerAlertVisual />}
        {id === "lead-capture" && <LeadCaptureVisual />}
        {id === "ai-actions" && <AiActionsVisual />}
        {id === "topics-analytics" && <AnalyticsVisual />}
        {id === "onboarding" && <OnboardingVisual />}
      </motion.div>
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                            MAIN SHOWCASE SECTION                           */
/* -------------------------------------------------------------------------- */
export default function FeatureShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-20%" });

  useEffect(() => {
    if (!isInView) return;
    
    const t = setInterval(() => {
      setActiveIdx((i) => (i + 1) % FEATURES.length);
      setProgressKey((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(t);
  }, [activeIdx, isInView]); // Restart interval if activeIdx changes manually or view changes

  const active = FEATURES[activeIdx];

  return (
    <section
      id="showcase"
      ref={sectionRef}
      data-testid="feature-showcase-section"
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      {/* ambient glow */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#25D366]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-[#25D366]/8 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#25D366] mb-4">
            More than a chatbot
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4"
            style={{ fontFamily: "Satoshi" }}
          >
            Real automation.
            <br />
            <span className="text-[#52525B]">Real insights. Real leads.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#52525B] max-w-xl mx-auto">
            Five features that close the loop between a WhatsApp chat and a paying
            customer.
          </p>
        </motion.div>

        {/* Auto-playing tab layout */}
        <div className="relative mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-24 items-start relative">
            {/* LEFT — feature list with active highlight */}
            <div className="space-y-3 lg:space-y-4">
              {FEATURES.map((f, i) => {
                const isActive = i === activeIdx;
                return (
                  <motion.button
                    key={f.id}
                    onClick={() => {
                      setActiveIdx(i);
                      setProgressKey(prev => prev + 1);
                    }}
                    animate={{
                      backgroundColor: isActive
                        ? "rgba(37,211,102,0.06)"
                        : "rgba(255,255,255,0)",
                      borderColor: isActive
                        ? "rgba(37,211,102,0.4)"
                        : "rgba(228,228,231,1)",
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="w-full text-left p-4 lg:p-5 rounded-2xl border backdrop-blur-sm group relative overflow-hidden"
                  >
                    {/* progress bar (only on active) */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#25D366]/20">
                        <motion.div
                          key={progressKey}
                          initial={{ height: 0 }}
                          animate={{ height: "100%" }}
                          transition={{ duration: 4.5, ease: "linear" }}
                          className="w-full bg-gradient-to-b from-[#25D366] to-[#1EAC52]"
                        />
                      </div>
                    )}
                    <div className="flex items-start gap-3 lg:gap-4">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.05 : 1,
                          rotate: isActive ? -3 : 0,
                        }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        className={cn(
                          "shrink-0 w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center transition-colors duration-500",
                          isActive
                            ? "bg-gradient-to-br from-[#25D366] to-[#1EAC52] shadow-[0_4px_20px_rgba(37,211,102,0.35)]"
                            : "bg-[#25D366]/10 group-hover:bg-[#25D366]/15"
                        )}
                      >
                        <f.Icon
                          className={cn(
                            "w-5 h-5 transition-colors duration-500",
                            isActive ? "text-white" : "text-[#25D366]"
                          )}
                          strokeWidth={2.4}
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-[0.15em] mb-1 transition-colors duration-500",
                            isActive ? "text-[#25D366]" : "text-[#52525B]/70"
                          )}
                        >
                          {f.eyebrow}
                        </p>
                        <h3
                          className="text-base lg:text-lg font-bold text-[#0A0A0A] mb-1.5"
                          style={{ fontFamily: "Satoshi" }}
                        >
                          {f.title}
                        </h3>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              key="expand"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm text-[#52525B] leading-relaxed mb-3">
                                {f.description}
                              </p>
                              <ul className="space-y-1.5">
                                {f.bullets.map((b, bi) => (
                                  <motion.li
                                    key={bi}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + bi * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                    className="flex items-center gap-2 text-xs text-[#0A0A0A]"
                                  >
                                    <span className="shrink-0 w-4 h-4 rounded-full bg-[#25D366]/15 flex items-center justify-center">
                                      <Check
                                        className="w-2.5 h-2.5 text-[#25D366]"
                                        strokeWidth={3}
                                      />
                                    </span>
                                    {b}
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.button>
                );
              })}

              {/* progress dots (mobile) */}
              <div className="flex lg:hidden items-center justify-center gap-1.5 pt-2">
                {FEATURES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === activeIdx ? "w-6 bg-[#25D366]" : "w-1.5 bg-[#E4E4E7]"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — sticky animated window */}
            <div className="relative hidden lg:flex items-center justify-center min-h-[560px] lg:sticky lg:top-32">
              {/* glow halo behind window */}
              <motion.div
                key={`halo-${active.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-[80%] h-[80%] rounded-full bg-[#25D366]/15 blur-3xl" />
              </motion.div>

              <div className="relative z-10 w-full">
                <FeatureVisual id={active.id} />
              </div>

              {/* floating decorative chip */}
              <motion.div
                key={`chip-${active.id}`}
                initial={{ opacity: 0, y: 20, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex absolute bottom-4 right-4 lg:right-12 items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#E4E4E7] shadow-[0_8px_30px_rgba(0,0,0,0.08)] z-30"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#25D366] to-[#1EAC52] flex items-center justify-center">
                  <active.Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#25D366]">
                    {active.eyebrow}
                  </p>
                  <p className="text-[10px] text-[#52525B] font-medium">
                    Live preview
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
