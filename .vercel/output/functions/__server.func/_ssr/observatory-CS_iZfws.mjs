import { i as __toESM } from "../_runtime.mjs";
import { L as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/observatory-CS_iZfws.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ObservatoryPage() {
	const [App, setApp] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		import("./SolarApp-Dhknkw_M.mjs").then((m) => setApp(() => m.SolarApp));
	}, []);
	if (!App) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-dvh items-center justify-center bg-bg text-sm text-muted",
		children: "Opening observatory…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {});
}
//#endregion
export { ObservatoryPage as component };
