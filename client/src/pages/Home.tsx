/**
 * Webinar Landing Page — "Midnight Studio" Dark Cinematic Design
 *
 * Design: Deep navy-black background, electric teal accents, soft lavender secondary
 * Typography: Space Grotesk (display) + DM Sans (body)
 * Signature: Glow effects, spotlight radial gradients, floating cards
 */

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  CheckCircle2,
  Sparkles,
  Mail,
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

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
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
  const isInView = useInView(ref, { once: true, margin: "-80px" });
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

/* ─── Navbar ─── */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/40">
      <div className="container flex items-center justify-between h-16">
        <a
          href="#"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <Sparkles className="w-5 h-5 text-teal" />
          WebinarLive
        </a>
        <div className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-teal transition-colors duration-300">
            About
          </a>
          <a href="#highlights" className="hover:text-teal transition-colors duration-300">
            Highlights
          </a>
          <a href="#signup" className="hover:text-teal transition-colors duration-300">
            Register
          </a>
        </div>
        <a href="#signup">
          <Button
            size="sm"
            className="bg-teal text-navy font-semibold hover:bg-teal-dark transition-all duration-300 hover:shadow-[0_0_20px_oklch(0.82_0.17_175/0.4)]"
          >
            Reserve Spot
          </Button>
        </a>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
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
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
            <a href="#signup">
              <Button
                size="lg"
                className="bg-teal text-navy font-semibold text-base px-8 hover:bg-teal-dark transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.82_0.17_175/0.4)] group"
              >
                Register for Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#about">
              <Button
                variant="outline"
                size="lg"
                className="border-border/60 text-foreground hover:border-teal/50 hover:text-teal transition-all duration-300 text-base"
              >
                Learn More
              </Button>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-border/30"
          >
            {[
              { label: "Expert Speakers", value: "5+" },
              { label: "Live Attendees", value: "500+" },
              { label: "Minutes of Content", value: "90" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-2xl sm:text-3xl font-bold text-teal"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
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
      {/* Subtle pattern overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04] pointer-events-none">
        <img src={PATTERN} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text */}
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
                Why This Webinar{" "}
                <span className="text-teal">Matters</span>
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

            {/* Right: Visual */}
            <motion.div variants={fadeIn} custom={2} className="relative">
              <div className="relative rounded-2xl overflow-hidden border-glow">
                <img
                  src={ABOUT_VISUAL}
                  alt="Virtual conference visualization"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
              {/* Floating detail card */}
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
            </motion.div>
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
      {/* Spotlight background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.82 0.17 175) 0%, transparent 70%)",
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

/* ─── Email Signup Section ─── */
function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("You're registered! Check your inbox for confirmation.");
    }, 1200);
  };

  return (
    <section id="signup" className="relative py-24 sm:py-32 overflow-hidden">
      {/* CTA Background */}
      <div className="absolute inset-0">
        <img
          src={CTA_BG}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
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
                        Full Name
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
                        Email Address
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
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    Thank you for registering, <strong className="text-foreground">{name}</strong>.
                    We've sent a confirmation to{" "}
                    <strong className="text-teal">{email}</strong>. See you on
                    April 15!
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Event details row */}
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
    <footer className="border-t border-border/30 py-10">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Sparkles className="w-4 h-4 text-teal/60" />
            <span
              className="font-semibold text-foreground/80"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WebinarLive
            </span>
            <span className="mx-2">·</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
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
            <button
              onClick={() => toast("Feature coming soon")}
              className="hover:text-teal transition-colors duration-300"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Highlights />
      <Signup />
      <Footer />
    </div>
  );
}
