import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useTranslation } from "./language-context-Bii3c4ao.mjs";
import { i as useAppStore } from "./appStore-DE__d2z0.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { W as ChevronLeft, f as Star, g as ShieldAlert, h as ShieldCheck, l as ToggleRight, n as Wrench, o as Truck, u as ToggleLeft, v as Send, w as Mic, x as Pencil } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as GhostButton, o as PrimaryButton, r as Gauge, t as Card } from "./ui-bits-DhZiA71u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listing.preview-CIMns1eE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function extractMaterial(listing) {
	const text = `${listing.title || ""} ${listing.keywords?.join(" ") || ""} ${listing.bullets?.join(" ") || ""}`.toLowerCase();
	if (text.includes("cotton") || text.includes("सूती")) return "Cotton";
	if (text.includes("silk") || text.includes("रेशम")) return "Silk";
	if (text.includes("chiffon")) return "Chiffon";
	if (text.includes("georgette")) return "Georgette";
	if (text.includes("linen") || text.includes("लिनन")) return "Linen";
	if (text.includes("wool") || text.includes("ऊन")) return "Wool";
	if (text.includes("leather") || text.includes("चमड़ा")) return "Leather";
	if (text.includes("metal") || text.includes("धातु")) return "Metal";
	if (text.includes("silver") || text.includes("चांदी")) return "Silver";
	if (text.includes("gold") || text.includes("सोना")) return "Gold";
	return "";
}
function extractColour(listing) {
	const text = `${listing.title || ""} ${listing.keywords?.join(" ") || ""} ${listing.bullets?.join(" ") || ""}`.toLowerCase();
	if (text.includes("red") || text.includes("लाल")) return "Red";
	if (text.includes("blue") || text.includes("नीला")) return "Blue";
	if (text.includes("green") || text.includes("हरा")) return "Green";
	if (text.includes("yellow") || text.includes("पीला")) return "Yellow";
	if (text.includes("pink") || text.includes("गुलाबी")) return "Pink";
	if (text.includes("black") || text.includes("काला")) return "Black";
	if (text.includes("white") || text.includes("सफ़ेद")) return "White";
	if (text.includes("gold") || text.includes("सुनहरा")) return "Gold";
	if (text.includes("orange") || text.includes("नारंगी")) return "Orange";
	if (text.includes("purple") || text.includes("बैंगनी")) return "Purple";
	if (text.includes("indigo") || text.includes("इंडिगो")) return "Indigo";
	return "";
}
function extractSleeve(listing) {
	const text = `${listing.title || ""} ${listing.keywords?.join(" ") || ""} ${listing.bullets?.join(" ") || ""}`.toLowerCase();
	if (text.includes("sleeveless") || text.includes("बिना आस्तीन")) return "Sleeveless";
	if (text.includes("short sleeve") || text.includes("छोटी आस्तीन")) return "Short Sleeve";
	if (text.includes("full sleeve") || text.includes("पूरी आस्तीन") || text.includes("full-sleeve")) return "Full Sleeve";
	if (text.includes("half sleeve") || text.includes("half-sleeve")) return "Half Sleeve";
	if (text.includes("3/4 sleeve") || text.includes("three-quarter")) return "3/4 Sleeve";
	return "";
}
function extractOccasion(listing) {
	const text = `${listing.title || ""} ${listing.keywords?.join(" ") || ""} ${listing.bullets?.join(" ") || ""}`.toLowerCase();
	if (text.includes("wedding") || text.includes("शादी") || text.includes("bridal")) return "Wedding";
	if (text.includes("festive") || text.includes("त्यौहार") || text.includes("festival")) return "Festive";
	if (text.includes("party") || text.includes("पार्टी")) return "Party Wear";
	if (text.includes("casual") || text.includes("कैजुअल")) return "Casual";
	if (text.includes("formal") || text.includes("औपचारिक")) return "Formal";
	if (text.includes("daily") || text.includes("रोजाना")) return "Daily Wear";
	return "";
}
function KantriMotifDivider({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-center justify-center my-4 opacity-30", className),
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "100%",
			height: "12",
			viewBox: "0 0 100 12",
			preserveAspectRatio: "none",
			className: "text-primary fill-current",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pattern", {
				id: "kantri-pattern",
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
				fill: "url(#kantri-pattern)"
			})]
		})
	});
}
function PreviewPage() {
	const { t, language } = useTranslation();
	const navigate = useNavigate();
	const currentListing = useAppStore((s) => s.currentListing);
	const setCurrentListing = useAppStore((s) => s.setCurrentListing);
	const resolveIssue = useAppStore((s) => s.resolveIssue);
	const addPublishedListing = useAppStore((s) => s.addPublishedListing);
	const setPublishedListing = useAppStore((s) => s.setPublishedListing);
	(0, import_react.useEffect)(() => {
		if (!currentListing?.final_listing) navigate({ to: "/listing" });
	}, [currentListing, navigate]);
	const [productName, setProductName] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)(1499);
	const [material, setMaterial] = (0, import_react.useState)("");
	const [colour, setColour] = (0, import_react.useState)("");
	const [sleeve, setSleeve] = (0, import_react.useState)("");
	const [occasion, setOccasion] = (0, import_react.useState)("");
	const [selectedSizes, setSelectedSizes] = (0, import_react.useState)([]);
	const [description, setDescription] = (0, import_react.useState)("");
	const [detailsExpanded, setDetailsExpanded] = (0, import_react.useState)(true);
	const [isRecordingDescription, setIsRecordingDescription] = (0, import_react.useState)(false);
	const [enforcePrepaid, setEnforcePrepaid] = (0, import_react.useState)(true);
	const recognitionRef = (0, import_react.useRef)(null);
	const titleInputRef = (0, import_react.useRef)(null);
	const [showPushDrawer, setShowPushDrawer] = (0, import_react.useState)(false);
	const [selectedChannels, setSelectedChannels] = (0, import_react.useState)({
		meesho: true,
		amazon: false,
		instagram: true,
		whatsapp: true
	});
	const channels = [
		{
			id: "meesho",
			label: "Meesho",
			icon: "📦"
		},
		{
			id: "amazon",
			label: "Amazon.in",
			icon: "🛒"
		},
		{
			id: "instagram",
			label: "Instagram Shop",
			icon: "📸"
		},
		{
			id: "whatsapp",
			label: "WhatsApp Catalog",
			icon: "💬"
		}
	];
	function handleEditClick() {
		setDetailsExpanded(true);
		setTimeout(() => {
			titleInputRef.current?.focus();
			titleInputRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
		}, 100);
	}
	(0, import_react.useEffect)(() => {
		if (currentListing?.final_listing) {
			const listingObj = currentListing.final_listing;
			setProductName(listingObj.title || "");
			setPrice(listingObj.price || 1499);
			setMaterial(listingObj.material || listingObj.fabric || extractMaterial(listingObj));
			setColour(listingObj.colour || listingObj.pattern || extractColour(listingObj));
			setSleeve(listingObj.sleeve || extractSleeve(listingObj));
			setOccasion(listingObj.occasion || extractOccasion(listingObj));
			const initialSizes = listingObj.available_sizes || listingObj.sizes || (listingObj.size_chart ? Object.keys(listingObj.size_chart) : ["Free"]);
			setSelectedSizes(initialSizes);
			setDescription(listingObj.description || (listingObj.bullets ? listingObj.bullets.join("\n") : ""));
		}
	}, [currentListing]);
	if (!currentListing?.final_listing) return null;
	const riskScore = currentListing.risk_score ?? 0;
	const readiness = Math.round(100 - riskScore);
	const issues = currentListing.issues_found ?? [];
	const imageSrc = currentListing.uploadedImageUrl || "/assets/product-saree-Dwvy6WnB.jpg";
	const isApparel = currentListing.declared_category === "kurti" || currentListing.declared_category === "saree" || currentListing.declared_category === "tshirt" || currentListing.declared_category === "pants" || currentListing.declared_category === "dress";
	function updateListingField(key, value) {
		if (!currentListing) return;
		setCurrentListing({
			...currentListing,
			final_listing: {
				...currentListing.final_listing,
				[key]: value
			}
		});
	}
	function handleFixIssue(index) {
		resolveIssue(index);
	}
	function toggleSizeSelection(sz) {
		let next;
		if (selectedSizes.includes(sz)) next = selectedSizes.filter((s) => s !== sz);
		else next = [...selectedSizes, sz];
		setSelectedSizes(next);
		updateListingField("sizes", next);
		const newChart = {};
		next.forEach((s) => {
			newChart[s] = (currentListing?.final_listing)?.size_chart?.[s] || "Standard Fit";
		});
		updateListingField("size_chart", newChart);
	}
	function toggleDescriptionRecording() {
		if (isRecordingDescription) {
			if (recognitionRef.current) recognitionRef.current.stop();
			setIsRecordingDescription(false);
			return;
		}
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			alert("Speech recognition is not supported in this browser. Please type your description manually.");
			return;
		}
		try {
			const recognition = new SpeechRecognition();
			recognition.continuous = false;
			recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
			recognition.interimResults = false;
			recognition.onstart = () => {
				setIsRecordingDescription(true);
			};
			recognition.onresult = (event) => {
				const transcript = event.results[0][0].transcript;
				setDescription((prev) => {
					const next = prev ? prev + " " + transcript : transcript;
					updateListingField("description", next);
					updateListingField("bullets", next.split("\n").filter((l) => l.trim().length > 0));
					return next;
				});
			};
			recognition.onerror = (event) => {
				console.error("Speech recognition error:", event);
				setIsRecordingDescription(false);
			};
			recognition.onend = () => {
				setIsRecordingDescription(false);
			};
			recognition.start();
			recognitionRef.current = recognition;
		} catch (e) {
			console.error("Failed to start speech recognition:", e);
			setIsRecordingDescription(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-20 flex items-center justify-between border-b border-border/60 bg-background/90 px-4 py-3 backdrop-blur-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/listing",
						className: "grid h-10 w-10 place-items-center rounded-full border border-border bg-card",
						"aria-label": "Go back",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-widest text-primary",
						children: t("previewTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: imageSrc,
					alt: productName || "Product",
					className: "h-96 w-full object-cover object-top",
					width: 800,
					height: 800,
					loading: "lazy"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 pt-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1",
						children: "Product Name / SEO Title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: titleInputRef,
						type: "text",
						value: productName,
						onChange: (e) => {
							setProductName(e.target.value);
							updateListingField("title", e.target.value);
						},
						placeholder: "e.g. Pink Banarasi Silk Saree",
						className: "w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold focus:border-primary focus:outline-none"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1",
							children: "Price (₹)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground",
								children: "₹"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: price,
								onChange: (e) => {
									const val = Number(e.target.value) || 0;
									setPrice(val);
									updateListingField("price", val);
								},
								className: "w-full rounded-xl border border-border bg-card pl-7 pr-4 py-2.5 text-sm font-bold focus:border-primary focus:outline-none"
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 rounded-xl bg-[oklch(0.55_0.14_145)]/10 border border-[oklch(0.55_0.14_145)]/20 px-3 py-2.5 justify-center h-[42px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-[oklch(0.5_0.14_145)] text-[oklch(0.5_0.14_145)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-[oklch(0.5_0.14_145)]",
									children: "New Listing"
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pt-2 border-t border-border/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display font-bold text-foreground",
							children: "Product Attributes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setDetailsExpanded(!detailsExpanded),
							className: "text-xs font-semibold text-primary hover:underline flex items-center gap-0.5",
							children: detailsExpanded ? "Hide details" : "Show details"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						initial: false,
						children: detailsExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								height: 0,
								opacity: 0
							},
							animate: {
								height: "auto",
								opacity: 1
							},
							exit: {
								height: 0,
								opacity: 0
							},
							transition: { duration: .25 },
							className: "overflow-hidden space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1",
										children: "Material / Fabric"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: material,
										onChange: (e) => {
											setMaterial(e.target.value);
											updateListingField("material", e.target.value);
										},
										placeholder: "e.g. Pure Cotton",
										className: "w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1",
										children: "Colour / Pattern"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: colour,
										onChange: (e) => {
											setColour(e.target.value);
											updateListingField("colour", e.target.value);
										},
										placeholder: "e.g. Indigo Blue Floral",
										className: "w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1",
										children: "Occasion"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: occasion,
										onChange: (e) => {
											setOccasion(e.target.value);
											updateListingField("occasion", e.target.value);
										},
										placeholder: "e.g. Wedding / Festive",
										className: "w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
									})] }), isApparel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1",
										children: "Sleeve"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: sleeve,
										onChange: (e) => {
											setSleeve(e.target.value);
											updateListingField("sleeve", e.target.value);
										},
										placeholder: "e.g. Full Sleeve",
										className: "w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1",
									children: "Sizes Available"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2 mt-1",
									children: [
										"Free",
										"S",
										"M",
										"L",
										"XL",
										"XXL"
									].map((sz) => {
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => toggleSizeSelection(sz),
											className: cn("rounded-xl border px-4 py-2 text-xs font-semibold btn-lift transition-all", selectedSizes.includes(sz) ? "border-primary bg-primary/10 text-primary shadow-sm" : "border-border bg-card text-muted-foreground"),
											children: sz
										}, sz);
									})
								})] })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KantriMotifDivider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1",
						children: "Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: description,
							onChange: (e) => {
								setDescription(e.target.value);
								updateListingField("description", e.target.value);
								updateListingField("bullets", e.target.value.split("\n").filter((l) => l.trim().length > 0));
							},
							placeholder: "Tell buyers what makes it special...",
							rows: 5,
							className: "w-full rounded-xl border border-border bg-card pl-4 pr-12 py-3 text-sm leading-relaxed focus:border-primary focus:outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
							type: "button",
							whileTap: { scale: .9 },
							onClick: toggleDescriptionRecording,
							className: cn("absolute right-3 bottom-4 grid h-9 w-9 place-items-center rounded-full text-white shadow-md btn-lift", isRecordingDescription ? "bg-destructive ring-4 ring-destructive/30 animate-pulse" : "bg-primary hover:bg-primary-hover"),
							"aria-label": isRecordingDescription ? "Stop description recording" : "Record description speech",
							children: isRecordingDescription ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-white animate-ping" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-4 w-4" })
						})]
					})] }),
					currentListing?.deliveryRisks && currentListing.deliveryRisks.length > 0 ? (() => {
						const risks = currentListing.deliveryRisks;
						const highRiskCount = risks.filter((r) => r.risk_level.toLowerCase() === "high").length;
						const totalCount = risks.length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 rounded-2xl border border-border bg-card p-4 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-5 w-5 text-primary" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display font-semibold text-foreground",
									children: "Smart COD Rule"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground leading-relaxed",
									children: highRiskCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
										highRiskCount,
										" of your ",
										totalCount
									] }), " delivery zones are high-risk — here's our recommendation."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"All ",
										totalCount,
										" checked delivery zones are low/medium risk. Normal settings apply."
									] })
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between pt-3 border-t border-border/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-foreground",
										children: "Switch to prepaid above ₹700"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Automatically disables Cash on Delivery (COD) for higher-value orders."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setEnforcePrepaid(!enforcePrepaid),
									className: "text-primary hover:text-primary-hover focus:outline-none shrink-0",
									children: enforcePrepaid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRight, { className: "h-9 w-9 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleLeft, { className: "h-9 w-9 text-muted-foreground" })
								})]
							})]
						});
					})() : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-2 rounded-2xl border border-border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4 text-secondary" }),
							label: t("deliveryBy")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-[oklch(0.55_0.14_145)]" }),
							label: t("codBadge")
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 px-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "bg-gradient-to-br from-[oklch(0.97_0.03_140)] to-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
							value: riskScore,
							label: "Return Risk"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-widest text-[oklch(0.5_0.14_145)]",
									children: riskScore < 25 ? t("lowRisk") : riskScore < 50 ? "Medium risk" : "High risk"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display text-lg font-semibold",
									children: [
										"Your listing is ",
										readiness,
										"% ready"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: issues.length > 0 ? `${issues.length} gap${issues.length > 1 ? "s" : ""} to address before publishing.` : "Looking marketplace-ready!"
								})
							]
						})]
					}), issues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2",
						children: issues.map((issue, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
							initial: {
								opacity: 0,
								x: -8
							},
							animate: {
								opacity: 1,
								x: 0
							},
							className: "flex items-center justify-between gap-3 rounded-xl bg-card px-3 py-2.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: issue.explanation || issue.issue || "Listing gap"
								}), issue.contribution_pct != null && issue.contribution_pct > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1 text-xs text-muted-foreground",
									children: [
										"(+",
										issue.contribution_pct,
										"% risk)"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => handleFixIssue(i),
								className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary btn-lift",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-3 w-3" }), " Fix this"]
							})]
						}, `${issue.issue}-${i}`))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex gap-3 px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostButton, {
					onClick: handleEditClick,
					className: "flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" }),
						" ",
						t("editListing")
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
					onClick: () => setShowPushDrawer(true),
					className: "flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-5 w-5" }),
						" ",
						t("publishStore").replace("to Store", "")
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showPushDrawer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				onClick: () => setShowPushDrawer(false),
				className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { y: "100%" },
				animate: { y: 0 },
				exit: { y: "100%" },
				transition: {
					type: "spring",
					damping: 25,
					stiffness: 200
				},
				className: "fixed bottom-0 left-0 right-0 z-50 rounded-t-[32px] border-t border-border bg-card p-6 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] shadow-2xl md:max-w-[440px] md:mx-auto md:left-1/2 md:-translate-x-1/2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-6 h-1.5 w-12 rounded-full bg-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl font-bold text-foreground",
						children: "Distribute Listing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Select the channels where you want to push this listing."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-3",
						children: channels.map((channel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between rounded-2xl border border-border bg-background p-4 cursor-pointer hover:bg-accent/5 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-10 w-10 place-items-center rounded-xl bg-muted text-xl",
									children: channel.icon
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: channel.label
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative inline-flex items-center cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									className: "sr-only peer",
									checked: selectedChannels[channel.id],
									onChange: (e) => setSelectedChannels((prev) => ({
										...prev,
										[channel.id]: e.target.checked
									}))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" })]
							})]
						}, channel.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
							onClick: () => {
								if (currentListing) {
									const newListing = {
										id: `listing_${Date.now()}`,
										title: productName,
										price,
										category: currentListing.declared_category || "kurti",
										material,
										colour,
										sleeve,
										occasion,
										available_sizes: selectedSizes,
										description,
										uploadedImageUrl: imageSrc,
										risk_score: currentListing.risk_score || 0,
										issues_found: currentListing.issues_found || [],
										channels: Object.keys(selectedChannels).filter((k) => selectedChannels[k])
									};
									addPublishedListing(newListing);
									setPublishedListing(newListing);
									navigate({ to: "/publish-success" });
								}
							},
							className: "w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-5 w-5" }), " Push to Channels"]
						})
					})
				]
			})] }) })
		]
	});
}
function Row({ icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 text-sm",
		children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-foreground/80",
			children: label
		})]
	});
}
//#endregion
export { KantriMotifDivider, PreviewPage as component };
