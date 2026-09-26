import { i as __toESM } from "../_runtime.mjs";
import { L as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as cn, t as Button } from "./button-vq7PTfjo.mjs";
import { a as Pause, i as Play } from "../_libs/lucide-react.mjs";
import { i as setInjectedKeys, n as attachKeys, r as isDown, t as ModeHeader } from "./ModeHeader-BDDUEZ7J.mjs";
import { t as StarBackdrop } from "./StarBackdrop-V7p73WWU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ShooterApp-CxZ7vSZm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ctx = null;
function unlockAudio() {
	if (typeof window === "undefined") return;
	if (!ctx) ctx = new AudioContext();
	if (ctx.state === "suspended") ctx.resume();
}
function getCtx() {
	if (!ctx) ctx = new AudioContext();
	return ctx;
}
function tone(freq, dur, type, gain, at = 0) {
	const ac = getCtx();
	const t = ac.currentTime + at;
	const osc = ac.createOscillator();
	const g = ac.createGain();
	osc.type = type;
	osc.frequency.setValueAtTime(freq, t);
	g.gain.setValueAtTime(gain, t);
	g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
	osc.connect(g);
	g.connect(ac.destination);
	osc.start(t);
	osc.stop(t + dur + .02);
}
function sfxLaser() {
	try {
		const f = 620 + Math.random() * 80;
		tone(f, .09, "square", .04);
		tone(f * .5, .07, "sawtooth", .02);
	} catch {}
}
function sfxHit() {
	try {
		tone(180 + Math.random() * 40, .14, "triangle", .07);
		tone(90, .18, "sine", .05);
	} catch {}
}
function sfxWin() {
	try {
		tone(440, .16, "sine", .05, 0);
		tone(554, .18, "sine", .05, .12);
		tone(659, .28, "sine", .06, .24);
	} catch {}
}
var WORLD_W = 2400;
var WORLD_H = 1400;
var FIXED = 1 / 60;
var ShooterGame = class {
	p1;
	p2;
	stars = [];
	particles = [];
	screen = "menu";
	mode = "versus";
	paused = false;
	winner = 0;
	acc = 0;
	trauma = 0;
	time = 0;
	lastHit1 = -99;
	lastHit2 = -99;
	lastFireSfx1 = -99;
	lastFireSfx2 = -99;
	lightsPhase = 0;
	onHud;
	touch = {
		p1: {
			x: 0,
			y: 0,
			fire: false
		},
		p2: {
			x: 0,
			y: 0,
			fire: false
		}
	};
	lastHud = "";
	constructor() {
		this.p1 = this.freshShip(-520, 1);
		this.p2 = this.freshShip(520, -1);
		this.seedStars();
		this.publishHud(true);
	}
	freshShip(x, facing) {
		return {
			x,
			y: 0,
			facing,
			life: 100,
			firing: false,
			aim: 0,
			hitFlash: 0
		};
	}
	seedStars() {
		this.stars = [];
		for (let i = 0; i < 160; i++) this.stars.push({
			x: (Math.random() - .5) * WORLD_W * 1.1,
			y: (Math.random() - .5) * WORLD_H * 1.1,
			z: .4 + Math.random() * .9,
			tw: Math.random() * Math.PI * 2
		});
	}
	start(mode) {
		this.mode = mode;
		this.p1 = this.freshShip(-520, 1);
		this.p2 = this.freshShip(520, -1);
		this.particles = [];
		this.paused = false;
		this.winner = 0;
		this.trauma = 0;
		this.time = 0;
		this.lastHit1 = -99;
		this.lastHit2 = -99;
		this.screen = "play";
		this.publishHud(true);
	}
	setScreen(s) {
		this.screen = s;
		this.publishHud(true);
	}
	tick(dt) {
		this.acc += dt;
		while (this.acc >= FIXED) {
			this.step(FIXED);
			this.acc -= FIXED;
		}
		this.publishHud();
	}
	step(dt) {
		this.time += dt;
		this.lightsPhase += dt * 2.2;
		this.trauma = Math.max(0, this.trauma - dt * 2.4);
		this.p1.hitFlash = Math.max(0, this.p1.hitFlash - dt);
		this.p2.hitFlash = Math.max(0, this.p2.hitFlash - dt);
		for (let i = this.particles.length - 1; i >= 0; i--) {
			const p = this.particles[i];
			p.life -= dt;
			p.x += p.vx * dt;
			p.y += p.vy * dt;
			p.vx *= .98;
			p.vy *= .98;
			if (p.life <= 0) this.particles.splice(i, 1);
		}
		if (this.screen !== "play" || this.paused) return;
		this.driveP1(dt);
		if (this.mode === "ai") this.driveAi(dt);
		else this.driveP2(dt);
		this.clampShip(this.p1, -1);
		this.clampShip(this.p2, 1);
		if (this.p1.firing) this.tryHit(this.p1, this.p2, false);
		if (this.p2.firing) this.tryHit(this.p2, this.p1, true);
		if (this.p1.life <= 0 || this.p2.life <= 0) {
			this.winner = this.p1.life > 0 ? 1 : 2;
			this.screen = "over";
			this.burst(this.p1.life <= 0 ? this.p1 : this.p2, this.winner === 1 ? 76 : 226, 180, 80);
			this.trauma = Math.min(1, this.trauma + .7);
			sfxWin();
		}
	}
	driveP1(dt) {
		const up = isDown("KeyW") || this.touch.p1.y < -.35;
		const down = isDown("KeyS") || this.touch.p1.y > .35;
		const left = isDown("KeyA") || this.touch.p1.x < -.35;
		const right = isDown("KeyD") || this.touch.p1.x > .35;
		const fire = isDown("KeyC") || this.touch.p1.fire;
		this.moveShip(this.p1, dt, up, down, left, right, fire, true);
	}
	driveP2(dt) {
		const up = isDown("KeyI") || this.touch.p2.y < -.35;
		const down = isDown("KeyK") || this.touch.p2.y > .35;
		const left = isDown("KeyJ") || this.touch.p2.x < -.35;
		const right = isDown("KeyL") || this.touch.p2.x > .35;
		const fire = isDown("KeyM") || this.touch.p2.fire;
		this.moveShip(this.p2, dt, up, down, left, right, fire, false);
	}
	aiCooldown = 0;
	driveAi(dt) {
		this.aiCooldown -= dt;
		const dy = this.p1.y + Math.sin(this.time * .9) * 70 - this.p2.y;
		const up = dy > 18;
		const down = dy < -18;
		const weave = Math.sin(this.time * 1.4) > 0;
		const left = weave && this.p2.x > 280;
		const right = !weave && this.p2.x < 980;
		const aligned = Math.abs(this.p1.y - this.p2.y) < 90;
		const fire = aligned && this.aiCooldown <= .45;
		if (aligned && this.aiCooldown <= 0) this.aiCooldown = .7 + Math.random() * .5;
		this.moveShip(this.p2, dt, up, down, left, right, fire, false);
	}
	moveShip(s, dt, up, down, left, right, fire, isP1) {
		s.firing = fire;
		s.aim = 0;
		if (fire) {
			if (up) s.aim = 1;
			if (down) s.aim = -1;
			const last = isP1 ? this.lastFireSfx1 : this.lastFireSfx2;
			if (this.time - last > .16) {
				sfxLaser();
				if (isP1) this.lastFireSfx1 = this.time;
				else this.lastFireSfx2 = this.time;
			}
			return;
		}
		if (left) s.x -= 220 * dt;
		if (right) s.x += 220 * dt;
		if (up) s.y += 220 * dt;
		if (down) s.y -= 220 * dt;
	}
	clampShip(s, side) {
		const marginX = 80;
		if (side < 0) s.x = Math.min(-90, Math.max(-1120, s.x));
		else s.x = Math.max(90, Math.min(WORLD_W / 2 - marginX, s.x));
		s.y = Math.max(-610, Math.min(WORLD_H / 2 - 140, s.y));
	}
	tryHit(attacker, target, targetIsP1) {
		const x0 = attacker.x + attacker.facing * 70;
		const y0 = attacker.y;
		const x1 = attacker.facing > 0 ? WORLD_W / 2 : -1200;
		const y1 = attacker.aim === 1 ? WORLD_H / 2 : attacker.aim === -1 ? -700 : y0;
		const xp = target.x;
		const yp = target.y;
		if (!lineHitsCircle(x0, y0, x1, y1, xp, yp, 54)) return;
		const last = targetIsP1 ? this.lastHit1 : this.lastHit2;
		if (this.time - last < .22) return;
		if (targetIsP1) this.lastHit1 = this.time;
		else this.lastHit2 = this.time;
		target.life = Math.max(0, target.life - 5);
		target.hitFlash = .12;
		this.trauma = Math.min(1, this.trauma + .38);
		this.burst(target, attacker.facing > 0 ? 226 : 76, 180, 80);
		sfxHit();
	}
	burst(at, h, s, l) {
		const { r, g, b } = hslToRgb(h, s, l);
		for (let i = 0; i < 18; i++) {
			const a = Math.random() * Math.PI * 2;
			const sp = 80 + Math.random() * 280;
			this.particles.push({
				x: at.x,
				y: at.y,
				vx: Math.cos(a) * sp,
				vy: Math.sin(a) * sp,
				life: .35 + Math.random() * .4,
				max: .75,
				size: 2 + Math.random() * 4,
				r,
				g,
				b
			});
		}
	}
	publishHud(force = false) {
		const snap = {
			screen: this.screen,
			mode: this.mode,
			p1: this.p1.life,
			p2: this.p2.life,
			winner: this.winner,
			paused: this.paused
		};
		const key = JSON.stringify(snap);
		if (!force && key === this.lastHud) return;
		this.lastHud = key;
		this.onHud?.(snap);
	}
	wireControlsTest() {
		window.__controlsTest = {
			getYaw: () => 0,
			getSpeed: () => this.screen === "play" ? 1 : 0,
			getX: () => this.p1.x,
			getY: () => this.p1.y,
			setKeys: (codes) => setInjectedKeys(codes)
		};
	}
	clearControlsTest() {
		if (window.__controlsTest) delete window.__controlsTest;
		setInjectedKeys(null);
	}
};
function lineHitsCircle(x1, y1, x2, y2, cx, cy, r) {
	const dx = x2 - x1;
	const dy = y2 - y1;
	if (dx === 0 && dy === 0) return Math.hypot(cx - x1, cy - y1) <= r;
	const t = Math.max(0, Math.min(1, ((cx - x1) * dx + (cy - y1) * dy) / (dx * dx + dy * dy)));
	const px = x1 + t * dx;
	const py = y1 + t * dy;
	return (px - cx) * (px - cx) + (py - cy) * (py - cy) <= r * r;
}
function hslToRgb(h, s, l) {
	s /= 100;
	l /= 100;
	const k = (n) => (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
	return {
		r: f(0),
		g: f(8),
		b: f(4)
	};
}
var P1 = {
	hull: "#6b4318",
	team: "#e2b15a",
	glow: "rgba(226,177,90,0.55)"
};
var P2 = {
	hull: "#1d5a40",
	team: "#4cba80",
	glow: "rgba(76,186,128,0.55)"
};
function drawFrame(ctx, game, w, h) {
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.fillStyle = "#07080c";
	ctx.fillRect(0, 0, w, h);
	const scale = Math.min(w / WORLD_W, h / WORLD_H);
	const ox = (w - WORLD_W * scale) / 2;
	const oy = (h - WORLD_H * scale) / 2;
	const shake = game.trauma * game.trauma;
	const sx = (Math.random() * 2 - 1) * 14 * shake;
	const sy = (Math.random() * 2 - 1) * 10 * shake;
	ctx.setTransform(scale, 0, 0, -scale, ox + WORLD_W * scale / 2 + sx, oy + WORLD_H * scale / 2 + sy);
	drawBackdrop(ctx, game);
	if (game.screen === "play" || game.screen === "over") {
		if (game.p1.firing && game.p1.life > 0) drawLaser(ctx, game.p1, P1.team);
		if (game.p2.firing && game.p2.life > 0) drawLaser(ctx, game.p2, P2.team);
	}
	if (game.p1.life > 0) drawShip(ctx, game.p1, P1, game.lightsPhase, false);
	if (game.p2.life > 0) drawShip(ctx, game.p2, P2, game.lightsPhase, true);
	drawParticles(ctx, game.particles);
}
function drawBackdrop(ctx, game) {
	const g = ctx.createRadialGradient(0, 0, 40, 0, 0, 1100);
	g.addColorStop(0, "rgba(28, 36, 52, 0.35)");
	g.addColorStop(1, "rgba(7, 8, 12, 0)");
	ctx.fillStyle = g;
	ctx.fillRect(-WORLD_W / 2, -WORLD_H / 2, WORLD_W, WORLD_H);
	for (const s of game.stars) {
		ctx.fillStyle = `rgba(236,238,242,${(.35 + .65 * (.5 + .5 * Math.sin(game.time * 2 + s.tw))) * s.z})`;
		ctx.beginPath();
		ctx.arc(s.x, s.y, 1.1 * s.z, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.strokeStyle = "rgba(197,205,216,0.08)";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(0, -WORLD_H / 2 + 40);
	ctx.lineTo(0, WORLD_H / 2 - 40);
	ctx.stroke();
}
function drawLaser(ctx, ship, color) {
	const x0 = ship.x + ship.facing * 78;
	const y0 = ship.y;
	const x1 = ship.facing > 0 ? WORLD_W / 2 : -WORLD_W / 2;
	const y1 = ship.aim === 1 ? WORLD_H / 2 : ship.aim === -1 ? -WORLD_H / 2 : y0;
	ctx.save();
	ctx.strokeStyle = color;
	ctx.globalAlpha = .22;
	ctx.lineWidth = 16;
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(x0, y0);
	ctx.lineTo(x1, y1);
	ctx.stroke();
	ctx.globalAlpha = .9;
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.moveTo(x0, y0);
	ctx.lineTo(x1, y1);
	ctx.stroke();
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#fff8e8";
	ctx.beginPath();
	ctx.arc(x0, y0, 6, 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();
}
function drawShip(ctx, ship, pal, phase, flip) {
	ctx.save();
	ctx.translate(ship.x, ship.y);
	if (flip) ctx.scale(-1, 1);
	if (ship.hitFlash > 0) ctx.globalAlpha = .55 + ship.hitFlash * 3;
	ctx.fillStyle = pal.glow;
	ctx.beginPath();
	ctx.ellipse(0, -6, 92, 28, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#7ea0b4";
	ctx.beginPath();
	ctx.ellipse(0, 28, 38, 52, 0, Math.PI, Math.PI * 2, true);
	ctx.fill();
	ctx.strokeStyle = "rgba(8,9,12,0.55)";
	ctx.lineWidth = 2;
	ctx.stroke();
	drawPilot(ctx, pal.team);
	ctx.fillStyle = pal.hull;
	ctx.beginPath();
	ctx.ellipse(0, 0, 86, 24, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = pal.team;
	ctx.lineWidth = 2.4;
	ctx.stroke();
	ctx.fillStyle = "#1a1c22";
	ctx.beginPath();
	ctx.ellipse(-18, 10, 10, 6, 0, 0, Math.PI * 2);
	ctx.fill();
	for (let i = 0; i < 7; i++) {
		const lx = -48 + i * 16;
		const on = (Math.floor(phase * 3) + i) % 3;
		ctx.fillStyle = on === 0 ? pal.team : on === 1 ? "#9ec4d4" : "#d4a07a";
		ctx.beginPath();
		ctx.arc(lx, 0, 3.4, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.restore();
}
function drawPilot(ctx, team) {
	ctx.save();
	ctx.translate(6, 22);
	ctx.scale(1.15, 1.15);
	ctx.fillStyle = team;
	ctx.beginPath();
	ctx.moveTo(-10, 4);
	ctx.quadraticCurveTo(-16, -8, -4, -10);
	ctx.quadraticCurveTo(8, -12, 10, 2);
	ctx.quadraticCurveTo(2, 8, -10, 4);
	ctx.fill();
	ctx.fillStyle = "#2c3348";
	ctx.beginPath();
	ctx.ellipse(-1, 16, 11, 14, -.15, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#e7e0d2";
	ctx.beginPath();
	ctx.moveTo(-8, 14);
	ctx.quadraticCurveTo(-18, 12, -10, 20);
	ctx.quadraticCurveTo(-4, 18, -8, 14);
	ctx.fill();
	ctx.fillStyle = "#d7f0ff";
	ctx.beginPath();
	ctx.ellipse(-6, 22, 3.2, 4.6, -.2, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(2, 24, 2.8, 4.2, .05, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#0b0c10";
	ctx.beginPath();
	ctx.arc(-5.4, 22, 1.4, 0, Math.PI * 2);
	ctx.arc(2.4, 24, 1.2, 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();
}
function drawParticles(ctx, parts) {
	for (const p of parts) {
		const a = Math.max(0, p.life / p.max);
		ctx.fillStyle = `rgba(${Math.round(p.r * 255)},${Math.round(p.g * 255)},${Math.round(p.b * 255)},${a})`;
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.size * (.6 + a), 0, Math.PI * 2);
		ctx.fill();
	}
}
function ShooterApp() {
	const canvasRef = (0, import_react.useRef)(null);
	const gameRef = (0, import_react.useRef)(null);
	const [hud, setHud] = (0, import_react.useState)({
		screen: "menu",
		mode: "versus",
		p1: 100,
		p2: 100,
		winner: 0,
		paused: false
	});
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const game = new ShooterGame();
		gameRef.current = game;
		game.onHud = setHud;
		game.wireControlsTest();
		const unkeys = attachKeys();
		let raf = 0;
		let last = performance.now();
		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const r = canvas.getBoundingClientRect();
			canvas.width = Math.max(1, Math.floor(r.width * dpr));
			canvas.height = Math.max(1, Math.floor(r.height * dpr));
		};
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvas);
		const loop = (now) => {
			const dt = Math.min((now - last) / 1e3, .1);
			last = now;
			game.tick(dt);
			const ctx = canvas.getContext("2d");
			if (ctx) drawFrame(ctx, game, canvas.width, canvas.height);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			unkeys();
			game.clearControlsTest();
			gameRef.current = null;
		};
	}, []);
	const start = (mode) => {
		unlockAudio();
		gameRef.current?.start(mode);
	};
	const playing = hud.screen === "play";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh w-full overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarBackdrop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "absolute inset-0 h-full w-full touch-none",
				style: { touchAction: "none" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeHeader, {
				kicker: "Mode 01",
				title: "Duel",
				children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "icon",
					"aria-label": hud.paused ? "Resume" : "Pause",
					onClick: () => {
						const g = gameRef.current;
						if (!g) return;
						g.paused = !g.paused;
						setHud({
							...hud,
							paused: g.paused
						});
					},
					children: hud.paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hidden w-11 sm:block" })
			}),
			playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayHud, {
				hud,
				game: gameRef
			}) : null,
			hud.screen === "menu" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
				onStart: start,
				onHow: () => gameRef.current?.setScreen("howto")
			}) : null,
			hud.screen === "howto" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowTo, { onBack: () => gameRef.current?.setScreen("menu") }) : null,
			hud.screen === "over" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Over, {
				winner: hud.winner,
				onAgain: () => start(hud.mode),
				onMenu: () => gameRef.current?.setScreen("menu")
			}) : null
		]
	});
}
function PlayHud({ hud, game }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute top-20 right-0 left-0 z-10 flex items-start justify-between gap-4 px-4 sm:top-24 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Life, {
				label: "Player 1",
				value: hud.p1,
				tone: "p1",
				align: "left"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Life, {
				label: hud.mode === "ai" ? "Computer" : "Player 2",
				value: hud.p2,
				tone: "p2",
				align: "right"
			})]
		}),
		hud.paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 z-10 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg border border-border bg-surface/90 px-6 py-3 font-display text-2xl",
				children: "Paused"
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchPads, {
			game,
			versus: hud.mode === "versus"
		})
	] });
}
function Life({ label, value, tone, align }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("w-[42%] max-w-xs", align === "right" && "text-right"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1 flex items-baseline justify-between gap-2 text-[11px] tracking-[0.14em] text-muted uppercase",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: align === "right" ? "order-2" : "",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("tabular-nums text-fg", tone === "p1" ? "text-p1" : "text-p2"),
				children: value
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 overflow-hidden rounded-full bg-surface-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full rounded-full", tone === "p1" ? "bg-p1" : "bg-p2"),
				style: { width: `${value}%` }
			})
		})]
	});
}
function Menu({ onStart, onHow }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-center justify-center p-4 pt-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-xl border border-border bg-surface/92 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.2em] text-muted uppercase",
					children: "Local arena"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-2 text-3xl",
					children: "Two saucers. One screen."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: "Hold fire to lock your heading and stream a laser. A hit costs five life. First to empty the other wins."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							onClick: () => onStart("versus"),
							children: "Two players"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							variant: "secondary",
							onClick: () => onStart("ai"),
							children: "Versus computer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							variant: "ghost",
							onClick: onHow,
							children: "Controls"
						})
					]
				})
			]
		})
	});
}
function HowTo({ onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-center justify-center p-4 pt-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg rounded-xl border border-border bg-surface/92 p-6 backdrop-blur-sm sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Controls"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-6 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.16em] text-p1 uppercase",
						children: "Player 1 · amber"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 space-y-1.5 text-sm text-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "W A S D — move" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "C — fire" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Hold W / S while firing to aim" })
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.16em] text-p2 uppercase",
						children: "Player 2 · jade"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 space-y-1.5 text-sm text-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "I J K L — move" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "M — fire" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Hold I / K while firing to aim" })
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-sm text-muted",
					children: "You cannot move while the fire key is held. On a phone, use the pads."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6",
					variant: "secondary",
					onClick: onBack,
					children: "Back"
				})
			]
		})
	});
}
function Over({ winner, onAgain, onMenu }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-xl border border-border bg-surface/92 p-6 text-center backdrop-blur-sm sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.2em] text-muted uppercase",
					children: "Match over"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: cn("font-display mt-2 text-3xl", winner === 1 ? "text-p1" : "text-p2"),
					children: winner === 1 ? "Player 1 wins" : "Player 2 wins"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						onClick: onAgain,
						children: "Play again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						variant: "secondary",
						onClick: onMenu,
						children: "Menu"
					})]
				})
			]
		})
	});
}
function TouchPads({ game, versus }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute right-0 bottom-0 left-0 z-20 flex items-end justify-between gap-3 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
			label: "P1",
			onVec: (x, y) => {
				const g = game.current;
				if (g) {
					g.touch.p1.x = x;
					g.touch.p1.y = y;
				}
			},
			onFire: (v) => {
				const g = game.current;
				if (g) g.touch.p1.fire = v;
			}
		}), versus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
			label: "P2",
			onVec: (x, y) => {
				const g = game.current;
				if (g) {
					g.touch.p2.x = x;
					g.touch.p2.y = y;
				}
			},
			onFire: (v) => {
				const g = game.current;
				if (g) g.touch.p2.fire = v;
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})]
	});
}
function Pad({ label, onVec, onFire }) {
	const stick = (0, import_react.useRef)(null);
	const read = (e, release = false) => {
		const el = stick.current;
		if (!el || release) {
			onVec(0, 0);
			return;
		}
		const r = el.getBoundingClientRect();
		const x = (e.clientX - r.left) / r.width * 2 - 1;
		const y = (e.clientY - r.top) / r.height * 2 - 1;
		onVec(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: stick,
			className: "size-24 rounded-full border border-border bg-surface/70",
			onPointerDown: (e) => {
				e.target.setPointerCapture(e.pointerId);
				read(e);
			},
			onPointerMove: (e) => {
				if (e.buttons) read(e);
			},
			onPointerUp: (e) => read(e, true),
			onPointerCancel: (e) => read(e, true)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "h-16 w-16 rounded-full border border-border bg-accent text-xs font-medium text-accent-fg",
			onPointerDown: (e) => {
				e.target.setPointerCapture(e.pointerId);
				onFire(true);
			},
			onPointerUp: () => onFire(false),
			onPointerCancel: () => onFire(false),
			children: [label, " fire"]
		})]
	});
}
//#endregion
export { ShooterApp };
