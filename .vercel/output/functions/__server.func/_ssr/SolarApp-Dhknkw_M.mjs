import { i as __toESM } from "../_runtime.mjs";
import { L as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as cn, t as Button } from "./button-vq7PTfjo.mjs";
import { a as Pause, i as Play, r as RotateCcw } from "../_libs/lucide-react.mjs";
import { i as setInjectedKeys, n as attachKeys, r as isDown, t as ModeHeader } from "./ModeHeader-BDDUEZ7J.mjs";
import { C as RingGeometry, D as Vector3, E as SphereGeometry, S as PointsMaterial, T as Scene, _ as MeshStandardMaterial, a as CanvasTexture, b as PointLight, c as DynamicDrawUsage, d as IcosahedronGeometry, f as InstancedMesh, g as MeshBasicMaterial, h as Mesh, i as BufferGeometry, l as Group, m as LineBasicMaterial, n as BoxGeometry, o as ConeGeometry, p as Line, r as BufferAttribute, s as CylinderGeometry, t as WebGLRenderer, u as HemisphereLight, v as Object3D, w as SRGBColorSpace, x as Points, y as PerspectiveCamera } from "../_libs/three.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SolarApp-Dhknkw_M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PLANETS = [
	{
		name: "Sun",
		size: 1.12,
		a: 0,
		b: 0,
		incl: 0,
		orbit: 0,
		spin: .6,
		color: "#ff8c0d",
		drawOrbit: false
	},
	{
		name: "Mercury",
		size: .16,
		a: 2.4,
		b: 2.1,
		incl: 0,
		orbit: 1.246,
		spin: .01,
		color: "#b29e8c",
		drawOrbit: true
	},
	{
		name: "Venus",
		size: .24,
		a: 3.4,
		b: 3,
		incl: 0,
		orbit: .488,
		spin: .002,
		color: "#f2cc66",
		drawOrbit: true
	},
	{
		name: "Earth",
		size: .26,
		a: 4.6,
		b: 4.1,
		incl: 0,
		orbit: .3,
		spin: .6,
		color: "#2c8ed6",
		drawOrbit: true
	},
	{
		name: "Moon",
		size: .08,
		a: 0,
		b: 0,
		incl: 0,
		orbit: 2.2,
		spin: .3,
		color: "#b8b8b8",
		moonOf: "Earth",
		moonDist: .58,
		drawOrbit: false
	},
	{
		name: "Mars",
		size: .2,
		a: 6,
		b: 5.4,
		incl: 0,
		orbit: .16,
		spin: .585,
		color: "#d65a2e",
		drawOrbit: true
	},
	{
		name: "Jupiter",
		size: .58,
		a: 9.2,
		b: 8.6,
		incl: 0,
		orbit: .025,
		spin: 1.45,
		color: "#d99a55",
		drawOrbit: true
	},
	{
		name: "Saturn",
		size: .48,
		a: 11.8,
		b: 11,
		incl: 0,
		orbit: .01,
		spin: 1.35,
		color: "#ebcc80",
		ring: {
			inner: .7,
			outer: 1.15,
			color: "#e6c87a",
			tilt: 22
		},
		drawOrbit: true
	},
	{
		name: "Uranus",
		size: .36,
		a: 14,
		b: 13.2,
		incl: 0,
		orbit: .0036,
		spin: .84,
		color: "#66d9e6",
		ring: {
			inner: .52,
			outer: .72,
			color: "#59b8cc",
			tilt: 82
		},
		drawOrbit: true
	},
	{
		name: "Neptune",
		size: .34,
		a: 16,
		b: 15.2,
		incl: 0,
		orbit: .0018,
		spin: .89,
		color: "#2640f2",
		drawOrbit: true
	},
	{
		name: "Pluto",
		size: .12,
		a: 18.2,
		b: 16.5,
		incl: 17,
		orbit: .0012,
		spin: .094,
		color: "#d9c7b8",
		drawOrbit: true
	}
];
var LOCKABLE = PLANETS.map((p, i) => ({
	i,
	name: p.name
})).filter((p) => p.name !== "Sun" && p.name !== "Moon");
var TIME_SCALES = [
	.25,
	1,
	4,
	16
];
function nameFor(locked) {
	if (locked < 0) return "Free camera";
	return PLANETS[locked]?.name ?? "Free camera";
}
var useSolarStore = create((set) => ({
	paused: false,
	timeScale: 1,
	locked: -1,
	rocketSpin: false,
	focusName: "Free camera",
	setPaused: (v) => set({ paused: v }),
	togglePause: () => set((s) => ({ paused: !s.paused })),
	setTimeScale: (v) => set({ timeScale: v }),
	setLocked: (i) => set({
		locked: i,
		focusName: nameFor(i)
	}),
	setRocketSpin: (v) => set({ rocketSpin: v }),
	toggleRocketSpin: () => set((s) => ({ rocketSpin: !s.rocketSpin })),
	setFocusName: (n) => set({ focusName: n }),
	resetView: () => set({
		locked: -1,
		focusName: "Free camera",
		paused: false,
		timeScale: 1
	})
}));
var DEG = Math.PI / 180;
var ASTEROID_COUNT = 220;
var STAR_COUNT = 1400;
var ORBIT_RATE = 14;
var SolarRuntime = class {
	renderer;
	scene;
	camera;
	canvas;
	bodies = [];
	bodyByName = /* @__PURE__ */ new Map();
	asteroids = null;
	asteroidMeta = [];
	rocket = new Group();
	rocketFlames = [];
	dummy = new Object3D();
	sunLight;
	target = new Vector3();
	camTarget = new Vector3();
	theta = -.15;
	phi = 1.12;
	radius = 48;
	dragging = false;
	lastX = 0;
	lastY = 0;
	prevKeys = /* @__PURE__ */ new Set();
	last = performance.now();
	beltAngle = 0;
	rocketAngle = 0;
	rocketPhase = 0;
	rocketSpinE = {
		x: 0,
		y: 0,
		z: 0
	};
	rocketPos = new Vector3(23, 0, 0);
	textures = [];
	geoms = [];
	mats = [];
	ro = new ResizeObserver(() => this.resize());
	unbind = [];
	constructor(canvas) {
		this.canvas = canvas;
		this.renderer = new WebGLRenderer({
			canvas,
			antialias: true,
			alpha: false
		});
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.setClearColor(131850, 1);
		this.renderer.outputColorSpace = SRGBColorSpace;
		this.renderer.toneMapping = 4;
		this.renderer.toneMappingExposure = 1.05;
		this.scene = new Scene();
		this.camera = new PerspectiveCamera(55, 1, .08, 240);
		this.camera.position.set(0, 22, 42);
		this.scene.add(new HemisphereLight(10135748, 460812, .22));
		this.sunLight = new PointLight(16770752, 55, 80, 1.35);
		this.sunLight.position.set(0, 0, 0);
		this.scene.add(this.sunLight);
		this.addStars();
		this.addBodies();
		this.addBelt();
		this.addRocket();
		this.resize();
		this.ro.observe(canvas);
		this.bindInput();
		this.renderer.setAnimationLoop(this.loop);
		this.wireControlsTest();
	}
	dispose() {
		this.renderer.setAnimationLoop(null);
		this.ro.disconnect();
		this.unbind.forEach((fn) => fn());
		this.geoms.forEach((g) => g.dispose());
		this.mats.forEach((m) => m.dispose());
		this.textures.forEach((t) => t.dispose());
		this.renderer.dispose();
		if (window.__controlsTest) delete window.__controlsTest;
		setInjectedKeys(null);
	}
	track(g) {
		this.geoms.push(g);
		return g;
	}
	mat(m) {
		this.mats.push(m);
		return m;
	}
	loop = (time) => {
		const dt = Math.min((time - this.last) / 1e3, .1);
		this.last = time;
		const st = useSolarStore.getState();
		this.handleEdges(st);
		this.updateCameraInput(dt, st.locked < 0);
		if (!st.paused) this.simulate(dt, st.timeScale, st.rocketSpin, time);
		this.placeCamera(dt, st);
		this.renderer.render(this.scene, this.camera);
	};
	handleEdges(st) {
		const just = (code) => isDown(code) && !this.prevKeys.has(code);
		if (just("Space")) st.togglePause();
		if (just("KeyT")) st.toggleRocketSpin();
		if (just("KeyR") || just("Digit0")) {
			st.setLocked(-1);
			this.theta = -.15;
			this.phi = 1.12;
			this.radius = 48;
		}
		for (let n = 1; n <= 9; n++) if (just(`Digit${n}`)) {
			const names = [
				"Mercury",
				"Venus",
				"Earth",
				"Mars",
				"Jupiter",
				"Saturn",
				"Uranus",
				"Neptune",
				"Pluto"
			];
			const idx = PLANETS.findIndex((p) => p.name === names[n - 1]);
			if (idx >= 0) st.setLocked(idx);
		}
		this.prevKeys = new Set([
			"Space",
			"KeyT",
			"KeyR",
			"Digit0",
			"Digit1",
			"Digit2",
			"Digit3",
			"Digit4",
			"Digit5",
			"Digit6",
			"Digit7",
			"Digit8",
			"Digit9"
		].filter(isDown));
	}
	updateCameraInput(dt, free) {
		if (!free) return;
		if (isDown("KeyW") || isDown("ArrowUp")) this.radius = Math.max(3.2, this.radius - 18 * dt);
		if (isDown("KeyS") || isDown("ArrowDown")) this.radius = Math.min(90, this.radius + 18 * dt);
		if (isDown("KeyA") || isDown("ArrowLeft")) this.theta -= .9 * dt;
		if (isDown("KeyD") || isDown("ArrowRight")) this.theta += .9 * dt;
	}
	simulate(dt, scale, spinRocket, timeMs) {
		const t = dt * scale;
		const pulse = .5 + .4 * Math.sin(.5 * Math.PI * (timeMs / 1e3));
		const boost = .85 + .15 * pulse;
		this.sunLight.intensity = 50 * boost;
		for (const b of this.bodies) {
			b.angle += b.def.orbit * ORBIT_RATE * t;
			b.spin += b.def.spin * ORBIT_RATE * t;
			b.mesh.rotation.y = b.spin * DEG;
			this.placeBody(b);
			if (b.glow) {
				const mat = b.glow.material;
				mat.opacity = .22 * pulse;
			}
		}
		this.beltAngle += .1 * ORBIT_RATE * t;
		this.updateBelt();
		this.updateRocket(t, spinRocket);
	}
	placeBody(b) {
		if (b.def.moonOf) {
			const base = this.bodyByName.get(b.def.moonOf)?.world ?? this.target;
			const rad = b.def.moonDist ?? .5;
			const a = b.angle * DEG;
			b.world.set(base.x + rad * Math.cos(a), base.y, base.z + rad * Math.sin(a));
		} else if (b.def.a <= 0) b.world.set(0, 0, 0);
		else {
			const a = b.angle * DEG;
			const lx = b.def.a * Math.cos(a);
			const lz0 = b.def.b * Math.sin(a);
			const inc = b.def.incl * DEG;
			b.world.set(lx, lz0 * Math.sin(inc), lz0 * Math.cos(inc));
		}
		b.mesh.position.copy(b.world);
	}
	placeCamera(dt, st) {
		if (st.locked >= 0) {
			const b = this.bodies[st.locked];
			if (b) {
				this.camTarget.lerp(b.world, 1 - Math.exp(-6 * dt));
				const camDist = b.def.size * 8 + 2.4;
				this.camera.position.set(b.world.x, b.world.y + camDist * .45, b.world.z + camDist);
				this.camera.lookAt(this.camTarget);
				return;
			}
		}
		this.camTarget.lerp(this.target, 1 - Math.exp(-5 * dt));
		const sp = Math.sin(this.phi);
		this.camera.position.set(this.camTarget.x + this.radius * sp * Math.sin(this.theta), this.camTarget.y + this.radius * Math.cos(this.phi), this.camTarget.z + this.radius * sp * Math.cos(this.theta));
		this.camera.lookAt(this.camTarget);
	}
	addStars() {
		const pos = new Float32Array(STAR_COUNT * 3);
		for (let i = 0; i < STAR_COUNT; i++) {
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const dist = 70 + Math.random() * 70;
			pos[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
			pos[i * 3 + 1] = dist * Math.cos(phi);
			pos[i * 3 + 2] = dist * Math.sin(phi) * Math.sin(theta);
		}
		const geo = this.track(new BufferGeometry());
		geo.setAttribute("position", new BufferAttribute(pos, 3));
		const mat = this.mat(new PointsMaterial({
			color: 15527666,
			size: .18,
			sizeAttenuation: true
		}));
		this.scene.add(new Points(geo, mat));
	}
	addBodies() {
		for (const def of PLANETS) {
			const geo = this.track(new SphereGeometry(def.size, def.name === "Moon" ? 16 : 48, def.name === "Moon" ? 12 : 32));
			let mesh;
			if (def.name === "Sun") {
				const mat = this.mat(new MeshBasicMaterial({ color: def.color }));
				mesh = new Mesh(geo, mat);
				const glowGeo = this.track(new SphereGeometry(def.size * 1.85, 24, 16));
				const glowMat = this.mat(new MeshBasicMaterial({
					color: 16765562,
					transparent: true,
					opacity: .22,
					depthWrite: false,
					blending: 2
				}));
				const glow = new Mesh(glowGeo, glowMat);
				mesh.add(glow);
				const glow2Geo = this.track(new SphereGeometry(def.size * 2.6, 20, 14));
				const glow2 = new Mesh(glow2Geo, this.mat(new MeshBasicMaterial({
					color: 16751152,
					transparent: true,
					opacity: .1,
					depthWrite: false,
					blending: 2
				})));
				mesh.add(glow2);
				const body = {
					def,
					mesh,
					angle: 0,
					spin: 0,
					world: new Vector3(),
					glow
				};
				this.bodies.push(body);
				this.bodyByName.set(def.name, body);
				this.scene.add(mesh);
				continue;
			}
			const tex = this.planetTexture(def);
			const mat = this.mat(new MeshStandardMaterial({
				map: tex,
				color: 16777215,
				roughness: .82,
				metalness: .02
			}));
			mesh = new Mesh(geo, mat);
			if (def.ring) {
				const ringGeo = this.track(new RingGeometry(def.ring.inner, def.ring.outer, 96, 1));
				const pos = ringGeo.attributes.position;
				const uv = ringGeo.attributes.uv;
				for (let i = 0; i < pos.count; i++) {
					const x = pos.getX(i);
					const y = pos.getY(i);
					const u = (Math.hypot(x, y) - def.ring.inner) / (def.ring.outer - def.ring.inner);
					uv.setXY(i, u, .5);
				}
				uv.needsUpdate = true;
				const ringMat = this.mat(new MeshStandardMaterial({
					color: def.ring.color,
					side: 2,
					roughness: .55,
					metalness: .12,
					transparent: true,
					opacity: .88
				}));
				const ring = new Mesh(ringGeo, ringMat);
				ring.rotation.x = Math.PI / 2;
				ring.rotation.z = def.ring.tilt * DEG;
				mesh.add(ring);
			}
			const body = {
				def,
				mesh,
				angle: Math.random() * 40,
				spin: 0,
				world: new Vector3()
			};
			this.bodies.push(body);
			this.bodyByName.set(def.name, body);
			this.scene.add(mesh);
			if (def.drawOrbit) this.addOrbit(def);
		}
	}
	addOrbit(def) {
		const pts = [];
		const inc = def.incl * DEG;
		for (let i = 0; i <= 180; i++) {
			const t = i / 180 * Math.PI * 2;
			const lx = def.a * Math.cos(t);
			const lz0 = def.b * Math.sin(t);
			pts.push(new Vector3(lx, lz0 * Math.sin(inc), lz0 * Math.cos(inc)));
		}
		const geo = this.track(new BufferGeometry().setFromPoints(pts));
		const mat = this.mat(new LineBasicMaterial({
			color: 3817808,
			transparent: true,
			opacity: .55
		}));
		this.scene.add(new Line(geo, mat));
	}
	planetTexture(def) {
		const s = 256;
		const c = document.createElement("canvas");
		c.width = c.height = s;
		paintPlanet(c.getContext("2d"), s, def);
		const tex = new CanvasTexture(c);
		tex.colorSpace = SRGBColorSpace;
		tex.anisotropy = 4;
		this.textures.push(tex);
		return tex;
	}
	addBelt() {
		const geo = this.track(new IcosahedronGeometry(1, 0));
		const mat = this.mat(new MeshStandardMaterial({
			color: 9078400,
			roughness: .9,
			metalness: .05
		}));
		const mesh = new InstancedMesh(geo, mat, ASTEROID_COUNT);
		mesh.instanceMatrix.setUsage(DynamicDrawUsage);
		const rng = mulberry32(99);
		for (let i = 0; i < ASTEROID_COUNT; i++) this.asteroidMeta.push({
			a: rng() * 360,
			r: 7.4 + (rng() * 2 - 1) * .95,
			y: (rng() - .5) * .5,
			s: .025 + rng() * .05,
			spin: rng() * 360
		});
		this.asteroids = mesh;
		this.scene.add(mesh);
		this.updateBelt();
	}
	updateBelt() {
		if (!this.asteroids) return;
		for (let i = 0; i < this.asteroidMeta.length; i++) {
			const m = this.asteroidMeta[i];
			const ang = (this.beltAngle + m.a) * DEG;
			this.dummy.position.set(m.r * Math.cos(ang), m.y, m.r * Math.sin(ang));
			this.dummy.rotation.set((this.beltAngle + m.spin) * DEG, m.a * DEG, .3);
			this.dummy.scale.setScalar(m.s);
			this.dummy.updateMatrix();
			this.asteroids.setMatrixAt(i, this.dummy.matrix);
		}
		this.asteroids.instanceMatrix.needsUpdate = true;
	}
	addRocket() {
		const g = this.rocket;
		const bodyMat = this.mat(new MeshStandardMaterial({
			color: 667233,
			metalness: .55,
			roughness: .28
		}));
		const noseMat = this.mat(new MeshStandardMaterial({
			color: 15001322,
			metalness: .7,
			roughness: .18
		}));
		const finMat = this.mat(new MeshStandardMaterial({
			color: 10886418,
			metalness: .35,
			roughness: .4,
			side: 2
		}));
		const darkMat = this.mat(new MeshStandardMaterial({
			color: 2764340,
			metalness: .8,
			roughness: .25
		}));
		const body = new Mesh(this.track(new CylinderGeometry(.72, .72, 3, 28)), bodyMat);
		body.rotation.x = Math.PI / 2;
		body.position.z = .95;
		g.add(body);
		const nose = new Mesh(this.track(new ConeGeometry(.7, 1.55, 28)), noseMat);
		nose.rotation.x = Math.PI / 2;
		nose.position.z = 3.2;
		g.add(nose);
		const window = new Mesh(this.track(new SphereGeometry(.28, 16, 12)), this.mat(new MeshStandardMaterial({
			color: 1454666,
			metalness: .9,
			roughness: .12
		})));
		window.position.set(0, .15, 2.55);
		window.scale.set(1.4, .55, .35);
		g.add(window);
		for (const x of [-1.05, 1.05]) {
			const fin = new Mesh(this.track(new BoxGeometry(.7, .1, .9)), finMat);
			fin.position.set(x, -.12, .35);
			g.add(fin);
		}
		const topFin = new Mesh(this.track(new BoxGeometry(.1, .7, .85)), finMat);
		topFin.position.set(0, .72, .3);
		g.add(topFin);
		for (const x of [
			-.62,
			0,
			.62
		]) {
			const nozzle = new Group();
			const conv = new Mesh(this.track(new CylinderGeometry(.09, .2, .16, 16)), darkMat);
			conv.rotation.x = Math.PI / 2;
			const bell = new Mesh(this.track(new CylinderGeometry(.26, .09, .5, 16)), darkMat);
			bell.rotation.x = Math.PI / 2;
			bell.position.z = -.33;
			nozzle.add(conv, bell);
			nozzle.position.set(x, 0, -.85);
			g.add(nozzle);
			const flame = new Mesh(this.track(new ConeGeometry(.22, .9, 12)), this.mat(new MeshBasicMaterial({
				color: 16742944,
				transparent: true,
				opacity: .55,
				depthWrite: false,
				blending: 2
			})));
			flame.rotation.x = -Math.PI / 2;
			flame.position.set(x, 0, -1.55);
			g.add(flame);
			this.rocketFlames.push(flame);
		}
		g.scale.setScalar(.52);
		this.scene.add(g);
	}
	updateRocket(dt, spin) {
		this.rocketAngle += 8 * dt;
		this.rocketPhase += 1.9 * dt;
		const ar = this.rocketAngle * DEG;
		const pr = this.rocketPhase * DEG;
		const radius = 23 + 2 * Math.sin(pr);
		const height = 1.5 * Math.cos(pr);
		const next = new Vector3(radius * Math.cos(ar), height, radius * Math.sin(ar));
		const prev = this.rocketPos.clone();
		this.rocketPos.copy(next);
		this.rocket.position.copy(next);
		if (spin) {
			this.rocketSpinE.x += 12 * dt;
			this.rocketSpinE.y += 18 * dt;
			this.rocketSpinE.z += 8 * dt;
			this.rocket.rotation.set(this.rocketSpinE.x * DEG, this.rocketSpinE.y * DEG, this.rocketSpinE.z * DEG);
		} else {
			const look = next.clone().add(next.clone().sub(prev));
			if (look.distanceToSquared(next) > 1e-6) this.rocket.lookAt(look);
		}
		for (const f of this.rocketFlames) {
			const flick = .7 + Math.random() * .3;
			f.scale.setScalar(flick);
			const mat = f.material;
			mat.opacity = .35 * flick;
		}
	}
	bindInput() {
		const el = this.canvas;
		const down = (e) => {
			this.dragging = true;
			this.lastX = e.clientX;
			this.lastY = e.clientY;
			el.setPointerCapture(e.pointerId);
		};
		const move = (e) => {
			if (!this.dragging || useSolarStore.getState().locked >= 0) return;
			const dx = e.clientX - this.lastX;
			const dy = e.clientY - this.lastY;
			this.lastX = e.clientX;
			this.lastY = e.clientY;
			this.theta -= dx * .005;
			this.phi = Math.min(Math.PI - .12, Math.max(.12, this.phi - dy * .005));
		};
		const up = (e) => {
			this.dragging = false;
			if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
		};
		const wheel = (e) => {
			e.preventDefault();
			this.radius = Math.min(90, Math.max(3.2, this.radius + e.deltaY * .02));
		};
		el.addEventListener("pointerdown", down);
		el.addEventListener("pointermove", move);
		el.addEventListener("pointerup", up);
		el.addEventListener("pointercancel", up);
		el.addEventListener("wheel", wheel, { passive: false });
		this.unbind.push(() => {
			el.removeEventListener("pointerdown", down);
			el.removeEventListener("pointermove", move);
			el.removeEventListener("pointerup", up);
			el.removeEventListener("pointercancel", up);
			el.removeEventListener("wheel", wheel);
		});
	}
	resize() {
		const { clientWidth: w, clientHeight: h } = this.canvas;
		if (w === 0 || h === 0) return;
		this.renderer.setSize(w, h, false);
		this.camera.aspect = w / h;
		this.camera.updateProjectionMatrix();
	}
	wireControlsTest() {
		window.__controlsTest = {
			getYaw: () => this.theta,
			getSpeed: () => isDown("KeyW") || isDown("KeyS") ? 1 : .2,
			setKeys: (codes) => setInjectedKeys(codes)
		};
	}
};
function mulberry32(a) {
	return () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function paintPlanet(ctx, s, def) {
	const g = ctx.createLinearGradient(0, 0, 0, s);
	if (def.name === "Jupiter") {
		const bands = [
			"#c9894a",
			"#e8c089",
			"#b56a32",
			"#ead1a0",
			"#d08950",
			"#f0d8b0"
		];
		bands.forEach((c, i) => {
			g.addColorStop(i / (bands.length - 1), c);
		});
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, s, s);
		ctx.fillStyle = "rgba(180,80,50,0.35)";
		ctx.beginPath();
		ctx.ellipse(s * .62, s * .42, s * .12, s * .07, .2, 0, Math.PI * 2);
		ctx.fill();
		return;
	}
	if (def.name === "Earth") {
		ctx.fillStyle = "#1b4f9c";
		ctx.fillRect(0, 0, s, s);
		ctx.fillStyle = "#2f8a4a";
		blob(ctx, s * .3, s * .45, s * .18);
		blob(ctx, s * .7, s * .38, s * .14);
		blob(ctx, s * .55, s * .7, s * .1);
		ctx.fillStyle = "rgba(240,248,255,0.35)";
		blob(ctx, s * .4, s * .28, s * .16);
		blob(ctx, s * .75, s * .6, s * .12);
		return;
	}
	if (def.name === "Mars") {
		ctx.fillStyle = def.color;
		ctx.fillRect(0, 0, s, s);
		ctx.fillStyle = "rgba(80,30,16,0.35)";
		blob(ctx, s * .4, s * .4, s * .2);
		blob(ctx, s * .7, s * .62, s * .14);
		return;
	}
	ctx.fillStyle = def.color;
	ctx.fillRect(0, 0, s, s);
	ctx.fillStyle = "rgba(0,0,0,0.12)";
	for (let i = 0; i < 18; i++) blob(ctx, Math.random() * s, Math.random() * s, 8 + Math.random() * 22);
}
function blob(ctx, x, y, r) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.fill();
}
function SolarApp() {
	const canvasRef = (0, import_react.useRef)(null);
	const paused = useSolarStore((s) => s.paused);
	const timeScale = useSolarStore((s) => s.timeScale);
	const locked = useSolarStore((s) => s.locked);
	const focusName = useSolarStore((s) => s.focusName);
	const rocketSpin = useSolarStore((s) => s.rocketSpin);
	const togglePause = useSolarStore((s) => s.togglePause);
	const setTimeScale = useSolarStore((s) => s.setTimeScale);
	const setLocked = useSolarStore((s) => s.setLocked);
	const toggleRocketSpin = useSolarStore((s) => s.toggleRocketSpin);
	const resetView = useSolarStore((s) => s.resetView);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const unkeys = attachKeys();
		const runtime = new SolarRuntime(canvas);
		return () => {
			runtime.dispose();
			unkeys();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh w-full overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "absolute inset-0 h-full w-full touch-none",
				style: { touchAction: "none" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeHeader, {
				kicker: "Mode 02",
				title: "Observatory",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "icon",
					"aria-label": paused ? "Resume" : "Pause",
					onClick: togglePause,
					children: paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute top-20 right-3 left-3 z-10 flex items-start justify-between gap-3 sm:top-24 sm:right-5 sm:left-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-border bg-surface/80 px-3 py-2 backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.16em] text-muted uppercase",
						children: "Focus"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-base text-fg",
						children: focusName
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-auto flex gap-1 rounded-md border border-border bg-surface/80 p-1 backdrop-blur-sm",
					children: TIME_SCALES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTimeScale(s),
						className: cn("h-9 min-w-11 rounded-sm px-2 text-xs tabular-nums", timeScale === s ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
						children: [s, "×"]
					}, s))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-0 bottom-0 left-0 z-10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 overflow-x-auto pb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: locked < 0,
						onClick: () => {
							setLocked(-1);
						},
						children: "Free"
					}), LOCKABLE.map((p, n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						active: locked === p.i,
						onClick: () => {
							setLocked(p.i);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden text-subtle sm:inline",
							children: [n + 1, " "]
						}), p.name]
					}, p.name))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							size: "sm",
							onClick: toggleRocketSpin,
							children: ["Rocket spin ", rocketSpin ? "on" : "off"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => {
								resetView();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Reset"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden text-xs text-muted sm:block",
							children: "Drag to look · W/S zoom · A/D orbit · 1–9 lock a planet · Space pause"
						})
					]
				})]
			})
		]
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-10 shrink-0 rounded-md border px-3 text-sm", active ? "border-accent bg-accent text-accent-fg" : "border-border bg-surface/80 text-fg hover:border-accent/40"),
		children
	});
}
//#endregion
export { SolarApp };
