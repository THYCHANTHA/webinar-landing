/**
 * Webinar Landing Page — "Midnight Studio" Dark Cinematic Design
 *
 * Design: Deep navy-black background, electric teal accents, soft lavender secondary
 * Typography: Space Grotesk (display) + DM Sans (body)
 * Signature: Glow effects, spotlight radial gradients, floating cards
 *
 * Sections: Navbar, Hero + Countdown, About, Speakers, Agenda, Highlights,
 *           Testimonials, Target Audience, FAQ, Signup Form, Footer
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  Users,
  Zap,
  BookOpen,
  MessageSquare,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Sparkles,
  Mail,
  Menu,
  X,
  ChevronDown,
  Target,
  Briefcase,
  Lightbulb,
  Star,
  Quote,
  Play,
} from "lucide-react";

/* ─── Asset URLs ─── */
const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663463697740/iBVzbyjrGvjPx5wE5s8yxP/hero-bg-kWxG7XamLjp44rpgSFuoGU.webp";
const ABOUT_VISUAL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663463697740/iBVzbyjrGvjPx5wE5s8yxP/about-visual-EwmCSoUeocPe3sBHi4aksE.webp";
const CTA_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663463697740/iBVzbyjrGvjPx5wE5s8yxP/cta-bg-DhvUFqYTSZg7WqmDqJ9Skj.webp";
const PATTERN =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663463697740/iBVzbyjrGvjPx5wE5s8yxP/pattern-accent-nfezLHD9jgfKVjaSp4FFnp.webp";

const SPEAKERS = [
  {
    name: "Dr. Maya Chen",
    role: "Chief Digital Officer, Nexus Corp",
    bio: "15+ years leading digital transformation at Fortune 500 companies. Author of \"The Digital Imperative.\"",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663463697740/iBVzbyjrGvjPx5wE5s8yxP/speaker-1-JBXz3rgSPjehLE6F9vGiM6.webp",
    topic: "Opening Keynote",
  },
  {
    name: "James Whitfield",
    role: "Founder & CEO, StrategyFirst",
    bio: "Serial entrepreneur and advisor to 50+ startups. Pioneered the data-driven strategy framework.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663463697740/iBVzbyjrGvjPx5wE5s8yxP/speaker-2-LstYhYsLoveM2ftwiVnhzX.webp",
    topic: "Growth Frameworks",
  },
  {
    name: "Sarah Mitchell",
    role: "VP of Product, InnovateTech",
    bio: "Built products used by 10M+ users. Specialist in product-led growth and user experience.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663463697740/iBVzbyjrGvjPx5wE5s8yxP/speaker-3-a5mxEdYoJruCSWaSLouWV8.webp",
    topic: "Product Strategy",
  },
  {
    name: "Arjun Patel",
    role: "Head of AI & Analytics, DataVerse",
    bio: "Leading AI integration in enterprise strategy. Former Google and Microsoft research scientist.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663463697740/iBVzbyjrGvjPx5wE5s8yxP/speaker-4-Y9Coy9YC8Ptt6mxMj3RSU9.webp",
    topic: "AI & Automation",
  },
  {
    name: "Linda Nakamura",
    role: "CMO, GlobalReach Media",
    bio: "20 years in digital marketing leadership. Architect of campaigns reaching 100M+ consumers.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663463697740/iBVzbyjrGvjPx5wE5s8yxP/speaker-5-6jF5ExGXc6Z2bmhY6yn9s8.webp",
    topic: "Digital Marketing",
  },
];

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.15 },
  }),
};

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Smooth scroll helper ─── */
function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ─── Countdown Hook ─── */
function useCountdown(targetDate: Date) {
  const calcTimeLeft = useCallback(() => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calcTimeLeft]);

  return timeLeft;
}

/* ─── Navbar ─── */
const NAV_LINKS = [
  { label: "About", href: "about" },
  { label: "Speakers", href: "speakers" },
  { label: "Agenda", href: "agenda" },
  { label: "FAQ", href: "faq" },
  { label: "Register", href: "signup" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-border/40 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setMobileOpen(false);
          }}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <Sparkles className="w-5 h-5 text-teal" />
          WebinarLive
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => smoothScrollTo(link.href)}
              className="hover:text-teal transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => smoothScrollTo("signup")}
            className="hidden sm:block"
          >
            <Button
              size="sm"
              className="bg-teal text-navy font-semibold hover:bg-teal-dark transition-all duration-300 hover:shadow-[0_0_20px_oklch(0.82_0.17_175/0.4)]"
            >
              Reserve Spot
            </Button>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/40 overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    smoothScrollTo(link.href);
                    setMobileOpen(false);
                  }}
                  className="text-left py-2 text-foreground/80 hover:text-teal transition-colors text-base"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  smoothScrollTo("signup");
                  setMobileOpen(false);
                }}
                className="mt-2 bg-teal text-navy font-semibold hover:bg-teal-dark"
              >
                Reserve Spot
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── Hero + Countdown ─── */
const EVENT_DATE = new Date("2026-04-15T14:00:00-05:00");

