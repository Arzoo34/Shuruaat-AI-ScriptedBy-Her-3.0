import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  MessageCircle,
  HeartPulse,
  TrendingUp,
  Flame,
  Sparkles,
  ArrowUpRight,
  Bell
} from "lucide-react";
import { Card, PageHeader, SectionTitle, Gauge, RangoliDivider } from "@/components/ui-bits";
import { useTranslation } from "@/lib/language-context";
import { useAppStore } from "@/store/appStore";
import homeIllus from "@/assets/home-illustration.jpg";
function getGreeting(language, name) {
  const hr = (/* @__PURE__ */ new Date()).getHours();
  const sellerName = name || "Priya";
  if (language === "hi") {
    if (hr >= 5 && hr < 12) return `\u0936\u0941\u092D \u092A\u094D\u0930\u092D\u093E\u0924, ${sellerName} \u{1F44B}`;
    if (hr >= 12 && hr < 17) return `\u0936\u0941\u092D \u0926\u094B\u092A\u0939\u0930, ${sellerName} \u{1F44B}`;
    return `\u0936\u0941\u092D \u0938\u0902\u0927\u094D\u092F\u093E, ${sellerName} \u{1F44B}`;
  }
  if (language === "ta") {
    if (hr >= 5 && hr < 12) return `\u0B95\u0BBE\u0BB2\u0BC8 \u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD, ${sellerName} \u{1F44B}`;
    if (hr >= 12 && hr < 17) return `\u0BAE\u0BA4\u0BBF\u0BAF \u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD, ${sellerName} \u{1F44B}`;
    return `\u0BAE\u0BBE\u0BB2\u0BC8 \u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD, ${sellerName} \u{1F44B}`;
  }
  if (language === "bn") {
    if (hr >= 5 && hr < 12) return `\u09B8\u09C1\u09AA\u09CD\u09B0\u09AD\u09BE\u09A4, ${sellerName} \u{1F44B}`;
    if (hr >= 12 && hr < 17) return `\u09B6\u09C1\u09AD \u09A6\u09C1\u09AA\u09C1\u09B0, ${sellerName} \u{1F44B}`;
    return `\u09B6\u09C1\u09AD \u09B8\u09A8\u09CD\u09A7\u09CD\u09AF\u09BE, ${sellerName} \u{1F44B}`;
  }
  if (hr >= 5 && hr < 12) return `Good Morning, ${sellerName} \u{1F44B}`;
  if (hr >= 12 && hr < 17) return `Good Afternoon, ${sellerName} \u{1F44B}`;
  return `Good Evening, ${sellerName} \u{1F44B}`;
}
export default function HomePage() {
  const { t, businessName, language } = useTranslation();
  const simulationUnlocked = useAppStore((s) => s.simulationUnlocked);
  const publishedListings = useAppStore((s) => s.publishedListings);
  const hasProducts = publishedListings && publishedListings.length > 0;
  const averageRisk = hasProducts ? Math.round(publishedListings.reduce((sum, item) => sum + (item.risk_score || 0), 0) / publishedListings.length) : simulationUnlocked ? 18 : 0;
  const returnScore = 100 - averageRisk;
  const totalRevenue = hasProducts ? `\u20B9${(publishedListings.reduce((sum, item) => sum + (item.price || 0), 0) * 12).toLocaleString("en-IN")}` : simulationUnlocked ? "\u20B914.2k" : "\u20B90";
  const returnsCount = hasProducts ? Math.max(1, Math.round(publishedListings.length * (averageRisk / 100) * 4)) : simulationUnlocked ? 4 : 0;
  const salesChange = hasProducts ? `+${publishedListings.length * 6}%` : simulationUnlocked ? "+22%" : "--";
  const returnsChange = hasProducts ? `\u2212${Math.max(1, Math.round(publishedListings.length / 2))}` : simulationUnlocked ? "\u22121" : "--";
  const agents = [
    { to: "/listing", label: t("listingAgent"), desc: t("listingAgentDesc"), Icon: Package, tint: "from-[oklch(0.94_0.06_75)] to-[oklch(0.98_0.03_80)]" },
    { to: "/qa", label: t("qaAgent"), desc: t("qaAgentDesc"), Icon: MessageCircle, tint: "from-[oklch(0.92_0.05_190)] to-[oklch(0.98_0.02_190)]" },
    { to: "/health", label: t("healthAgent"), desc: t("healthAgentDesc"), Icon: HeartPulse, tint: "from-[oklch(0.94_0.06_140)] to-[oklch(0.98_0.03_140)]" }
  ];
  const trends = [
    { emoji: "\u{1FA94}", title: t("diyas"), note: t("trends1") },
    { emoji: "\u{1F457}", title: t("kurtis"), note: t("trends2") },
    { emoji: "\u{1F484}", title: t("oil"), note: t("trends3") }
  ];
  const greeting = getGreeting(language, businessName);
  const initial = (businessName || "Priya").trim().charAt(0).toUpperCase();
  return <div>
      <PageHeader
    title={greeting}
    subtitle={t("homeSubtitle")}
    right={<div className="flex items-center gap-2">
            <button className="grid h-11 w-11 place-items-center rounded-2xl border border-border bg-card" aria-label="Notifications">
              <Bell className="h-5 w-5 text-foreground/70" />
            </button>
            <Link to="/profile" className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent font-display font-bold text-primary-foreground btn-lift" aria-label="Profile">
              {initial}
            </Link>
          </div>}
  />

      <div className="px-5">
        <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="overflow-hidden rounded-[32px] border border-border bg-card"
  >
          <div className="flex items-center gap-4 p-4">
            <img
    src={homeIllus}
    alt="Woman packing her products"
    className="h-24 w-24 shrink-0 rounded-2xl object-cover"
    width={1024}
    height={768}
    loading="lazy"
  />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-secondary">{t("healthAgent")}</p>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold text-foreground">
                  {hasProducts ? returnScore : simulationUnlocked ? "92" : "--"}
                </span>
                <span className="text-sm font-semibold text-[oklch(0.55_0.14_145)]">{t("scoreTitle").split(" \u2014 ")[0]}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{t("scoreDesc")}</p>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
    initial={{ width: 0 }}
    animate={{ width: hasProducts ? `${returnScore}%` : simulationUnlocked ? "92%" : "0%" }}
    transition={{ duration: 1.1, ease: "easeOut" }}
    className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.16_140)] to-[oklch(0.82_0.16_85)]"
  />
            </div>
          </div>
        </motion.div>
      </div>

      <RangoliDivider className="my-6" />

      <section className="px-5">
        <SectionTitle eyebrow={t("checklistTitle")} title={t("waitingQ").split(" ")[0] + " " + t("checklistTitle")} />
        <motion.div
    initial="hidden"
    animate="show"
    variants={{ show: { transition: { staggerChildren: 0.08 } } }}
    className="flex flex-col gap-3"
  >
          {agents.map(({ to, label, desc, Icon, tint }) => <motion.div key={to} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
              <Link to={to} className="block">
                <div className={`card-warm flex items-center gap-4 bg-gradient-to-br ${tint} p-4`}>
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-card shadow-sm">
                    <Icon className="h-6 w-6 text-primary" strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display font-semibold text-foreground">{label}</h3>
                    <p className="truncate text-sm text-muted-foreground">{desc}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-foreground/50" />
                </div>
              </Link>
            </motion.div>)}
        </motion.div>
      </section>

      <section className="mt-6 px-5">
        <SectionTitle eyebrow={t("trendsTitle")} title={t("trendsTitle")} action={<TrendingUp className="h-5 w-5 text-primary" />} />
        <div className="-mx-5 overflow-x-auto pb-2">
          <div className="flex gap-3 px-5">
            {trends.map((tItem) => <Card key={tItem.title} className="w-52 shrink-0">
                <div className="text-3xl">{tItem.emoji}</div>
                <h4 className="mt-2 font-display font-semibold">{tItem.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{tItem.note}</p>
                <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-accent/20 px-2.5 py-1 text-[11px] font-semibold text-[oklch(0.5_0.14_60)]">
                  <Flame className="h-3 w-3" /> Trending
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      <section className="mt-6 px-5">
        <SectionTitle eyebrow={t("missingTitle")} title={t("fix1")} />
        <Card className="bg-gradient-to-br from-[oklch(0.97_0.04_85)] to-card">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/30">
              <Sparkles className="h-5 w-5 text-[oklch(0.55_0.14_60)]" />
            </div>
            <div className="min-w-0">
              <h4 className="font-display font-semibold">{t("fix1")}</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("insight1")}
              </p>
              <button className="mt-3 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground btn-lift">
                {t("oneTapFix")}
              </button>
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-6 px-5">
        <SectionTitle eyebrow={t("checklistTitle")} title={t("checklistTitle")} />
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{t("home")}</p>
            <p className="mt-1 font-display text-2xl font-bold text-[oklch(0.55_0.14_145)]">
              {totalRevenue}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {salesChange}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{t("returns")}</p>
            <p className="mt-1 font-display text-2xl font-bold text-primary">
              {returnsCount}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {returnsChange}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{t("rto")}</p>
            <div className="mt-1 flex justify-center">
              <div className="scale-[0.55] origin-top -my-4">
                <Gauge value={hasProducts ? averageRisk : simulationUnlocked ? 18 : 0} />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>;
}
