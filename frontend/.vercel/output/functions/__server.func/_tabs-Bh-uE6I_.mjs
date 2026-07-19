import { o as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useTranslation } from "./_ssr/language-context-Bii3c4ao.mjs";
import { s as sendAssistantMessage } from "./_ssr/client-Cvb2MelD.mjs";
import { i as useAppStore } from "./_ssr/appStore-DE__d2z0.mjs";
import { d as Outlet, g as useNavigate, h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as AnimatePresence, t as motion } from "./_libs/framer-motion.mjs";
import { A as Lock, C as Navigation, E as MessageCircle, N as House, P as HeartPulse, S as Package, T as MessageSquare, p as Sparkles, r as User, t as X, v as Send } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_tabs-Bh-uE6I_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BottomNav() {
	const { t } = useTranslation();
	const simulationUnlocked = useAppStore((s) => s.simulationUnlocked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[440px] -translate-x-1/2 rounded-[24px] border border-border bg-background/80 py-3 px-4 shadow-lg backdrop-blur-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-around items-center",
			children: [
				{
					to: "/home",
					label: t("home"),
					Icon: House
				},
				{
					to: "/listing",
					label: t("listing"),
					Icon: Package
				},
				{
					to: "/qa",
					label: t("qa"),
					Icon: MessageCircle,
					locked: !simulationUnlocked
				},
				{
					to: "/health",
					label: t("health"),
					Icon: HeartPulse,
					locked: !simulationUnlocked
				},
				{
					to: "/profile",
					label: t("profile"),
					Icon: User
				}
			].map(({ to, label, Icon, locked }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to,
				className: `flex flex-col items-center gap-1 transition-colors hover:text-foreground [&.active]:text-primary ${locked ? "opacity-50 text-muted-foreground/60" : "text-muted-foreground"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" }), locked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -top-1 -right-2 bg-background rounded-full p-[1px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-2.5 w-2.5 text-muted-foreground" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-medium",
					children: label
				})]
			}, to))
		})
	});
}
function ChatbotAssistant() {
	const { t, language } = useTranslation();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [inputVal, setInputVal] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const chatEndRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let initialGreeting = "Hello! I am your Shuruaat AI Assistant. How can I help you onboard or optimize your store today?";
		if (language === "hi") initialGreeting = "नमस्ते! मैं आपका शुरुआत AI सहायक हूँ। आज मैं आपकी दुकान को ऑनलाइन लाने या आपके ऑर्डर बढ़ाने में क्या मदद कर सकता हूँ?";
		else if (language === "ta") initialGreeting = "வணக்கம்! நான் உங்கள் ஷுருவாத் AI உதவியாளர். உங்கள் கடையை ஆன்லைனில் கொண்டு வர அல்லது விற்பனையை மேம்படுத்த இன்று நான் எவ்வாறு உதவ முடியும்?";
		else if (language === "bn") initialGreeting = "নমস্কার! আমি আপনার শুরুয়াত AI সহকারী। আপনার দোকান অনলাইনে আনতে বা বিক্রি বাড়াতে আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?";
		setMessages([{
			role: "assistant",
			content: initialGreeting
		}]);
	}, [language]);
	(0, import_react.useEffect)(() => {
		if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
	}, [messages, isOpen]);
	const handleSend = async (text) => {
		if (!text.trim() || loading) return;
		const userMsg = {
			role: "user",
			content: text
		};
		setMessages((prev) => [...prev, userMsg]);
		setInputVal("");
		setLoading(true);
		try {
			const response = await sendAssistantMessage(text, messages.map((m) => ({
				role: m.role,
				content: m.content
			})), language);
			setMessages((prev) => [...prev, {
				role: "assistant",
				content: response.reply
			}]);
		} catch (err) {
			console.error("Chatbot request failed:", err);
			setMessages((prev) => [...prev, {
				role: "assistant",
				content: "Sorry, I am having trouble connecting to the server. But you can check **[Listing Agent](/listing)** to list products, or **[Health Dashboard](/health)** to view return audits!"
			}]);
		} finally {
			setLoading(false);
		}
	};
	const renderMessageContent = (content) => {
		const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
		const parts = [];
		let lastIndex = 0;
		let match;
		while ((match = linkRegex.exec(content)) !== null) {
			const matchIndex = match.index;
			if (matchIndex > lastIndex) parts.push(content.substring(lastIndex, matchIndex));
			const label = match[1];
			const route = match[2];
			parts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					setIsOpen(false);
					navigate({ to: route });
				},
				className: "inline-flex items-center gap-1 font-bold text-primary underline hover:text-accent transition-colors cursor-pointer text-left",
				children: [
					label,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-3 w-3 inline" })
				]
			}, matchIndex));
			lastIndex = linkRegex.lastIndex;
		}
		if (lastIndex < content.length) parts.push(content.substring(lastIndex));
		return parts.length > 0 ? parts : content;
	};
	const suggestionChips = {
		en: [
			{
				label: "📦 How to list products?",
				query: "How do I list a product and write titles?"
			},
			{
				label: "📉 How to reduce returns?",
				query: "How can I reduce COD returns and RTO?"
			},
			{
				label: "❓ Where are buyer questions?",
				query: "Where do I see buyer questions and edit replies?"
			}
		],
		hi: [
			{
				label: "📦 प्रोडक्ट लिस्ट कैसे करें?",
				query: "मैं एक उत्पाद कैसे सूचीबद्ध करूं और शीर्षक लिखूं?"
			},
			{
				label: "📉 रिटर्न कैसे कम करें?",
				query: "मैं सीओडी रिटर्न और आरटीओ को कैसे कम कर सकता हूं?"
			},
			{
				label: "❓ क्रेता के सवाल कहां देखें?",
				query: "मैं क्रेता के सवाल कहां देख सकता हूं और उत्तर संपादित कर सकता हूं?"
			}
		],
		ta: [{
			label: "📦 தயாரிப்பை பட்டியலிடுவது எப்படி?",
			query: "ஒரு தயாரிப்பை எவ்வாறு பட்டியலிடுவது மற்றும் தலைப்புகளை எழுதுவது?"
		}, {
			label: "📉 ரிட்டர்ன்களைக் குறைப்பது எப்படி?",
			query: "COD ரிட்டர்ன்கள் மற்றும் RTO ஐ எவ்வாறு குறைப்பது?"
		}],
		bn: [{
			label: "📦 প্রোডাক্ট লিস্ট কীভাবে করব?",
			query: "আমি কীভাবে একটি পণ্য তালিকাভুক্ত করব এবং শিরোনাম লিখব?"
		}, {
			label: "📉 রিটার্ন কীভাবে কমাব?",
			query: "আমি কীভাবে সিওডি রিটার্ন এবং আরটিও কমাতে পারি?"
		}]
	}[language] || [{
		label: "📦 How to list products?",
		query: "How do I list a product?"
	}, {
		label: "📉 How to reduce returns?",
		query: "How can I reduce COD returns?"
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-x-0 bottom-0 mx-auto max-w-[480px] w-full h-0 pointer-events-none z-40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute right-5 bottom-[7.5rem] pointer-events-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
				type: "button",
				onClick: () => setIsOpen(!isOpen),
				whileHover: { scale: 1.08 },
				whileTap: { scale: .95 },
				className: "flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-accent shadow-lg shadow-primary/20 text-primary-foreground focus:outline-none btn-lift",
				children: isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-6 w-6" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 30,
				scale: .95
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				y: 30,
				scale: .95
			},
			transition: {
				type: "spring",
				bounce: .25,
				duration: .4
			},
			className: "absolute right-5 bottom-[11.5rem] pointer-events-auto flex h-[480px] w-[calc(100%-2.5rem)] max-w-[360px] flex-col rounded-3xl border border-border/80 bg-[#FFF8F2] shadow-2xl backdrop-blur-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border/60 bg-gradient-to-r from-primary/10 to-accent/5 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display text-sm font-bold text-foreground",
							children: "Shuruaat AI Sahayak"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-[oklch(0.5_0.14_145)] font-semibold uppercase tracking-wider",
							children: "Online Assistant"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setIsOpen(false),
						className: "rounded-lg p-1 text-muted-foreground hover:bg-black/5 hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto p-4 space-y-3",
					children: [
						messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `flex ${m.role === "user" ? "justify-end" : "justify-start"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-card text-foreground border border-border/60 rounded-tl-sm"}`,
								children: m.role === "user" ? m.content : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "whitespace-pre-wrap",
									children: renderMessageContent(m.content)
								})
							})
						}, i)),
						loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-[80%] rounded-2xl rounded-tl-sm bg-card border border-border/60 p-3 text-sm flex items-center gap-1 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-bounce rounded-full bg-primary/60" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:0.2s]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:0.4s]" })
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: chatEndRef })
					]
				}),
				messages.length === 1 && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 pb-2 flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-1",
						children: "Suggested questions:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5 max-h-24 overflow-y-auto",
						children: suggestionChips.map((chip, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleSend(chip.query),
							className: "rounded-full bg-card hover:bg-primary/10 border border-border/70 hover:border-primary/40 px-3 py-1 text-xs text-foreground/80 hover:text-primary transition-all text-left font-medium",
							children: chip.label
						}, idx))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border/60 bg-card p-3 rounded-b-3xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							handleSend(inputVal);
						},
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: inputVal,
							onChange: (e) => setInputVal(e.target.value),
							placeholder: "Ask a question...",
							className: "flex-1 rounded-full border border-border/80 bg-background px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none placeholder:text-muted-foreground/60"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !inputVal.trim() || loading,
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary hover:bg-primary/95 text-primary-foreground shadow-sm disabled:opacity-50 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
						})]
					})
				})
			]
		}) })]
	});
}
function TabsLayout() {
	const user = useAppStore((s) => s.user);
	const authLoading = useAppStore((s) => s.authLoading);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!authLoading && !user) navigate({ to: "/auth" });
	}, [
		user,
		authLoading,
		navigate
	]);
	if (authLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" })
	});
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatbotAssistant, {})
		]
	});
}
//#endregion
export { TabsLayout as component };
