import { n as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { n as useTranslation } from "./_ssr/language-context-Bii3c4ao.mjs";
import { i as useAppStore } from "./_ssr/appStore-DE__d2z0.mjs";
import { h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "./_libs/framer-motion.mjs";
import { E as MessageCircle, I as Flame, J as Bell, P as HeartPulse, S as Package, X as ArrowUpRight, c as TrendingUp, p as Sparkles } from "./_libs/lucide-react.mjs";
import { a as PageHeader, c as SectionTitle, r as Gauge, s as RangoliDivider, t as Card } from "./_ssr/ui-bits-DhZiA71u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_tabs.home-DtQXNYDh.js
var import_jsx_runtime = require_jsx_runtime();
var home_illustration_default = "/assets/home-illustration-B36GwA7k.jpg";
function getGreeting(language, name) {
	const hr = (/* @__PURE__ */ new Date()).getHours();
	const sellerName = name || "Priya";
	if (language === "hi") {
		if (hr >= 5 && hr < 12) return `शुभ प्रभात, ${sellerName} 👋`;
		if (hr >= 12 && hr < 17) return `शुभ दोपहर, ${sellerName} 👋`;
		return `शुभ संध्या, ${sellerName} 👋`;
	}
	if (language === "ta") {
		if (hr >= 5 && hr < 12) return `காலை வணக்கம், ${sellerName} 👋`;
		if (hr >= 12 && hr < 17) return `மதிய வணக்கம், ${sellerName} 👋`;
		return `மாலை வணக்கம், ${sellerName} 👋`;
	}
	if (language === "bn") {
		if (hr >= 5 && hr < 12) return `সুপ্রভাত, ${sellerName} 👋`;
		if (hr >= 12 && hr < 17) return `শুভ দুপুর, ${sellerName} 👋`;
		return `শুভ সন্ধ্যা, ${sellerName} 👋`;
	}
	if (hr >= 5 && hr < 12) return `Good Morning, ${sellerName} 👋`;
	if (hr >= 12 && hr < 17) return `Good Afternoon, ${sellerName} 👋`;
	return `Good Evening, ${sellerName} 👋`;
}
function HomePage() {
	const { t, businessName, language } = useTranslation();
	const simulationUnlocked = useAppStore((s) => s.simulationUnlocked);
	const publishedListings = useAppStore((s) => s.publishedListings);
	const hasProducts = publishedListings && publishedListings.length > 0;
	const averageRisk = hasProducts ? Math.round(publishedListings.reduce((sum, item) => sum + (item.risk_score || 0), 0) / publishedListings.length) : simulationUnlocked ? 18 : 0;
	const returnScore = 100 - averageRisk;
	const totalRevenue = hasProducts ? `₹${(publishedListings.reduce((sum, item) => sum + (item.price || 0), 0) * 12).toLocaleString("en-IN")}` : simulationUnlocked ? "₹14.2k" : "₹0";
	const returnsCount = hasProducts ? Math.max(1, Math.round(publishedListings.length * (averageRisk / 100) * 4)) : simulationUnlocked ? 4 : 0;
	const salesChange = hasProducts ? `+${publishedListings.length * 6}%` : simulationUnlocked ? "+22%" : "--";
	const returnsChange = hasProducts ? `−${Math.max(1, Math.round(publishedListings.length / 2))}` : simulationUnlocked ? "−1" : "--";
	const agents = [
		{
			to: "/listing",
			label: t("listingAgent"),
			desc: t("listingAgentDesc"),
			Icon: Package,
			tint: "from-[oklch(0.94_0.06_75)] to-[oklch(0.98_0.03_80)]"
		},
		{
			to: "/qa",
			label: t("qaAgent"),
			desc: t("qaAgentDesc"),
			Icon: MessageCircle,
			tint: "from-[oklch(0.92_0.05_190)] to-[oklch(0.98_0.02_190)]"
		},
		{
			to: "/health",
			label: t("healthAgent"),
			desc: t("healthAgentDesc"),
			Icon: HeartPulse,
			tint: "from-[oklch(0.94_0.06_140)] to-[oklch(0.98_0.03_140)]"
		}
	];
	const trends = [
		{
			emoji: "🪔",
			title: t("diyas"),
			note: t("trends1")
		},
		{
			emoji: "👗",
			title: t("kurtis"),
			note: t("trends2")
		},
		{
			emoji: "💄",
			title: t("oil"),
			note: t("trends3")
		}
	];
	const greeting = getGreeting(language, businessName);
	const initial = (businessName || "Priya").trim().charAt(0).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: greeting,
			subtitle: t("homeSubtitle"),
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "grid h-11 w-11 place-items-center rounded-2xl border border-border bg-card",
					"aria-label": "Notifications",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5 text-foreground/70" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/profile",
					className: "grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent font-display font-bold text-primary-foreground btn-lift",
					"aria-label": "Profile",
					children: initial
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "overflow-hidden rounded-[32px] border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: home_illustration_default,
						alt: "Woman packing her products",
						className: "h-24 w-24 shrink-0 rounded-2xl object-cover",
						width: 1024,
						height: 768,
						loading: "lazy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold uppercase tracking-widest text-secondary",
								children: t("healthAgent")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-4xl font-extrabold text-foreground",
									children: hasProducts ? returnScore : simulationUnlocked ? "92" : "--"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold text-[oklch(0.55_0.14_145)]",
									children: t("scoreTitle").split(" — ")[0]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: t("scoreDesc")
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 w-full overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: { width: 0 },
							animate: { width: hasProducts ? `${returnScore}%` : simulationUnlocked ? "92%" : "0%" },
							transition: {
								duration: 1.1,
								ease: "easeOut"
							},
							className: "h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.16_140)] to-[oklch(0.82_0.16_85)]"
						})
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangoliDivider, { className: "my-6" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: t("checklistTitle"),
				title: t("waitingQ").split(" ")[0] + " " + t("checklistTitle")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: "hidden",
				animate: "show",
				variants: { show: { transition: { staggerChildren: .08 } } },
				className: "flex flex-col gap-3",
				children: agents.map(({ to, label, desc, Icon, tint }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: {
						hidden: {
							opacity: 0,
							y: 8
						},
						show: {
							opacity: 1,
							y: 0
						}
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to,
						className: "block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `card-warm flex items-center gap-4 bg-gradient-to-br ${tint} p-4`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-card shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "h-6 w-6 text-primary",
										strokeWidth: 2.2
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display font-semibold text-foreground",
										children: label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm text-muted-foreground",
										children: desc
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-5 w-5 text-foreground/50" })
							]
						})
					})
				}, to))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: t("trendsTitle"),
				title: t("trendsTitle"),
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-primary" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-5 overflow-x-auto pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-3 px-5",
					children: trends.map((tItem) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "w-52 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-3xl",
								children: tItem.emoji
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-2 font-display font-semibold",
								children: tItem.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: tItem.note
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 inline-flex items-center gap-1 rounded-full bg-accent/20 px-2.5 py-1 text-[11px] font-semibold text-[oklch(0.5_0.14_60)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3 w-3" }), " Trending"]
							})
						]
					}, tItem.title))
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: t("missingTitle"),
				title: t("fix1")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "bg-gradient-to-br from-[oklch(0.97_0.04_85)] to-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-[oklch(0.55_0.14_60)]" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display font-semibold",
								children: t("fix1")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: t("insight1")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "mt-3 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground btn-lift",
								children: t("oneTapFix")
							})
						]
					})]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: t("checklistTitle"),
				title: t("checklistTitle")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase tracking-widest text-muted-foreground",
								children: t("home")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-2xl font-bold text-[oklch(0.55_0.14_145)]",
								children: totalRevenue
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: salesChange
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase tracking-widest text-muted-foreground",
								children: t("returns")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-2xl font-bold text-primary",
								children: returnsCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: returnsChange
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-widest text-muted-foreground",
							children: t("rto")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "scale-[0.55] origin-top -my-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { value: hasProducts ? averageRisk : simulationUnlocked ? 18 : 0 })
							})
						})]
					})
				]
			})]
		})
	] });
}
//#endregion
export { HomePage as component };
