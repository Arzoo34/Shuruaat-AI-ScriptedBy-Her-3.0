import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-bits-DhZiA71u.js
var import_jsx_runtime = require_jsx_runtime();
function RangoliDivider({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("divider-rangoli w-full", className),
		"aria-hidden": true
	});
}
function Card({ children, className, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 12
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .35,
			ease: "easeOut"
		},
		onClick,
		className: cn("card-warm p-5", className),
		children
	});
}
function PrimaryButton({ children, onClick, type = "button", className, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		whileTap: { scale: .98 },
		whileHover: { y: -2 },
		type,
		onClick,
		disabled,
		className: cn("inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.72_0.16_55)] px-6 text-base font-semibold text-primary-foreground shadow-[0_12px_28px_-10px_oklch(0.6_0.15_50/0.55)] transition-all disabled:opacity-60", className),
		children
	});
}
function GhostButton({ children, onClick, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		whileTap: { scale: .98 },
		onClick,
		className: cn("inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold text-foreground btn-lift", className),
		children
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("chip", active && "chip-active"),
		children
	});
}
function SectionTitle({ eyebrow, title, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/80",
				children: eyebrow
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "truncate font-display text-lg font-semibold text-foreground",
				children: title
			})]
		}), action]
	});
}
function PageHeader({ title, subtitle, right }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "px-5 pt-6 pb-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-bold leading-tight text-foreground",
					children: title
				}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: subtitle
				})]
			}), right]
		})
	});
}
function Gauge({ value, label }) {
	const clamped = Math.max(0, Math.min(100, value));
	const r = 46;
	const c = 2 * Math.PI * r;
	const offset = c - clamped / 100 * c;
	const color = clamped < 25 ? "oklch(0.58 0.14 145)" : clamped < 50 ? "oklch(0.82 0.16 85)" : "oklch(0.6 0.2 25)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative grid h-32 w-32 place-items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: "h-full w-full -rotate-90",
			viewBox: "0 0 120 120",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r,
				strokeWidth: "10",
				fill: "none",
				stroke: "oklch(0.92 0.02 70)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
				cx: "60",
				cy: "60",
				r,
				strokeWidth: "10",
				fill: "none",
				stroke: color,
				strokeLinecap: "round",
				strokeDasharray: c,
				initial: { strokeDashoffset: c },
				animate: { strokeDashoffset: offset },
				transition: {
					duration: 1.1,
					ease: "easeOut"
				}
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-display text-3xl font-bold",
				style: { color },
				children: [clamped, "%"]
			}), label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-widest text-muted-foreground",
				children: label
			})]
		})]
	});
}
//#endregion
export { PageHeader as a, SectionTitle as c, GhostButton as i, Chip as n, PrimaryButton as o, Gauge as r, RangoliDivider as s, Card as t };
