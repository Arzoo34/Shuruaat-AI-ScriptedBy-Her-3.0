import { o as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useTranslation } from "./_ssr/language-context-Bii3c4ao.mjs";
import { o as runQnaAgent } from "./_ssr/client-Cvb2MelD.mjs";
import { i as useAppStore, t as DEMO_LISTING_ID } from "./_ssr/appStore-DE__d2z0.mjs";
import { t as motion } from "./_libs/framer-motion.mjs";
import { G as Check, p as Sparkles, v as Send, x as Pencil } from "./_libs/lucide-react.mjs";
import { a as PageHeader, c as SectionTitle, s as RangoliDivider, t as Card } from "./_ssr/ui-bits-DhZiA71u.mjs";
import { r as SkeletonLoader, t as ErrorState } from "./_ssr/SkeletonLoader-Bxx5ENob.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_tabs.qa-DTKy5XQL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TOPIC_COLORS = {
	sizing: "oklch(0.688 0.164 47)",
	fabric: "oklch(0.5 0.09 190)",
	colour: "oklch(0.82 0.16 85)",
	delivery: "oklch(0.55 0.14 145)"
};
function QAPage() {
	const { t, language } = useTranslation();
	const currentListing = useAppStore((s) => s.currentListing);
	const qnaData = useAppStore((s) => s.qnaData);
	const setQnaData = useAppStore((s) => s.setQnaData);
	const selectedLanguage = useAppStore((s) => s.selectedLanguage);
	const setSelectedLanguage = useAppStore((s) => s.setSelectedLanguage);
	const simulationUnlocked = useAppStore((s) => s.simulationUnlocked);
	const publishedListing = useAppStore((s) => s.publishedListing);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const fetchQna = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		setSelectedLanguage(language);
		const listingContext = publishedListing ?? currentListing?.final_listing ?? {
			title: "Demo Kurti",
			bullets: ["Hand block printed cotton kurti"],
			price: 899
		};
		try {
			const response = await runQnaAgent(DEMO_LISTING_ID, listingContext, language);
			setQnaData(response);
		} catch (err) {
			setError(err?.message || "Something went wrong — please try again");
		} finally {
			setLoading(false);
		}
	}, [
		currentListing,
		language,
		setQnaData,
		setSelectedLanguage
	]);
	(0, import_react.useEffect)(() => {
		if (!qnaData || selectedLanguage !== language) fetchQna();
		else setLoading(false);
	}, [
		language,
		qnaData,
		selectedLanguage
	]);
	const individualReplies = qnaData?.individual_replies ?? [];
	const patternFlags = qnaData?.pattern_flags ?? [];
	const totalPatternQuestions = patternFlags.reduce((sum, p) => sum + p.question_count, 0) || 1;
	const patternPct = patternFlags.map((p) => ({
		label: p.topic.charAt(0).toUpperCase() + p.topic.slice(1),
		pct: Math.round(p.question_count / totalPatternQuestions * 100),
		color: TOPIC_COLORS[p.topic] ?? "oklch(0.688 0.164 47)"
	}));
	if (!simulationUnlocked) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("qaAgent"),
		subtitle: t("qaSubtitle")
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
					children: "Publish your first listing and simulate some time passing to start seeing buyer questions here."
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
		title: t("qaAgent"),
		subtitle: t("qaSubtitle")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonLoader, {})
	})] });
	if (error && !qnaData) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("qaAgent"),
		subtitle: t("qaSubtitle")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		message: error,
		onRetry: fetchQna
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("qaAgent"),
			subtitle: t("qaSubtitle")
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 px-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				message: error,
				onRetry: fetchQna
			})
		}),
		qnaData?.fallback_used && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-5 mb-3 text-xs text-muted-foreground",
			children: "Showing fallback replies — agent was unavailable"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: t("recentQ"),
				title: t("waitingQ")
			}), individualReplies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No buyer questions to answer right now."
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: individualReplies.map((qq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: i * .08 },
					className: "card-warm overflow-hidden p-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 border-b border-border/60 bg-[oklch(0.97_0.03_75)] p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15 font-display font-bold text-primary",
							children: "?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground",
								children: "Buyer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-foreground/80",
								children: qq.question
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold uppercase tracking-widest text-primary",
									children: "AI Suggested Reply"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 rounded-2xl rounded-tl-sm bg-[oklch(0.97_0.03_140)] p-3 text-sm leading-relaxed text-foreground/85",
									children: qq.drafted_reply
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.55_0.14_145)] px-3.5 py-2 text-xs font-semibold text-white btn-lift",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }),
												" ",
												t("approve")
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }),
												" ",
												t("edit")
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground btn-lift",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" }),
												" ",
												t("send")
											]
										})
									]
								})
							]
						})]
					})]
				}, qq.question_id || i))
			})]
		}),
		patternFlags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangoliDivider, { className: "my-6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: t("patternTitle"),
					title: t("patternTitle")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: patternPct.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: p.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold",
							style: { color: p.color },
							children: [p.pct, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2.5 w-full overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: { width: 0 },
							animate: { width: `${p.pct}%` },
							transition: {
								duration: .9,
								ease: "easeOut"
							},
							className: "h-full rounded-full",
							style: { background: p.color }
						})
					})] }, p.label))
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: t("topMissing"),
					title: t("missingTitle")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: patternFlags.map((flag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "card-warm flex w-full items-center justify-between p-4 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-semibold text-foreground capitalize",
								children: [
									flag.topic,
									" — ",
									flag.question_count,
									" questions"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: flag.suggested_addition
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-[11px] text-primary",
								children: ["Update field: ", flag.field_to_update]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground",
							children: t("oneTapFix")
						})]
					}, flag.topic))
				})]
			})
		] })
	] });
}
//#endregion
export { QAPage as component };
