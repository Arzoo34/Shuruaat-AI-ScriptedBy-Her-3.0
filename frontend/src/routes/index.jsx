import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Chip, PrimaryButton } from "@/components/ui-bits";
import { useTranslation } from "@/lib/language-context";
import { useAppStore } from "@/store/appStore";
import heroImg from "@/assets/hero-entrepreneur.jpg";

const LANGUAGES = [
  { code: "hi", label: "\u0939\u093F\u0928\u094D\u0926\u0940", en: "Hindi" },
  { code: "gu", label: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0", en: "Gujarati" },
  { code: "ta", label: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD", en: "Tamil" },
  { code: "te", label: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41", en: "Telugu" },
  { code: "bn", label: "\u09AC\u09BE\u0982\u09B2\u09BE", en: "Bengali" },
  { code: "mr", label: "\u092E\u0930\u093E\u0920\u0940", en: "Marathi" },
  { code: "kn", label: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1", en: "Kannada" },
  { code: "pa", label: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40", en: "Punjabi" },
  { code: "en", label: "English", en: "English" }
];
const CATEGORIES = ["Sarees", "Kurtis", "Jewellery", "Beauty", "Kitchen", "Home Decor", "Handicrafts", "Other"];

export default function Onboarding() {
  const navigate = useNavigate();
  const { language, setLanguage, t, businessName, setBusinessName } = useTranslation();
  const [cat, setCat] = useState(null);
  const user = useAppStore((s) => s.user);
  const authLoading = useAppStore((s) => s.authLoading);
  useEffect(() => {
    if (user && !authLoading) {
      navigate("/home");
    }
  }, [user, authLoading, navigate]);
  return <div className="pb-16">
      <div className="px-6 pt-8 text-center">
        <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-1.5 rounded-full bg-accent/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[oklch(0.55_0.14_60)]"
  >
          <Sparkles className="h-3 w-3" /> {t("namaste")}
        </motion.div>
        <h1 className="mt-3 font-display text-[40px] font-extrabold leading-[1.05] text-foreground">
          शुरुआत <span className="text-primary">AI</span>
        </h1>
        <p className="mt-3 font-display text-lg font-medium text-foreground/85">
          {t("tagline")}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("subtagline")}
        </p>
      </div>

      <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="mx-6 mt-6 overflow-hidden rounded-[36px] border border-border bg-card shadow-[0_20px_50px_-24px_oklch(0.5_0.12_45/0.35)]"
  >
        <img
    src={heroImg}
    alt="Indian woman entrepreneur with her products"
    className="animate-float h-48 sm:h-64 w-full object-cover object-top"
    width={1024}
    height={1024}
  />
      </motion.div>

      <div className="px-6 pt-8">
        <h3 className="mb-3 text-sm font-semibold text-foreground/80">{t("chooseLang")}</h3>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((l) => <Chip
    key={l.code}
    active={language === l.code}
    onClick={() => setLanguage(l.code)}
  >
              <span className="font-medium">{l.label}</span>
              {l.code !== "en" && <span className="text-[11px] opacity-70">{l.en}</span>}
            </Chip>)}
        </div>
      </div>

      <div className="px-6 pt-6">
        <label className="mb-2 block text-sm font-semibold text-foreground/80">{t("bizName")}</label>
        <input
    value={businessName}
    onChange={(e) => setBusinessName(e.target.value)}
    placeholder={t("bizPlaceholder")}
    className="h-14 w-full rounded-2xl border border-border bg-card px-5 text-base outline-none placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-ring/30"
  />
      </div>

      <div className="px-6 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-foreground/80">{t("whatSell")}</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
        </div>
      </div>

      <div className="px-6 pt-8">
        <PrimaryButton onClick={() => {
    navigate("/auth");
  }}>
          {t("continue")} <ArrowRight className="h-5 w-5" />
        </PrimaryButton>

        <div className="mt-4 text-center">
          <Link to="/auth" className="text-sm font-semibold text-primary hover:underline">
            {language === "hi" ? "\u092A\u0939\u0932\u0947 \u0938\u0947 \u0916\u093E\u0924\u093E \u0939\u0948? \u0932\u0949\u0917 \u0907\u0928 \u0915\u0930\u0947\u0902" : "Already have an account? Sign In"}
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t("encouragement")}
        </p>
      </div>
    </div>;
}
