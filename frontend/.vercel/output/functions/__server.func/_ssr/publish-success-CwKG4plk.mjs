import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as useAppStore } from "./appStore-DE__d2z0.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { L as FastForward, V as CircleCheck, p as Sparkles } from "../_libs/lucide-react.mjs";
import { o as PrimaryButton, t as Card } from "./ui-bits-DhZiA71u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/publish-success-CwKG4plk.js
var import_jsx_runtime = require_jsx_runtime();
function KantriMotifDivider({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `flex items-center justify-center my-4 opacity-30 ${className || ""}`,
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "100%",
			height: "12",
			viewBox: "0 0 100 12",
			preserveAspectRatio: "none",
			className: "text-primary fill-current",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pattern", {
				id: "kantri-pattern-success",
				width: "10",
				height: "12",
				patternUnits: "userSpaceOnUse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "0,6 5,0 10,6 5,12",
					className: "fill-primary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "5",
					cy: "6",
					r: "1.5",
					className: "fill-background"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "100",
				height: "12",
				fill: "url(#kantri-pattern-success)"
			})]
		})
	});
}
function PublishSuccessPage() {
	const navigate = useNavigate();
	const setSimulationUnlocked = useAppStore((s) => s.setSimulationUnlocked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-[#FFF8F2]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KantriMotifDivider, { className: "mt-0 opacity-40 text-[oklch(0.55_0.14_145)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center px-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						scale: .5,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					transition: {
						type: "spring",
						bounce: .5,
						duration: .6
					},
					className: "relative mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: {
								y: [
									0,
									-10,
									0
								],
								opacity: [
									.5,
									1,
									.5
								]
							},
							transition: {
								repeat: Infinity,
								duration: 2
							},
							className: "absolute -top-4 -left-4 h-3 w-3 rounded-full bg-[#E57373]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: {
								y: [
									0,
									-15,
									0
								],
								opacity: [
									.5,
									1,
									.5
								]
							},
							transition: {
								repeat: Infinity,
								duration: 2.5,
								delay: .2
							},
							className: "absolute top-0 -right-6 h-4 w-4 rounded-full bg-[#FFB74D]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: {
								y: [
									0,
									-8,
									0
								],
								opacity: [
									.5,
									1,
									.5
								]
							},
							transition: {
								repeat: Infinity,
								duration: 1.8,
								delay: .4
							},
							className: "absolute -bottom-2 -left-6 h-3 w-3 rounded-full bg-[#81C784]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-24 w-24 items-center justify-center rounded-full bg-[oklch(0.55_0.14_145)]/10 text-[oklch(0.5_0.14_145)] shadow-inner",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-12 w-12" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						y: 20,
						opacity: 0
					},
					animate: {
						y: 0,
						opacity: 1
					},
					transition: { delay: .2 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl font-bold text-foreground",
							children: "🎉 Your listing is live!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "mt-8 border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 shrink-0 text-[#FFB74D] mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-muted-foreground text-left",
									children: "New listings don't have buyer activity yet. Let's fast-forward a few days to see how your AI agents would help once buyers start responding."
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
							className: "mt-10 w-full py-4 text-base shadow-lg shadow-primary/20 flex items-center justify-center gap-2",
							onClick: () => {
								setSimulationUnlocked(true);
								navigate({ to: "/home" });
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FastForward, { className: "h-5 w-5" }), " Simulate a few days passing"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KantriMotifDivider, { className: "mb-0 opacity-40 text-[oklch(0.55_0.14_145)] rotate-180" })
		]
	});
}
//#endregion
export { KantriMotifDivider, PublishSuccessPage as component };
