import { o as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useTranslation } from "./_ssr/language-context-Bii3c4ao.mjs";
import { i as useAppStore } from "./_ssr/appStore-DE__d2z0.mjs";
import { g as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { B as CircleHelp, J as Bell, M as Languages, O as LogOut, U as ChevronRight, Y as Award, d as Store, m as Shield } from "./_libs/lucide-react.mjs";
import { a as PageHeader, s as RangoliDivider, t as Card } from "./_ssr/ui-bits-DhZiA71u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_tabs.profile-DLhYdKRl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { t, businessName, setBusinessName } = useTranslation();
	const user = useAppStore((s) => s.user);
	const logout = useAppStore((s) => s.logout);
	const publishedListings = useAppStore((s) => s.publishedListings);
	const setCurrentListing = useAppStore((s) => s.setCurrentListing);
	const navigate = useNavigate();
	const [showStoreDetails, setShowStoreDetails] = (0, import_react.useState)(false);
	const items = [
		{
			id: "store",
			Icon: Store,
			label: t("storeDetails"),
			note: businessName || t("storeName")
		},
		{
			id: "lang",
			Icon: Languages,
			label: t("language"),
			note: t("language") === "Language" ? "English" : "हिन्दी"
		},
		{
			id: "notif",
			Icon: Bell,
			label: t("notifSettings"),
			note: t("notifNote")
		},
		{
			id: "help",
			Icon: CircleHelp,
			label: t("helpSupport")
		},
		{
			id: "privacy",
			Icon: Shield,
			label: t("privacy")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("profile"),
			subtitle: t("profileSubtitle")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-primary to-accent font-display text-3xl font-extrabold text-primary-foreground",
						children: (businessName || user?.email || "P").trim().charAt(0).toUpperCase()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-xl font-bold",
						children: businessName || user?.email?.split("@")[0] || "Priya Sharma"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1 max-w-[250px] mx-auto truncate",
						children: user?.email || "priya@example.com"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-0.5",
						children: businessName ? `${businessName} • Jaipur` : t("storeName")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.55_0.14_145)]/15 px-3 py-1 text-xs font-semibold text-[oklch(0.5_0.14_145)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3.5 w-3.5" }),
							" ",
							t("topRated")
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangoliDivider, { className: "my-6" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2 px-5",
			children: items.map(({ id, Icon, label, note }) => {
				const isStore = id === "store";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							if (isStore) setShowStoreDetails(!showStoreDetails);
						},
						className: "card-warm flex w-full items-center gap-4 p-4 text-left btn-lift",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[oklch(0.97_0.03_75)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-foreground",
									children: label
								}), note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: note
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `h-5 w-5 text-muted-foreground transition-transform duration-200 ${isStore && showStoreDetails ? "rotate-90" : ""}` })
						]
					}), isStore && showStoreDetails && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 space-y-2.5 pl-4 pr-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2",
							children: [
								"Listed Products (",
								publishedListings.length,
								")"
							]
						}), publishedListings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground py-4 text-center bg-card/40 rounded-2xl border border-dashed border-border",
							children: "No products listed yet."
						}) : publishedListings.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setCurrentListing({
									final_listing: {
										title: product.title,
										bullets: product.bullets || [
											`High-quality ${product.material || "fabric"} material for comfort`,
											`Perfect for ${product.occasion || "daily"} wear`,
											`Color: ${product.colour || "Standard"}`
										],
										size_chart: product.size_chart || { Free: "Standard Size Fit" },
										price: product.price,
										keywords: product.keywords || [product.title.toLowerCase()],
										material: product.material,
										fabric: product.fabric || product.material,
										colour: product.colour,
										pattern: product.pattern || "Solid",
										sleeve: product.sleeve,
										occasion: product.occasion,
										available_sizes: product.available_sizes
									},
									risk_score: product.risk_score ?? 15,
									issues_found: product.issues_found ?? [],
									pincode_risk: {
										risk_level: "low",
										estimated_return_rate_pct: 8.4
									},
									declared_category: product.category,
									uploadedImageUrl: product.uploadedImageUrl
								});
								navigate({ to: "/listing/preview" });
							},
							className: "flex w-full text-left gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm hover:shadow-md transition-all btn-lift items-center",
							children: [product.uploadedImageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: product.uploadedImageUrl,
								alt: product.title,
								className: "w-12 h-12 rounded-xl object-cover shrink-0 border border-border"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
											className: "font-semibold text-sm text-foreground truncate",
											children: product.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-bold text-primary shrink-0",
											children: ["₹", product.price]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex flex-wrap gap-1 text-[10px] text-muted-foreground uppercase font-medium",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bg-muted px-1.5 py-0.5 rounded",
												children: product.category
											}),
											product.material && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bg-muted px-1.5 py-0.5 rounded",
												children: product.material
											}),
											product.colour && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bg-muted px-1.5 py-0.5 rounded",
												children: product.colour
											}),
											product.sleeve && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bg-muted px-1.5 py-0.5 rounded",
												children: product.sleeve
											})
										]
									}),
									product.available_sizes && product.available_sizes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground",
											children: "Sizes:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex gap-1 flex-wrap",
											children: product.available_sizes.map((sz) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded",
												children: sz
											}, sz))
										})]
									})
								]
							})]
						}, product.id))]
					})]
				}, label);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 pt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: async () => {
					await logout(setBusinessName);
					navigate({ to: "/" });
				},
				className: "flex w-full items-center justify-center gap-2 rounded-full border border-destructive/30 bg-card py-3 text-sm font-semibold text-destructive btn-lift cursor-pointer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }),
					" ",
					t("logout")
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-center text-xs text-muted-foreground",
				children: t("madeWith")
			})]
		})
	] });
}
//#endregion
export { ProfilePage as component };
