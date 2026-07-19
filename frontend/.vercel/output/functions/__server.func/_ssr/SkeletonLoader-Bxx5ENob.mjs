import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { p as Sparkles } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SkeletonLoader-Bxx5ENob.js
var import_jsx_runtime = require_jsx_runtime();
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
function SkeletonLoader({ messages, step = 0, className = "" }) {
	const displayMessages = messages?.length ? messages : ["Loading…"];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `space-y-4 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-2/3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-5/6" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 w-full rounded-2xl" })
			]
		}), messages && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: {
						opacity: 0,
						y: 6
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -6
					},
					className: "font-display text-sm font-semibold text-muted-foreground",
					children: displayMessages[Math.min(step, displayMessages.length - 1)]
				}, step)
			})
		})]
	});
}
function FullScreenLoader({ messages, step = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-50 grid place-items-center bg-background/85 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-6 w-full max-w-sm text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid h-28 w-28 place-items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-30 blur-2xl animate-pulse" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { rotate: 360 },
							transition: {
								duration: 4,
								repeat: Infinity,
								ease: "linear"
							},
							className: "absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "relative h-10 w-10 text-primary" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 6
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -6
						},
						className: "mt-6 font-display text-lg font-semibold text-foreground",
						children: messages[Math.min(step, messages.length - 1)]
					}, step)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-3 h-1.5 w-40 overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { width: `${(step + 1) / messages.length * 100}%` },
						className: "h-full rounded-full bg-gradient-to-r from-primary to-accent"
					})
				})
			]
		})
	});
}
function ErrorState({ message = "Something went wrong — please try again", onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-5 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-base font-semibold text-foreground",
			children: message
		}), onRetry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onRetry,
			className: "mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground btn-lift",
			children: "Try again"
		})]
	});
}
//#endregion
export { FullScreenLoader as n, SkeletonLoader as r, ErrorState as t };
