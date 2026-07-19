import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, UserPlus, Sparkles, AlertCircle, Eye, EyeOff, Globe, Server, Check } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { useTranslation } from "@/lib/language-context";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Chip, PrimaryButton, RangoliDivider } from "@/components/ui-bits";

const AUTH_TRANSLATIONS = {
  en: {
    title: "Start Your Journey",
    subtitle: "Unlock AI tools to grow your business across Bharat",
    signInTab: "Sign In",
    signUpTab: "Register",
    emailLabel: "Email Address",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password (6+ chars)",
    bizLabel: "Business Name",
    bizPlaceholder: "e.g., Priya's Boutique",
    langLabel: "Select Interface Language",
    signInBtn: "Sign In",
    signUpBtn: "Create Account",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    switchSignUp: "Register Now",
    switchSignIn: "Sign In",
    demoModeTitle: "Running in Demo Mode",
    demoModeDesc: "Configure VITE_SUPABASE_URL in .env to connect a live database. Any credentials will work.",
    connectedTitle: "Connected to Supabase",
    connectedDesc: "Real, secure user authentication is active.",
    successMsg: "Successfully authenticated! Redirecting..."
  },
  hi: {
    title: "\u0905\u092A\u0928\u0940 \u0936\u0941\u0930\u0941\u0906\u0924 \u0915\u0930\u0947\u0902",
    subtitle: "\u092D\u093E\u0930\u0924 \u092D\u0930 \u092E\u0947\u0902 \u0905\u092A\u0928\u093E \u0935\u094D\u092F\u0935\u0938\u093E\u092F \u092C\u0922\u093C\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F AI \u091F\u0942\u0932\u094D\u0938 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902",
    signInTab: "\u0932\u0949\u0917 \u0907\u0928 \u0915\u0930\u0947\u0902",
    signUpTab: "\u0930\u091C\u093F\u0938\u094D\u091F\u0930 \u0915\u0930\u0947\u0902",
    emailLabel: "\u0908\u092E\u0947\u0932 \u092A\u0924\u093E",
    emailPlaceholder: "name@example.com",
    passwordLabel: "\u092A\u093E\u0938\u0935\u0930\u094D\u0921",
    passwordPlaceholder: "\u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 (6+ \u0905\u0915\u094D\u0937\u0930)",
    bizLabel: "\u092C\u093F\u091C\u0928\u0947\u0938 \u0915\u093E \u0928\u093E\u092E",
    bizPlaceholder: "\u091C\u0948\u0938\u0947: \u092A\u094D\u0930\u093F\u092F\u093E \u092C\u0941\u091F\u0940\u0915",
    langLabel: "\u0907\u0902\u091F\u0930\u092B\u0947\u0938 \u092D\u093E\u0937\u093E \u091A\u0941\u0928\u0947\u0902",
    signInBtn: "\u0932\u0949\u0917 \u0907\u0928 \u0915\u0930\u0947\u0902",
    signUpBtn: "\u0916\u093E\u0924\u093E \u092C\u0928\u093E\u090F\u0902",
    noAccount: "\u0916\u093E\u0924\u093E \u0928\u0939\u0940\u0902 \u0939\u0948?",
    haveAccount: "\u092A\u0939\u0932\u0947 \u0938\u0947 \u0939\u0940 \u0916\u093E\u0924\u093E \u0939\u0948?",
    switchSignUp: "\u0928\u092F\u093E \u0916\u093E\u0924\u093E \u092C\u0928\u093E\u090F\u0902",
    switchSignIn: "\u0932\u0949\u0917 \u0907\u0928 \u0915\u0930\u0947\u0902",
    demoModeTitle: "\u0921\u0947\u092E\u094B \u092E\u094B\u0921 \u0938\u0915\u094D\u0930\u093F\u092F \u0939\u0948",
    demoModeDesc: ".env \u092E\u0947\u0902 VITE_SUPABASE_URL \u0915\u0949\u0928\u094D\u092B\u093C\u093F\u0917\u0930 \u0915\u0930\u0947\u0902\u0964 \u0915\u094B\u0908 \u092D\u0940 \u0915\u094D\u0930\u0947\u0921\u0947\u0902\u0936\u093F\u092F\u0932 \u0915\u093E\u092E \u0915\u0930\u0947\u0902\u0917\u0947\u0964",
    connectedTitle: "\u0938\u0941\u092A\u093E\u092C\u0947\u0938 \u0938\u0947 \u0915\u0928\u0947\u0915\u094D\u091F\u0947\u0921",
    connectedDesc: "\u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924, \u0935\u093E\u0938\u094D\u0924\u0935\u093F\u0915 \u092F\u0942\u091C\u0930 \u0911\u0925\u0947\u0902\u091F\u093F\u0915\u0947\u0936\u0928 \u0938\u0915\u094D\u0930\u093F\u092F \u0939\u0948\u0964",
    successMsg: "सफलतापूर्वक लॉगिन हो गया! आगे बढ़ रहे हैं..."
  },
  ta: {
    title: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAA\u0BAF\u0BA3\u0BA4\u0BCD\u0BA4\u0BC8\u0BA4\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
    subtitle: "\u0BAA\u0BBE\u0BB0\u0BA4\u0BAE\u0BCD \u0BAE\u0BC1\u0BB4\u0BC1\u0BB5\u0BA4\u0BC1\u0BAE\u0BCD \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BB5\u0BA3\u0BBF\u0B95\u0BA4\u0BCD\u0BA4\u0BC8 \u0BB5\u0BB3\u0BB0\u0BCD\u0B95\u0BCD\u0B95 AI \u0B95\u0BB0\u0BC1\u0BB5\u0BBF\u0B95\u0BB3\u0BC8\u0BAA\u0BCD \u0BAA\u0BAF\u0BA9\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD",
    signInTab: "\u0B89\u0BB3\u0BCD\u0BA8\u0BC1\u0BB4\u0BC8\u0B95",
    signUpTab: "\u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0B95",
    emailLabel: "\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
    emailPlaceholder: "name@example.com",
    passwordLabel: "\u0B95\u0B9F\u0BB5\u0BC1\u0B9A\u0BCD\u0B9A\u0BCA\u0BB2\u0BCD",
    passwordPlaceholder: "\u0B95\u0B9F\u0BB5\u0BC1\u0B9A\u0BCD\u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8 \u0B89\u0BB3\u0BCD\u0BB3\u0BBF\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD (6+ \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD)",
    bizLabel: "\u0BB5\u0BA3\u0BBF\u0B95\u0BAA\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD",
    bizPlaceholder: "\u0B89\u0BA4\u0BBE\u0BB0\u0BA3\u0BAE\u0BCD: \u0BAA\u0BBF\u0BB0\u0BBF\u0B2F\u0BBE \u0BAA\u0BC1\u0B9F\u0BCD\u0B9F\u0BBF\u0B95\u0BCD",
    langLabel: "\u0BAE\u0BCA\u0BB4\u0BBF \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
    signInBtn: "\u0B89\u0BB3\u0BCD\u0BA8\u0BC1\u0BB4\u0BC8\u0B95",
    signUpBtn: "\u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC8 \u0B89\u0BB0\u0BC1\u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BC1",
    noAccount: "\u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0B87\u0BB2\u0BCD\u0BB2\u0BC8\u0BAF\u0BBE?",
    haveAccount: "\u0B8F\u0BB1\u0BCD\u0B95\u0BA9\u0BB5\u0BC7 \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BBE?",
    switchSignUp: "\u0B87\u0BAA\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0B95",
    switchSignIn: "\u0B89\u0BB3\u0BCD\u0BA8\u0BC1\u0BB4\u0BC8\u0B95",
    demoModeTitle: "\u0B9F\u0BC6\u0BAE\u0BCB \u0BAA\u0BAF\u0BA9\u0BCD\u0BAE\u0BC1\u0BB1\u0BC8 \u0B9A\u0BC6\u0BAF\u0BB2\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1",
    demoModeDesc: "\u0BA4\u0BA9\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0BA4\u0BB0\u0BB5\u0BC1\u0BA4\u0BCD\u0BA4\u0BB3\u0BA4\u0BCD\u0BA4\u0BC8 \u0B87\u0BA3\u0BC8\u0B95\u0BCD\u0B95 .env \u0B87\u0BB2\u0BCD VITE_SUPABASE_URL \u0B90 \u0B89\u0BB3\u0BCD\u0BB3\u0BAE\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.",
    connectedTitle: "\u0B9A\u0BC2\u0BAA\u0BCD\u0BAA\u0BBE\u0BAA\u0BC7\u0BB8\u0BC1\u0B9F\u0BA9\u0BCD \u0B87\u0BA3\u0BC8\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1",
    connectedDesc: "\u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BBE\u0BA9 \u0BAA\u0BAF\u0BA9\u0BB0\u0BCD \u0B85\u0B99\u0BCD\u0B95\u0BC0\u0B95\u0BBE\u0BB0\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BB2\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1.",
    successMsg: "\u0BB5\u0BC6\u0BB1\u0BCD\u0BB1\u0BBF\u0B95\u0BB0\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BA8\u0BC1\u0BB4\u0BC8\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1! \u0BA4\u0BBF\u0B9A\u0BC8\u0BA4\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1..."
  },
  bn: {
    title: "\u0986\u09AA\u09A8\u09BE\u09B0 \u09AF\u09BE\u09A4\u09CD\u09B0\u09BE \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09C1\u09A8",
    subtitle: "\u09AD\u09BE\u09B0\u09A4\u099C\u09C1\u09A1\u09BC\u09C7 \u0986\u09AA\u09A8\u09BE\u09B0 \u09AC\u09CD\u09AF\u09AC\u09B8\u09BE \u09AC\u09BE\u09A1\u09BC\u09BE\u09A4\u09C7 AI \u099F\u09C1\u09B2\u09B8 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09C1\u09A8",
    signInTab: "\u09B2\u0997 \u0987\u09A8 \u0995\u09B0\u09C1\u09A8",
    signUpTab: "\u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09BE\u09B0 \u0995\u09B0\u09C1\u09A8",
    emailLabel: "\u0987\u09AE\u09C7\u09B2 \u09A0\u09BF\u0995\u09BE\u09A8\u09BE",
    emailPlaceholder: "name@example.com",
    passwordLabel: "\u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1",
    passwordPlaceholder: "\u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1 \u09A6\u09BF\u09A8 (\u0995\u09AE\u09AA\u0995\u09CD\u09B7\u09C7 \u09EC \u0985\u0995\u09CD\u09B7\u09B0)",
    bizLabel: "\u09AC\u09CD\u09AF\u09AC\u09B8\u09BE\u09B0 \u09A8\u09BE\u09AE",
    bizPlaceholder: "\u09AF\u09C7\u09AE\u09A8: \u09AA\u09CD\u09B0\u09BF\u09DF\u09BE \u09AC\u09C1\u099F\u09BF\u0995",
    langLabel: "\u09AD\u09BE\u09B7\u09BE \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8",
    signInBtn: "\u09B2\u0997 \u0987\u09A8 \u0995\u09B0\u09C1\u09A8",
    signUpBtn: "\u0985\u09CD\u09AF\u09BE\u0995\u09BE\u0989\u09A8\u09CD\u099F \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09C1\u09A8",
    noAccount: "\u0985\u09CD\u09AF\u09BE\u0995\u09BE\u0989\u09A8\u09CD\u099F \u09A8\u09C7\u0987?",
    haveAccount: "ইতিমধ্যেই অ্যাকাউন্ট আছে?",
    switchSignUp: "\u098F\u0996\u09A8\u0987 \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09BE\u09B0 \u0995\u09B0\u09C1\u09A8",
    switchSignIn: "\u09B2\u0997 \u0987\u09A8 \u0995\u09B0\u09C1\u09A8",
    demoModeTitle: "\u09A1\u09C7\u09AE\u09CB \u09AE\u09CB\u09A1 \u09B8\u0995\u09CD\u09B0\u09BF\u09DF \u09B0\u09DF\u09C7\u099B\u09C7",
    demoModeDesc: "\u09A1\u09BE\u099F\u09BE\u09AC\u09C7\u09B8 \u09AF\u09C1\u0995\u09CD\u09A4 \u0995\u09B0\u09A4\u09C7 .env \u09AB\u09BE\u0987\u09B2\u09C7 VITE_SUPABASE_URL \u09B8\u09C7\u099F \u0995\u09B0\u09C1\u09A8\u0964 \u09AF\u09C7\u0995\u09CB\u09A8\u09CB \u09AA\u09BE\u09B8\u0993\u09DF\u09BE\u09B0\u09CD\u09A1 \u0995\u09BE\u099C \u0995\u09B0\u09AC\u09C7\u0964",
    connectedTitle: "\u09B8\u09C1\u09AA\u09BE\u09AC\u09C7\u09B8\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09B8\u0982\u09AF\u09C1\u0995\u09CD\u09A4",
    connectedDesc: "\u09A8\u09BF\u09B0\u09BE\u09AA\u09A6 \u0987\u0989\u099C\u09BE\u09B0 \u0985\u09A5\u09C7\u09A8\u099F\u09BF\u0995\u09C7\u09B6\u09A8 \u09B8\u0995\u09CD\u09B0\u09BF\u09DF \u0986\u099B\u09C7\u0964",
    successMsg: "\u09B8\u09AB\u09B2\u09AD\u09BE\u09AC\u09C7 \u09B2\u0997\u0987\u09A8 \u09B9\u09DF\u09C7\u099B\u09C7! \u098F\u0997\u09BF\u09DF\u09C7 \u09AF\u09BE\u0993\u09DF\u09BE \u09B9\u099A\u09CD\u099B\u09C7..."
  }
};
const LANGUAGES = [
  { code: "hi", label: "\u0939\u093F\u0928\u094D\u0926\u0940" },
  { code: "en", label: "English" },
  { code: "ta", label: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD" },
  { code: "bn", label: "\u09AC\u09BE\u0982\u09B2\u09BE" }
];

export default function AuthPage() {
  const navigate = useNavigate();
  const { language, setLanguage, setBusinessName } = useTranslation();
  const user = useAppStore((s) => s.user);
  const authLoading = useAppStore((s) => s.authLoading);
  const authError = useAppStore((s) => s.authError);
  const login = useAppStore((s) => s.login);
  const signUp = useAppStore((s) => s.signUp);
  const setAuthError = useAppStore((s) => s.setAuthError);
  const [activeTab, setActiveTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bizNameField, setBizNameField] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    setAuthError(null);
    setValidationError(null);
  }, [activeTab, setAuthError]);
  useEffect(() => {
    if (user && !authLoading) {
      navigate("/home");
    }
  }, [user, authLoading, navigate]);
  const getAuthT = () => {
    return AUTH_TRANSLATIONS[language] || AUTH_TRANSLATIONS["en"];
  };
  const tAuth = getAuthT();
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setValidationError(null);
    setAuthError(null);
    if (!email || !email.includes("@")) {
      setValidationError(language === "hi" ? "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 \u0908\u092E\u0947\u0932 \u092A\u0924\u093E \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964" : "Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setValidationError(language === "hi" ? "\u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0915\u092E \u0938\u0947 \u0915\u092E 6 \u0905\u0915\u094D\u0937\u0930\u094B\u0902 \u0915\u093E \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964" : "Password must be at least 6 characters.");
      return;
    }
    if (activeTab === "signup" && !bizNameField.trim()) {
      setValidationError(language === "hi" ? "\u0915\u0943\u092A\u092F\u093E \u0905\u092A\u0928\u0947 \u092C\u093F\u091C\u0928\u0947\u0938 \u0915\u093E \u0928\u093E\u092E \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964" : "Please enter your business name.");
      return;
    }
    let ok = false;
    if (activeTab === "signin") {
      ok = await login(email, password, setLanguage, setBusinessName);
    } else {
      ok = await signUp(email, password, bizNameField.trim(), language, setLanguage, setBusinessName);
    }
    if (ok) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }
  };
  return <div className="min-h-dvh flex flex-col justify-center px-5 py-8">
      {
    /* Language Switcher Bar at Top */
  }
      <div className="flex justify-end gap-1.5 mb-6">
        <div className="flex items-center gap-1 text-xs text-muted-foreground mr-1">
          <Globe className="h-3 w-3" />
        </div>
        {LANGUAGES.map((l) => <button
    key={l.code}
    onClick={() => setLanguage(l.code)}
    className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all ${language === l.code ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-foreground hover:bg-muted"}`}
  >
            {l.label}
          </button>)}
      </div>

      {
    /* Header Info */
  }
      <div className="text-center mb-6">
        <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="inline-flex items-center gap-1.5 rounded-full bg-accent/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[oklch(0.55_0.14_60)] mb-3"
  >
          <Sparkles className="h-3 w-3" /> शुरुआत AI
        </motion.div>
        <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight">
          {tAuth.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-[280px] mx-auto">
          {tAuth.subtitle}
        </p>
      </div>

      {
    /* Auth Card Container */
  }
      <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="w-full bg-card border border-border rounded-[32px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(224,122,95,0.12)] p-6"
  >
        {
    /* Toggle tabs */
  }
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-muted mb-6">
          <button
    onClick={() => setActiveTab("signin")}
    className={`flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === "signin" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
  >
            <LogIn className="h-4 w-4" />
            {tAuth.signInTab}
          </button>
          <button
    onClick={() => setActiveTab("signup")}
    className={`flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === "signup" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
  >
            <UserPlus className="h-4 w-4" />
            {tAuth.signUpTab}
          </button>
        </div>

        {
    /* Status Messages */
  }
        <AnimatePresence mode="wait">
          {(validationError || authError) && <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    className="mb-4 overflow-hidden"
  >
              <div className="flex items-start gap-2 p-3.5 bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl text-xs font-semibold">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <div className="flex-1">{validationError || authError}</div>
              </div>
            </motion.div>}

          {success && <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    className="mb-4 overflow-hidden"
  >
              <div className="flex items-center gap-2 p-3.5 bg-[oklch(0.55_0.14_145)]/15 border border-[oklch(0.5_0.14_145)]/20 text-[oklch(0.5_0.14_145)] rounded-2xl text-xs font-semibold">
                <Check className="h-4 w-4 shrink-0" />
                <div>{tAuth.successMsg}</div>
              </div>
            </motion.div>}
        </AnimatePresence>

        {
    /* Credentials Form */
  }
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {
    /* Sign Up Fields */
  }
          {activeTab === "signup" && <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-4"
  >
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5 pl-1">
                  {tAuth.bizLabel}
                </label>
                <input
    type="text"
    required
    value={bizNameField}
    onChange={(e) => setBizNameField(e.target.value)}
    placeholder={tAuth.bizPlaceholder}
    disabled={authLoading || success}
    className="w-full h-13 rounded-2xl border border-border bg-muted/20 px-4 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary focus:bg-card focus:ring-4 focus:ring-ring/20 transition-all"
  />
              </div>
            </motion.div>}

          {
    /* Email input */
  }
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5 pl-1">
              {tAuth.emailLabel}
            </label>
            <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder={tAuth.emailPlaceholder}
    disabled={authLoading || success}
    className="w-full h-13 rounded-2xl border border-border bg-muted/20 px-4 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary focus:bg-card focus:ring-4 focus:ring-ring/20 transition-all"
  />
          </div>

          {
    /* Password Input */
  }
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5 pl-1">
              {tAuth.passwordLabel}
            </label>
            <div className="relative">
              <input
    type={showPassword ? "text" : "password"}
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder={tAuth.passwordPlaceholder}
    disabled={authLoading || success}
    className="w-full h-13 rounded-2xl border border-border bg-muted/20 pl-4 pr-11 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary focus:bg-card focus:ring-4 focus:ring-ring/20 transition-all"
  />
              <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground transition-all"
  >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {
    /* Language selector in signup */
  }
          {activeTab === "signup" && <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    className="pt-1.5"
  >
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5 pl-1">
                {tAuth.langLabel}
              </label>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((l) => <Chip
    key={l.code}
    active={language === l.code}
    onClick={() => setLanguage(l.code)}
  >
                    {l.label}
                  </Chip>)}
              </div>
            </motion.div>}

          {
    /* Submit Button */
  }
          <div className="pt-2">
            <PrimaryButton
    type="submit"
    disabled={authLoading || success}
    className="relative w-full overflow-hidden"
  >
              {authLoading ? <div className="flex items-center gap-2">
                  <div className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  <span>Loading...</span>
                </div> : <span className="flex items-center gap-2">
                  {activeTab === "signin" ? <>
                      <LogIn className="h-5 w-5" />
                      {tAuth.signInBtn}
                    </> : <>
                      <UserPlus className="h-5 w-5" />
                      {tAuth.signUpBtn}
                    </>}
                </span>}
            </PrimaryButton>
          </div>
        </form>

        {
    /* Tab switch helpers */
  }
        <div className="mt-5 text-center text-xs text-muted-foreground">
          {activeTab === "signin" ? <>
              {tAuth.noAccount}{" "}
              <button
    onClick={() => setActiveTab("signup")}
    className="font-bold text-primary hover:underline pl-0.5"
  >
                {tAuth.switchSignUp}
              </button>
            </> : <>
              {tAuth.haveAccount}{" "}
              <button
    onClick={() => setActiveTab("signin")}
    className="font-bold text-primary hover:underline pl-0.5"
  >
                {tAuth.switchSignIn}
              </button>
            </>}
        </div>
      </motion.div>

      {
    /* Decorative Rangoli divider */
  }
      <RangoliDivider className="my-6" />

      {
    /* Environment Config Info Card */
  }
      {!isSupabaseConfigured && <div className="px-1 text-center">
          <div className="inline-flex items-center gap-2 rounded-2xl bg-amber-500/10 border border-amber-500/25 px-4 py-2.5 text-[11px] text-amber-600 font-semibold leading-normal max-w-sm mx-auto">
            <Server className="h-3.5 w-3.5 shrink-0" />
            <div className="text-left">
              <strong className="block text-[12px]">{tAuth.demoModeTitle}</strong>
              <span className="opacity-90 font-medium">{tAuth.demoModeDesc}</span>
            </div>
          </div>
        </div>}
    </div>;
}
