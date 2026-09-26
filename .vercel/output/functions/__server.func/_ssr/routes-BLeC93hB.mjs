import { L as require_jsx_runtime, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-vq7PTfjo.mjs";
import { c as ArrowRight, n as Swords, o as Orbit } from "../_libs/lucide-react.mjs";
import { t as StarBackdrop } from "./StarBackdrop-V7p73WWU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BLeC93hB.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-dvh overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarBackdrop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbits, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-dvh max-w-6xl flex-col px-5 py-8 sm:px-8 sm:py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.22em] text-muted uppercase",
							children: "Orbital"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: "Two modes · one sky"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col justify-center py-10 sm:py-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-medium tracking-[0.22em] text-muted uppercase",
								children: "A space lab"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display mt-3 max-w-2xl text-5xl leading-[1.05] tracking-tight sm:text-7xl",
								children: "Watch the planets. Or pick a fight in the dark."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg",
								children: "One project, two rooms. Duel is a local two-saucer arena. Observatory is a live solar system — elliptical orbits, a tilted Pluto, an asteroid belt, and a ship on a long roam."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
									to: "/duel",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, {
										className: "size-4",
										strokeWidth: 1.75
									}),
									kicker: "Mode 01",
									title: "Duel",
									copy: "Amber versus jade. Lasers until a life bar gives out. Two players on one keyboard, or a computer that hunts.",
									action: "Enter arena"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
									to: "/observatory",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbit, {
										className: "size-4",
										strokeWidth: 1.75
									}),
									kicker: "Mode 02",
									title: "Observatory",
									copy: "Lock the camera on any world. Pause time. Follow a rocket past Pluto. No shaders required — just the clockwork.",
									action: "Open observatory"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "flex flex-col gap-1 pb-[env(safe-area-inset-bottom)] text-xs text-subtle sm:flex-row sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Everything runs on this device. Nothing is signed in." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Duel · WASD / IJKL · Observatory · drag, 1–9, W/S" })]
					})
				]
			})
		]
	});
}
function ModeCard({ to, icon, kicker, title, copy, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col rounded-xl border border-border bg-surface/80 p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-8 items-center justify-center rounded-sm border border-border bg-surface-2",
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] tracking-[0.16em] uppercase",
					children: kicker
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-4 text-2xl sm:text-3xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 flex-1 text-sm leading-relaxed text-muted",
				children: copy
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6 w-full sm:w-auto",
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to,
					children: [action, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			})
		]
	});
}
function Orbits() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "pointer-events-none absolute -top-24 -right-24 size-[520px] sm:size-[640px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[8%] rounded-full border border-border/80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[22%] rounded-full border border-border/60" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[38%] rounded-full border border-border/50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orbit-spin absolute inset-[8%]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orbit-spin-rev absolute inset-[22%]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-0 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-p2" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-p1" })
		]
	});
}
//#endregion
export { Home as component };