function Hero() {
  const countdown = useCountdown(EVENT_DATE);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/30 bg-teal/5 text-teal text-sm font-medium mb-8"
          >
            <Calendar className="w-4 h-4" />
            April 15, 2026 — Live Online Event
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Master the Future of{" "}
            <span className="text-teal text-glow-teal">Digital Strategy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
          >
            Join industry leaders for an exclusive 90-minute deep dive into the
            strategies, tools, and frameworks shaping the next era of digital
            transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={() => smoothScrollTo("signup")}
              className="bg-teal text-navy font-semibold text-base px-8 hover:bg-teal-dark transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.82_0.17_175/0.4)] group"
            >
              Register for Free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => smoothScrollTo("about")}
              className="border-border/60 text-foreground hover:border-teal/50 hover:text-teal transition-all duration-300 text-base"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Countdown timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-14 pt-8 border-t border-border/30"
          >
            <p className="text-sm text-muted-foreground mb-4 uppercase tracking-widest font-medium">
              Event starts in
            </p>
            <div className="flex gap-4 sm:gap-6">
              {[
                { value: countdown.days, label: "Days" },
                { value: countdown.hours, label: "Hours" },
                { value: countdown.minutes, label: "Minutes" },
                { value: countdown.seconds, label: "Seconds" },
              ].map((unit) => (
                <div key={unit.label} className="text-center">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-card/60 backdrop-blur-sm border border-border/40 flex items-center justify-center text-2xl sm:text-3xl font-bold text-teal"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {String(unit.value).padStart(2, "0")}
                  </div>
                  <span className="text-xs text-muted-foreground mt-2 block">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── About Section ─── */
function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04] pointer-events-none">
        <img src={PATTERN} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.span
                variants={fadeUp}
                custom={0}
                className="inline-block text-teal text-sm font-semibold tracking-widest uppercase mb-4"
              >
                About the Event
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Why This Webinar <span className="text-teal">Matters</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-muted-foreground text-lg leading-relaxed mb-6"
              >
                The digital landscape is evolving faster than ever. Whether
                you're a founder, marketer, or product leader, staying ahead
                requires more than just keeping up — it demands a new way of
                thinking about strategy, technology, and growth.
              </motion.p>
              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-muted-foreground text-lg leading-relaxed mb-8"
              >
                In this live session, our panel of industry experts will share
                actionable insights drawn from real-world case studies,
                cutting-edge research, and years of hands-on experience building
                digital-first organizations.
              </motion.p>
              <motion.div variants={fadeUp} custom={4} className="flex flex-col gap-3">
                {[
                  "Actionable frameworks you can implement immediately",
                  "Live Q&A with industry-leading experts",
                  "Exclusive resources and templates for attendees",
                  "Recording available for registered participants",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                    <span className="text-foreground/90">{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div variants={fadeIn} custom={2} className="relative">
              <div className="relative rounded-2xl overflow-hidden border-glow">
                <img
                  src={ABOUT_VISUAL}
                  alt="Virtual conference visualization"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-card/90 backdrop-blur-lg border border-border/50 rounded-xl p-4 shadow-2xl glow-teal">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      90 Minutes
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Of expert-led content
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-card/90 backdrop-blur-lg border border-border/50 rounded-xl p-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-lavender/10 flex items-center justify-center">
                    <Play className="w-5 h-5 text-lavender" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      100% Free
                    </div>
                    <div className="text-xs text-muted-foreground">
                      No credit card needed
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Speakers Section ─── */
function Speakers() {
  return (
    <section id="speakers" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, oklch(0.75 0.08 300) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-block text-teal text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Meet the Experts
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Speakers
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Learn from five industry leaders who have shaped the future of
            digital strategy across diverse sectors.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPEAKERS.slice(0, 3).map((speaker, i) => (
              <motion.div
                key={speaker.name}
                variants={fadeUp}
                custom={i}
                className="group relative p-6 rounded-2xl bg-card/50 border border-border/40 hover:border-teal/30 transition-all duration-500 text-center"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-5 border-2 border-border/40 group-hover:border-teal/40 transition-colors duration-500">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="inline-block px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-medium mb-3"
                >
                  {speaker.topic}
                </div>
                <h3
                  className="text-lg font-semibold text-foreground mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {speaker.name}
                </h3>
                <p className="text-sm text-teal/80 mb-3">{speaker.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {speaker.bio}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto lg:max-w-none lg:grid-cols-2 lg:px-[16.67%]">
            {SPEAKERS.slice(3).map((speaker, i) => (
              <motion.div
                key={speaker.name}
                variants={fadeUp}
                custom={i + 3}
                className="group relative p-6 rounded-2xl bg-card/50 border border-border/40 hover:border-teal/30 transition-all duration-500 text-center"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-5 border-2 border-border/40 group-hover:border-teal/40 transition-colors duration-500">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="inline-block px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-medium mb-3"
                >
                  {speaker.topic}
                </div>
                <h3
                  className="text-lg font-semibold text-foreground mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {speaker.name}
                </h3>
                <p className="text-sm text-teal/80 mb-3">{speaker.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {speaker.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Agenda Section ─── */
const AGENDA = [
  {
    time: "2:00 PM",
    duration: "15 min",
    title: "Opening Keynote: The State of Digital",
    speaker: "Dr. Maya Chen",
    description:
      "Setting the stage with a data-driven overview of where digital strategy stands today and the forces shaping its future.",
  },
  {
    time: "2:15 PM",
    duration: "20 min",
    title: "Growth Frameworks That Actually Work",
    speaker: "James Whitfield",
    description:
      "A practical deep-dive into repeatable growth frameworks drawn from 50+ startup case studies.",
  },
  {
    time: "2:35 PM",
    duration: "20 min",
    title: "Building Products Users Love",
    speaker: "Sarah Mitchell",
    description:
      "How to leverage product-led growth strategies and user research to create products that drive retention.",
  },
  {
    time: "2:55 PM",
    duration: "5 min",
    title: "Break",
    speaker: "",
    description: "Short intermission. Grab a coffee and prepare your questions!",
  },
  {
    time: "3:00 PM",
    duration: "15 min",
    title: "AI-Powered Strategy: From Hype to Reality",
    speaker: "Arjun Patel",
    description:
      "Cutting through the noise to show how AI is genuinely transforming strategic decision-making.",
  },
  {
    time: "3:15 PM",
    duration: "15 min",
    title: "The New Digital Marketing Playbook",
    speaker: "Linda Nakamura",
    description:
      "Proven tactics for reaching and converting audiences in an era of privacy-first marketing.",
  },
  {
    time: "3:30 PM",
    duration: "30 min",
    title: "Live Q&A Panel Discussion",
    speaker: "All Speakers",
    description:
      "Your chance to ask questions directly to our panel of experts. Submit questions live or in advance.",
  },
];

function Agenda() {
  return (
    <section id="agenda" className="relative py-24 sm:py-32">
      <div className="container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-block text-teal text-sm font-semibold tracking-widest uppercase mb-4"
          >
            The Schedule
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Event Agenda
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            90 minutes of focused, high-value content. All times in EST.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            {AGENDA.map((item, i) => (
              <motion.div
                key={item.time + item.title}
                variants={fadeUp}
                custom={i}
                className={`relative flex gap-4 sm:gap-6 pb-8 ${
                  i < AGENDA.length - 1 ? "border-l-2 border-border/30 ml-3 pl-6 sm:pl-8" : "ml-3 pl-6 sm:pl-8"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2 ${
                    item.speaker === ""
                      ? "bg-muted border-muted-foreground/40"
                      : "bg-teal/20 border-teal"
                  }`}
                />

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className="text-sm font-semibold text-teal"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.time}
                    </span>
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                      {item.duration}
                    </span>
                    {item.speaker && (
                      <span className="text-xs text-lavender">{item.speaker}</span>
                    )}
                  </div>
                  <h3
                    className="text-base sm:text-lg font-semibold text-foreground mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Highlights Section ─── */
const highlights = [
  {
    icon: Zap,
    title: "Emerging Trends",
    description:
      "Discover the technologies and strategies that will define the next wave of digital innovation.",
  },
  {
    icon: BookOpen,
    title: "Case Studies",
    description:
      "Learn from real-world examples of companies that successfully transformed their digital approach.",
  },
  {
    icon: Users,
    title: "Expert Panel",
    description:
      "Hear from 5+ industry leaders with decades of combined experience in digital strategy.",
  },
  {
    icon: MessageSquare,
    title: "Live Q&A",
    description:
      "Get your questions answered in real-time during our interactive audience session.",
  },
];

function Highlights() {
  return (
    <section id="highlights" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, oklch(0.82 0.17 175) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-block text-teal text-sm font-semibold tracking-widest uppercase mb-4"
          >
            What You'll Learn
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Session Highlights
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            A carefully curated agenda designed to deliver maximum value in 90
            focused minutes.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="group relative p-8 rounded-2xl bg-card/50 border border-border/40 hover:border-teal/40 transition-all duration-500 hover:shadow-[0_0_40px_oklch(0.82_0.17_175/0.08)]"
              >
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-5 group-hover:bg-teal/15 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-teal" />
                </div>
                <h3
                  className="text-xl font-semibold mb-3 text-foreground group-hover:text-teal transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Testimonials Section ─── */
const TESTIMONIALS = [
  {
    quote:
      "This was the most actionable webinar I've attended in years. I implemented three strategies the very next day and saw immediate results.",
    name: "Rachel Torres",
    role: "Marketing Director, Bloom Agency",
    rating: 5,
  },
  {
    quote:
      "The speaker lineup was incredible. Getting access to this caliber of expertise for free is unheard of. Already registered for the next one.",
    name: "David Kim",
    role: "CEO, LaunchPad Ventures",
    rating: 5,
  },
  {
    quote:
      "As a product manager, the session on product-led growth completely changed how I think about user onboarding. Highly recommended.",
    name: "Priya Sharma",
    role: "Senior PM, TechScale",
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-block text-teal text-sm font-semibold tracking-widest uppercase mb-4"
          >
            What Past Attendees Say
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Trusted by <span className="text-teal">Thousands</span>
          </motion.h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                custom={i}
                className="relative p-8 rounded-2xl bg-card/50 border border-border/40 hover:border-teal/20 transition-all duration-500"
              >
                <Quote className="w-8 h-8 text-teal/20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-teal text-teal"
                    />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-6 text-[15px]">
                  "{t.quote}"
                </p>
                <div className="border-t border-border/30 pt-4">
                  <div className="font-semibold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Who Is This For ─── */
const AUDIENCES = [
  {
    icon: Briefcase,
    title: "Founders & CEOs",
    description:
      "Looking to build a digital-first strategy for sustainable growth and competitive advantage.",
  },
  {
    icon: Target,
    title: "Marketing Leaders",
    description:
      "Seeking modern frameworks to reach, engage, and convert audiences in a privacy-first world.",
  },
  {
    icon: Lightbulb,
    title: "Product Managers",
    description:
      "Wanting to leverage product-led growth and data-driven decision making to build better products.",
  },
];

function WhoIsThisFor() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-block text-teal text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Perfect For
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Who Is This <span className="text-teal">For?</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Whether you're just starting out or scaling fast, this webinar
            delivers value at every stage.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {AUDIENCES.map((a, i) => (
              <motion.div
                key={a.title}
                variants={fadeUp}
                custom={i}
                className="relative p-8 rounded-2xl bg-gradient-to-b from-card/60 to-card/30 border border-border/40 text-center hover:border-teal/30 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-5">
                  <a.icon className="w-7 h-7 text-teal" />
                </div>
                <h3
                  className="text-xl font-semibold text-foreground mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {a.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {a.description}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── FAQ Section ─── */
const FAQS = [
  {
    question: "Is this webinar really free?",
    answer:
      "Yes, 100% free. There are no hidden costs, upsells, or credit card requirements. We believe in making high-quality knowledge accessible to everyone.",
  },
  {
    question: "Will I receive a recording?",
    answer:
      "Absolutely. All registered attendees will receive a full recording within 24 hours of the event, along with the slide deck and any bonus resources mentioned during the session.",
  },
  {
    question: "What platform will the webinar be on?",
    answer:
      "We'll be using Zoom for the live session. You'll receive a unique join link via email after registration. The webinar works on desktop, tablet, and mobile devices.",
  },
  {
    question: "Can I ask questions during the session?",
    answer:
      "Yes! We have a dedicated 30-minute Q&A panel at the end. You can also submit questions in advance when you register, and we'll prioritize the most popular ones.",
  },
  {
    question: "What if I can't attend live?",
    answer:
      "No problem. Register anyway and you'll automatically receive the recording, slides, and resources. You won't miss a thing.",
  },
  {
    question: "Who should attend this webinar?",
    answer:
      "This webinar is designed for founders, marketing leaders, product managers, and anyone involved in digital strategy. Whether you're at a startup or enterprise, you'll find actionable takeaways.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-block text-teal text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Got Questions?
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Frequently Asked <span className="text-teal">Questions</span>
          </motion.h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.question}
                variants={fadeUp}
                custom={i}
                className="rounded-xl border border-border/40 overflow-hidden bg-card/30 hover:border-border/60 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180 text-teal" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Email Signup Section ─── */
function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast.error("Please fill in your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("You're registered! Check your inbox for confirmation.");
    }, 1200);
  };

  return (
    <section id="signup" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={CTA_BG} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto">
            <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
              <span className="inline-block text-teal text-sm font-semibold tracking-widest uppercase mb-4">
                Secure Your Seat
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Register <span className="text-teal">Now</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Spots are limited. Sign up today to guarantee your place and
                receive exclusive pre-event materials.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="relative p-8 sm:p-10 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 glow-teal"
                >
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground/80 mb-2"
                      >
                        Full Name <span className="text-teal">*</span>
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-navy-light/50 border-border/50 h-12 text-foreground placeholder:text-muted-foreground/50 focus:border-teal/60 focus:ring-teal/20 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground/80 mb-2"
                      >
                        Email Address <span className="text-teal">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-navy-light/50 border-border/50 h-12 text-foreground placeholder:text-muted-foreground/50 focus:border-teal/60 focus:ring-teal/20 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-foreground/80 mb-2"
                      >
                        Company / Role{" "}
                        <span className="text-muted-foreground text-xs">(optional)</span>
                      </label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Acme Inc. — Product Manager"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="bg-navy-light/50 border-border/50 h-12 text-foreground placeholder:text-muted-foreground/50 focus:border-teal/60 focus:ring-teal/20 transition-all duration-300"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-teal text-navy font-semibold text-base hover:bg-teal-dark transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.82_0.17_175/0.4)] disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                          Registering...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Register for Free
                        </span>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="p-10 rounded-2xl bg-card/60 backdrop-blur-xl border border-teal/30 text-center glow-teal-strong"
                >
                  <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-teal" />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    You're In!
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto mb-6">
                    Thank you for registering,{" "}
                    <strong className="text-foreground">{name}</strong>. We've
                    sent a confirmation to{" "}
                    <strong className="text-teal">{email}</strong>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal/70" />
                      April 15, 2026
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal/70" />
                      2:00 PM EST
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Add it to your calendar — we'll also send you a reminder!
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-10 text-sm text-muted-foreground"
            >
              {[
                { icon: Calendar, text: "April 15, 2026" },
                { icon: Clock, text: "2:00 PM EST" },
                { icon: Users, text: "500+ Attendees" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-teal/70" />
                  {item.text}
                </div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-border/30 py-12">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div
              className="flex items-center gap-2 text-lg font-bold text-foreground mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <Sparkles className="w-5 h-5 text-teal" />
              WebinarLive
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Bringing industry-leading expertise to your screen. Free,
              actionable, and designed for professionals who want to stay ahead.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => smoothScrollTo(link.href)}
                  className="text-left hover:text-teal transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Event Details */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Event Details
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal/60" />
                April 15, 2026
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal/60" />
                2:00 PM — 3:30 PM EST
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal/60" />
                500+ Expected Attendees
              </div>
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-teal/60" />
                Zoom (link sent via email)
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal/60" />
                hello@webinarlive.com
              </div>
              <p className="text-xs mt-2">
                Have questions? Drop us an email and we'll get back to you within
                24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WebinarLive. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button
              onClick={() => toast("Feature coming soon")}
              className="hover:text-teal transition-colors duration-300"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => toast("Feature coming soon")}
              className="hover:text-teal transition-colors duration-300"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Scroll to Top Button ─── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-teal text-navy flex items-center justify-center shadow-lg hover:bg-teal-dark transition-all duration-300 hover:shadow-[0_0_20px_oklch(0.82_0.17_175/0.4)]"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Speakers />
      <Agenda />
      <Highlights />
      <Testimonials />
      <WhoIsThisFor />
      <FAQ />
      <Signup />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
