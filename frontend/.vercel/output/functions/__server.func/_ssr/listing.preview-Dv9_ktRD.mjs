import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listing.preview-Dv9_ktRD.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./listing.preview-CIMns1eE.mjs");
var Route = createFileRoute("/listing/preview")({
	head: () => ({ meta: [{ title: "Listing Preview — शुरुआत AI" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
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
//#endregion
export { Route as n, KantriMotifDivider as t };
