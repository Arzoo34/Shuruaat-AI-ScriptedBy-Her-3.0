import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { n as useTranslation, t as LanguageProvider } from "./language-context-Bii3c4ao.mjs";
import { n as checkBackendHealth } from "./client-Cvb2MelD.mjs";
import { i as useAppStore } from "./appStore-DE__d2z0.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route$10 } from "./listing.preview-Dv9_ktRD.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BAGp0kXu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppLayout({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `w-full min-h-dvh ${className}`,
		children
	});
}
var styles_default = "/assets/styles-MrfaJDkN.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function BackendStatusIndicator() {
	const backendStatus = useAppStore((s) => s.backendStatus);
	const setBackendStatus = useAppStore((s) => s.setBackendStatus);
	const setSelectedLanguage = useAppStore((s) => s.setSelectedLanguage);
	const { language } = useTranslation();
	const checked = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		setSelectedLanguage(language);
	}, [language, setSelectedLanguage]);
	(0, import_react.useEffect)(() => {
		if (checked.current) return;
		checked.current = true;
		setBackendStatus("checking");
		checkBackendHealth().then((res) => {
			setBackendStatus(res ? "online" : "offline");
		}).catch(() => {
			setBackendStatus("offline");
		});
	}, [setBackendStatus]);
	if (backendStatus === "checking" || backendStatus === "online") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed left-1/2 top-2 z-[60] -translate-x-1/2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-[11px] font-medium text-destructive shadow-sm",
		role: "status",
		children: "Backend offline — some features may not work"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "यह पेज नहीं मिला — This page doesn't exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground btn-lift",
					children: "Go home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold text-foreground",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Let's try that again."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground btn-lift",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold",
						children: "Home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#FFF8F2"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "MobileOptimized",
				content: "320"
			},
			{
				name: "HandheldFriendly",
				content: "true"
			},
			{ title: "शुरुआत AI — Your smartest business partner, in your language" },
			{
				name: "description",
				content: "Shuruaat AI helps first-time Indian sellers create listings, answer buyers and grow — in Hindi, Tamil, Bengali and more."
			},
			{
				property: "og:title",
				content: "शुरुआत AI — Your smartest business partner"
			},
			{
				property: "og:description",
				content: "India's AI copilot for first-time online sellers across Bharat."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Hind:wght@300;400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function AuthInitializer() {
	const initializeAuth = useAppStore((s) => s.initializeAuth);
	const { setLanguage, setBusinessName } = useTranslation();
	(0, import_react.useEffect)(() => {
		const cleanupPromise = initializeAuth(setLanguage, setBusinessName);
		return () => {
			cleanupPromise.then((cleanup) => {
				if (typeof cleanup === "function") cleanup();
			});
		};
	}, [
		initializeAuth,
		setLanguage,
		setBusinessName
	]);
	return null;
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LanguageProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthInitializer, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-dvh bg-background bg-block-print",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
				className: "relative mx-auto max-w-[480px] bg-background/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 top-0 bottom-0 w-[6px] indian-border-minimal-left z-50 pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-0 top-0 bottom-0 w-[6px] indian-border-minimal-right z-50 pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "indian-border-minimal-top w-full max-w-[480px] fixed top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "indian-border-minimal-bottom w-full max-w-[480px] fixed bottom-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackendStatusIndicator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				]
			})
		})] })
	});
}
var $$splitComponentImporter$8 = () => import("./routes-BX2Zn7YG.mjs");
var Route$8 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "शुरुआत AI — Get started in your language" }, {
		name: "description",
		content: "Choose your language, name your business, tell us what you sell. Shuruaat AI takes care of the rest."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_tabs-Bh-uE6I_.mjs");
var Route$7 = createFileRoute("/_tabs")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./auth-DT8Y8Zjj.mjs");
var Route$6 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Sign In / Register — शुरुआत AI" }, {
		name: "description",
		content: "Access your account or sign up to create AI listing and manage your store."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./publish-success-CwKG4plk.mjs");
var Route$5 = createFileRoute("/publish-success")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("../_tabs.health-DTSYWdtM.mjs");
var Route$4 = createFileRoute("/_tabs/health")({
	head: () => ({ meta: [{ title: "Health Agent — शुरुआत AI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_tabs.home-DtQXNYDh.mjs");
var Route$3 = createFileRoute("/_tabs/home")({
	head: () => ({ meta: [{ title: "Home — शुरुआत AI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_tabs.listing-8bR3Mt9s.mjs");
var Route$2 = createFileRoute("/_tabs/listing")({
	head: () => ({ meta: [{ title: "Listing Agent — शुरुआत AI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_tabs.profile-DLhYdKRl.mjs");
var Route$1 = createFileRoute("/_tabs/profile")({
	head: () => ({ meta: [{ title: "Profile — शुरुआत AI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_tabs.qa-DTKy5XQL.mjs");
var Route = createFileRoute("/_tabs/qa")({
	head: () => ({ meta: [{ title: "Q&A Agent — शुरुआत AI" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var TabsRoute = Route$7.update({
	id: "/_tabs",
	getParentRoute: () => Route$9
});
var AuthRoute = Route$6.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$9
});
var PublishSuccessRoute = Route$5.update({
	id: "/publish-success",
	path: "/publish-success",
	getParentRoute: () => Route$9
});
var TabsHealthRoute = Route$4.update({
	id: "/health",
	path: "/health",
	getParentRoute: () => TabsRoute
});
var TabsHomeRoute = Route$3.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => TabsRoute
});
var TabsListingRoute = Route$2.update({
	id: "/listing",
	path: "/listing",
	getParentRoute: () => TabsRoute
});
var TabsProfileRoute = Route$1.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => TabsRoute
});
var TabsQaRoute = Route.update({
	id: "/qa",
	path: "/qa",
	getParentRoute: () => TabsRoute
});
var ListingPreviewRoute = Route$10.update({
	id: "/listing/preview",
	path: "/listing/preview",
	getParentRoute: () => Route$9
});
var TabsRouteChildren = {
	TabsHealthRoute,
	TabsHomeRoute,
	TabsListingRoute,
	TabsProfileRoute,
	TabsQaRoute
};
var rootRouteChildren = {
	IndexRoute,
	TabsRoute: TabsRoute._addFileChildren(TabsRouteChildren),
	AuthRoute,
	PublishSuccessRoute,
	ListingPreviewRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
