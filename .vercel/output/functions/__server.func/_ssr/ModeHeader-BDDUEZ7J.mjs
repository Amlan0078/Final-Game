import { L as require_jsx_runtime, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as cn } from "./button-vq7PTfjo.mjs";
import { s as ChevronLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ModeHeader-BDDUEZ7J.js
var import_jsx_runtime = require_jsx_runtime();
var GAME_CODES = /* @__PURE__ */ new Set([
	"KeyW",
	"KeyA",
	"KeyS",
	"KeyD",
	"KeyC",
	"KeyI",
	"KeyJ",
	"KeyK",
	"KeyL",
	"KeyM",
	"KeyT",
	"KeyR",
	"KeyQ",
	"Space",
	"Escape",
	"Digit0",
	"Digit1",
	"Digit2",
	"Digit3",
	"Digit4",
	"Digit5",
	"Digit6",
	"Digit7",
	"Digit8",
	"Digit9",
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"Enter"
]);
var held = /* @__PURE__ */ new Set();
var injected = null;
function onDown(e) {
	if (GAME_CODES.has(e.code)) e.preventDefault();
	if (e.repeat) return;
	held.add(e.code);
}
function onUp(e) {
	held.delete(e.code);
}
function onBlur() {
	held.clear();
}
function attachKeys() {
	window.addEventListener("keydown", onDown);
	window.addEventListener("keyup", onUp);
	window.addEventListener("blur", onBlur);
	document.addEventListener("visibilitychange", onBlur);
	return () => {
		window.removeEventListener("keydown", onDown);
		window.removeEventListener("keyup", onUp);
		window.removeEventListener("blur", onBlur);
		document.removeEventListener("visibilitychange", onBlur);
		held.clear();
		injected = null;
	};
}
function isDown(code) {
	if (injected) return injected.includes(code);
	return held.has(code);
}
function setInjectedKeys(codes) {
	injected = codes;
}
function ModeHeader({ kicker, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: cn("pointer-events-auto inline-flex h-11 items-center gap-1 rounded-md border border-border bg-surface/80 px-3 text-sm text-fg backdrop-blur-sm", "hover:border-accent/40"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: "size-4",
					strokeWidth: 1.75
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: "Orbital"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.18em] text-muted uppercase",
					children: kicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-lg text-fg sm:text-xl",
					children: title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-auto flex min-h-11 min-w-11 items-center justify-end gap-2",
				children
			})
		]
	});
}
//#endregion
export { setInjectedKeys as i, attachKeys as n, isDown as r, ModeHeader as t };
