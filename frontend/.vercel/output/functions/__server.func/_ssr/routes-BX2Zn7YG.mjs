import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useTranslation } from "./language-context-Bii3c4ao.mjs";
import { i as useAppStore } from "./appStore-DE__d2z0.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { Z as ArrowRight, p as Sparkles } from "../_libs/lucide-react.mjs";
import { n as Chip, o as PrimaryButton } from "./ui-bits-DhZiA71u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BX2Zn7YG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_entrepreneur_default = "/assets/hero-entrepreneur-C-Y_50Ws.jpg";
var LANGUAGES = [
	{
		code: "hi",
		label: "हिन्दी",
		en: "Hindi"
	},
	{
		code: "gu",
		label: "ગુજરાતી",
		en: "Gujarati"
	},
	{
		code: "ta",
		label: "தமிழ்",
		en: "Tamil"
	},
	{
		code: "te",
		label: "తెలుగు",
		en: "Telugu"
	},
	{
		code: "bn",
		label: "বাংলা",
		en: "Bengali"
	},
	{
		code: "mr",
		label: "मराठी",
		en: "Marathi"
	},
	{
		code: "kn",
		label: "ಕನ್ನಡ",
		en: "Kannada"
	},
	{
		code: "pa",
		label: "ਪੰਜਾਬੀ",
		en: "Punjabi"
	},
	{
		code: "en",
		label: "English",
		en: "English"
	}
];
var CATEGORIES = [
	"Sarees",
	"Kurtis",
	"Jewellery",
	"Beauty",
	"Kitchen",
	"Home Decor",
	"Handicrafts",
	"Other"
];
function Onboarding() {
	const navigate = useNavigate();
	const { language, setLanguage, t, businessName, setBusinessName } = useTranslation();
	const [cat, setCat] = (0, import_react.useState)(null);
	const user = useAppStore((s) => s.user);
	const authLoading = useAppStore((s) => s.authLoading);
	(0, import_react.useEffect)(() => {
		if (user && !authLoading) navigate({ to: "/home" });
	}, [
		user,
		authLoading,
		navigate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 pt-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "inline-flex items-center gap-1.5 rounded-full bg-accent/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[oklch(0.55_0.14_60)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }),
							" ",
							t("namaste")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 font-display text-[40px] font-extrabold leading-[1.05] text-foreground",
						children: ["शुरुआत ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "AI"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-lg font-medium text-foreground/85",
						children: t("tagline")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: t("subtagline")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					scale: .96
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: { duration: .5 },
				className: "mx-6 mt-6 overflow-hidden rounded-[36px] border border-border bg-card shadow-[0_20px_50px_-24px_oklch(0.5_0.12_45/0.35)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_entrepreneur_default,
					alt: "Indian woman entrepreneur with her products",
					className: "animate-float h-48 sm:h-64 w-full object-cover object-top",
					width: 1024,
					height: 1024
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-sm font-semibold text-foreground/80",
					children: t("chooseLang")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: LANGUAGES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						active: language === l.code,
						onClick: () => setLanguage(l.code),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: l.label
						}), l.code !== "en" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] opacity-70",
							children: l.en
						})]
					}, l.code))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-2 block text-sm font-semibold text-foreground/80",
					children: t("bizName")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: businessName,
					onChange: (e) => setBusinessName(e.target.value),
					placeholder: t("bizPlaceholder"),
					className: "h-14 w-full rounded-2xl border border-border bg-card px-5 text-base outline-none placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-ring/30"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-sm font-semibold text-foreground/80",
					children: t("whatSell")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: cat === c,
						onClick: () => setCat(c),
						children: c
					}, c))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
						onClick: () => {
							navigate({ to: "/auth" });
						},
						children: [
							t("continue"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-5 w-5" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "text-sm font-semibold text-primary hover:underline",
							children: language === "hi" ? "पहले से खाता है? लॉग इन करें" : "Already have an account? Sign In"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-center text-xs text-muted-foreground",
						children: t("encouragement")
					})
				]
			})
		]
	});
}
//#endregion
export { Onboarding as component };
