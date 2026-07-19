import { o as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useTranslation } from "./_ssr/language-context-Bii3c4ao.mjs";
import { i as getWeeklyBrief, t as applyHealthSuggestion } from "./_ssr/client-Cvb2MelD.mjs";
import { i as useAppStore } from "./_ssr/appStore-DE__d2z0.mjs";
import { t as motion } from "./_libs/framer-motion.mjs";
import { V as CircleCheck, b as Play, c as TrendingUp, j as Leaf, p as Sparkles, q as Calendar } from "./_libs/lucide-react.mjs";
import { a as PageHeader, c as SectionTitle, o as PrimaryButton, r as Gauge, s as RangoliDivider, t as Card } from "./_ssr/ui-bits-DhZiA71u.mjs";
import { r as SkeletonLoader, t as ErrorState } from "./_ssr/SkeletonLoader-Bxx5ENob.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_tabs.health-DTSYWdtM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var spark = [
	12,
	18,
	14,
	22,
	20,
	28,
	32,
	26,
	34,
	40,
	38,
	46
];
function formatTrend(trend) {
	if (trend.startsWith("down_from_")) return {
		label: `↓ from ${trend.replace("down_from_", "")}%`,
		positive: true
	};
	if (trend.startsWith("up_from_")) return {
		label: `↑ from ${trend.replace("up_from_", "")}%`,
		positive: false
	};
	return {
		label: trend,
		positive: true
	};
}
function HealthPage() {
	const { t, language, businessName } = useTranslation();
	const sellerProfile = useAppStore((s) => s.sellerProfile);
	const healthBrief = useAppStore((s) => s.healthBrief);
	const setHealthBrief = useAppStore((s) => s.setHealthBrief);
	const setSelectedLanguage = useAppStore((s) => s.setSelectedLanguage);
	const simulationUnlocked = useAppStore((s) => s.simulationUnlocked);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [applySuccess, setApplySuccess] = (0, import_react.useState)(null);
	const [applying, setApplying] = (0, import_react.useState)(false);
	const sellerId = sellerProfile?.seller_id || "seller_demo_1";
	const fetchBrief = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		setSelectedLanguage(language);
		try {
			const response = await getWeeklyBrief(sellerId, language, businessName);
			setHealthBrief(response);
		} catch (err) {
			setError(err?.message || "Something went wrong — please try again");
		} finally {
			setLoading(false);
		}
	}, [
		sellerId,
		language,
		businessName,
		setHealthBrief,
		setSelectedLanguage
	]);
	(0, import_react.useEffect)(() => {
		fetchBrief();
	}, [language, sellerId]);
	async function handleApplySuggestion() {
		const brief = healthBrief;
		if (!brief?.recommendation?.action) return;
		setApplying(true);
		setApplySuccess(null);
		try {
			const result = await applyHealthSuggestion(sellerId, brief.recommendation.action);
			setApplySuccess(result?.message || "Suggestion applied successfully!");
			setTimeout(() => setApplySuccess(null), 4e3);
		} catch (err) {
			setError(err?.message || "Something went wrong — please try again");
		} finally {
			setApplying(false);
		}
	}
	if (!simulationUnlocked) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("health"),
		subtitle: t("healthSubtitle")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-5 mt-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "text-center py-10 flex flex-col items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-bold text-foreground",
					children: "Waiting for activity"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground mb-6 max-w-[250px]",
					children: "Publish a listing and simulate some time passing to see your first weekly brief."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/home",
					className: "inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground btn-lift",
					children: "Go to Home"
				})
			]
		})
	})] });
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("health"),
		subtitle: t("healthSubtitle")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonLoader, {})
	})] });
	if (error && !healthBrief) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("health"),
		subtitle: t("healthSubtitle")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		message: error,
		onRetry: fetchBrief
	})] });
	const brief = healthBrief;
	const trend = formatTrend(brief.stats.return_rate_trend);
	const healthScore = Math.max(0, Math.min(100, 100 - brief.stats.return_rate));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("health"),
			subtitle: t("healthSubtitle")
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 px-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				message: error,
				onRetry: fetchBrief
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-l-4 border-l-primary bg-gradient-to-br from-[oklch(0.98_0.02_60)] to-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] font-semibold uppercase tracking-widest text-primary",
					children: [
						brief.week_range,
						" · ",
						brief.seller_name,
						"'s Weekly Digest"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-base leading-relaxed text-foreground",
					children: brief.narrative_summary
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 px-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "bg-gradient-to-br from-[oklch(0.96_0.05_75)] via-card to-[oklch(0.96_0.04_140)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
						value: healthScore,
						label: t("scoreVal")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold uppercase tracking-widest text-primary",
								children: t("checklistTitle").split(" ")[0]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-bold",
								children: t("scoreTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: t("scoreDesc")
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-4 gap-2 text-center",
					children: [
						[
							t("returns"),
							`${brief.stats.return_rate}%`,
							"oklch(0.55 0.14 145)"
						],
						[
							t("conv"),
							`${brief.stats.total_orders}`,
							"oklch(0.5 0.09 190)"
						],
						[
							"COD",
							`${brief.stats.cod_returns}`,
							"oklch(0.55 0.14 60)"
						],
						[
							t("rto"),
							`${brief.stats.prepaid_returns}`,
							"oklch(0.6 0.2 25)"
						]
					].map(([k, v, c]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-card p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-bold",
							style: { color: c },
							children: v
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-widest text-muted-foreground",
							children: k
						})]
					}, k))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6 px-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "bg-gradient-to-br from-secondary to-[oklch(0.4_0.09_190)] text-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
						type: "button",
						whileTap: { scale: .95 },
						className: "grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/95 text-secondary shadow-xl",
						"aria-label": "Play voice summary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-6 w-6 fill-secondary" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold uppercase tracking-widest opacity-80",
								children: t("voiceSummary")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold",
								children: t("listenIn")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm opacity-90 line-clamp-2",
								children: brief.narrative_summary
							})
						]
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangoliDivider, { className: "my-6" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Insights",
				title: t("salesGrowth")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-muted-foreground",
							children: t("returns")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-bold text-[oklch(0.55_0.14_145)]",
							children: trend.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: brief.stats.top_complaint_theme
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniSpark, { data: spark })]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-muted-foreground",
					children: "This week"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-2xl bg-[oklch(0.97_0.03_75)] p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-semibold",
								children: "Total orders"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: brief.week_range
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display font-bold text-primary",
							children: brief.stats.total_orders
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-2xl bg-[oklch(0.97_0.03_75)] p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-semibold",
								children: "Return rate"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-muted-foreground",
								children: [brief.stats.return_rate, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display font-bold text-primary",
							children: [brief.stats.return_rate, "%"]
						})]
					})]
				})] })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Recommendation",
				title: "Suggested action"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "bg-gradient-to-br from-[oklch(0.96_0.06_60)] to-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/15",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-foreground",
								children: brief.recommendation.text
							}), brief.recommendation.money_saved_estimate > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm font-semibold text-[oklch(0.5_0.14_145)]",
								children: [
									"Est. savings: ₹",
									brief.recommendation.money_saved_estimate.toLocaleString("en-IN"),
									"/week"
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
							onClick: handleApplySuggestion,
							disabled: applying,
							children: applying ? "Applying…" : "Apply Suggestion"
						})
					}),
					applySuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 4
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "mt-3 flex items-center gap-2 text-sm font-medium text-[oklch(0.5_0.14_145)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), applySuccess]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Top Opportunities",
				title: t("salesGrowth")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: [
					{
						Icon: Sparkles,
						tint: "oklch(0.82 0.16 85)",
						title: t("trendsTitle"),
						note: brief.stats.top_complaint_theme
					},
					{
						Icon: TrendingUp,
						tint: "oklch(0.5 0.09 190)",
						title: t("checklist3"),
						note: brief.recommendation.text
					},
					{
						Icon: Leaf,
						tint: "oklch(0.55 0.14 145)",
						title: t("reduceReturns"),
						note: t("insight2")
					}
				].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 shrink-0 place-items-center rounded-2xl",
						style: { background: `color-mix(in oklab, ${r.tint} 20%, white)` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.Icon, {
							className: "h-5 w-5",
							style: { color: r.tint }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display font-semibold",
							children: r.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: r.note
						})]
					})]
				}) }, r.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 px-5 pb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: t("trendsTitle"),
				title: t("trendsTitle"),
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5 text-primary" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "bg-gradient-to-br from-[oklch(0.96_0.06_60)] to-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-muted-foreground",
							children: brief.week_range
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-3xl font-extrabold text-primary",
							children: [brief.stats.return_rate, "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Return rate this week"
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-5xl",
						children: "🪔"
					})]
				})
			})]
		})
	] });
}
function MiniSpark({ data }) {
	const max = Math.max(...data);
	const w = 96, h = 40;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: w,
		height: h,
		className: "text-[oklch(0.55_0.14_145)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			points: data.map((v, i) => `${i / (data.length - 1) * w},${h - v / max * h}`).join(" "),
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
//#endregion
export { HealthPage as component };
