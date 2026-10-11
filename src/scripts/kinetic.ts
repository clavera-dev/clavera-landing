/**
 * Variant E — kinetic layer (experiment, branch claude/visual-e-kinetic).
 *
 * GSAP (core, ScrollTrigger, SplitText — all free since GSAP 3.13) plus
 * Lenis smooth scroll on fine-pointer screens. Everything here is additive:
 * the page is complete and fully visible without this module, and the whole
 * module is a no-op under prefers-reduced-motion.
 *
 * Nothing here reads, stores or forwards visitor input. It only animates
 * elements that are already on the page.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function bail(): void {
	root.classList.remove('e-js');
}

if (reduced || !root.classList.contains('e-js')) {
	bail();
} else {
	try {
		run();
	} catch (error) {
		bail();
		console.warn('kinetic layer disabled', error);
	}
}

function run(): void {
	gsap.registerPlugin(ScrollTrigger, SplitText);
	const ease = 'power3.out';
	const show = (targets: gsap.TweenTarget): void => {
		gsap.set(targets, { visibility: 'inherit' });
	};

	// Smooth scroll, desktop only: on touch the native scroll is already right.
	if (window.matchMedia('(min-width: 900px) and (pointer: fine)').matches) {
		const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time) => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);
		// In-page anchors keep working through Lenis.
		document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((a) => {
			a.addEventListener('click', (event) => {
				const hash = a.hash;
				if (!hash || a.pathname !== location.pathname) return;
				const target = document.querySelector<HTMLElement>(hash);
				if (!target) return;
				event.preventDefault();
				lenis.scrollTo(target, { offset: -8 });
				history.pushState(null, '', hash);
			});
		});
	}

	const led = document.querySelector<HTMLElement>('.e-led');
	// Engines without CSS scroll() timelines get the same rail from GSAP,
	// through the custom property the stylesheet reads.
	if (led && !CSS.supports('animation-timeline: scroll()')) {
		ScrollTrigger.create({
			start: 0,
			end: 'max',
			onUpdate: (self) => led.style.setProperty('--e-progress', String(self.progress)),
		});
	}

	root.classList.add('e-ready');

	document.fonts.ready.then(() => {
		hero(ease, show);
		headings(ease, show);
		rows(ease, show);
		figures(ease, show);
		marquee();
		faq();
		ScrollTrigger.refresh();
	});
}

function hero(ease: string, show: (t: gsap.TweenTarget) => void): void {
	const section = document.querySelector<HTMLElement>('.hero');
	if (!section) return;
	const media = section.querySelector<HTMLElement>('.hero__media');
	const picture = section.querySelector<HTMLElement>('.hero__media picture');
	const heading = section.querySelector<HTMLElement>('.hero__heading');
	const inner = section.querySelector<HTMLElement>('.hero__inner');
	if (!media || !picture || !heading || !inner) return;

	const rest = Array.from(inner.children).filter((el) => el !== heading);
	const split = SplitText.create(heading, { type: 'lines', mask: 'lines', autoSplit: true, linesClass: 'e-line' });

	show([media, inner.children]);
	const tl = gsap.timeline({ defaults: { ease } });
	tl.fromTo(picture, { yPercent: 6, opacity: 0.3, filter: 'brightness(0.6)' }, { yPercent: 0, opacity: 1, filter: 'brightness(1)', duration: 1.6, ease: 'power2.out' }, 0)
		.from(split.lines, { yPercent: 110, duration: 1.1, stagger: 0.09 }, 0.25)
		.from(rest, { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.7);

	// Scroll: the picture drifts and darkens as the next sheet arrives.
	if (window.matchMedia('(min-width: 900px)').matches) {
		gsap.to(picture, {
			yPercent: 14,
			ease: 'none',
			scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
		});
		gsap.to(inner, {
			yPercent: -10,
			autoAlpha: 0.2,
			ease: 'none',
			scrollTrigger: { trigger: section, start: '40% top', end: 'bottom top', scrub: true },
		});
	}
}

function headings(ease: string, show: (t: gsap.TweenTarget) => void): void {
	const targets = document.querySelectorAll<HTMLElement>(
		'.section .heading-h2, .section .problem__statement, .section .founders__heading, .section .survey__heading',
	);
	targets.forEach((el) => {
		el.setAttribute('data-e-lines', '');
		const split = SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, linesClass: 'e-line' });
		show(el);
		gsap.from(split.lines, {
			yPercent: 110,
			duration: 1,
			ease,
			stagger: 0.08,
			scrollTrigger: { trigger: el, start: 'top 85%', once: true },
		});
	});
}

function rows(ease: string, show: (t: gsap.TweenTarget) => void): void {
	const groups: string[] = [
		'.index__row',
		'.steps__item',
		'.casos__item',
		'.security__list li',
		'.problem__loop-item',
		'.hub__legend-list li',
		'.comparison tbody tr',
		'.faq__item',
		'.vehicles__note > *',
		'.founders__action > *',
		'.section .eyebrow',
		'.section .lede',
	];
	const batch: HTMLElement[] = [];
	groups.forEach((selector) => {
		document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
			el.setAttribute('data-e-reveal', '');
			batch.push(el);
		});
	});
	show(batch);
	ScrollTrigger.batch(batch, {
		start: 'top 90%',
		once: true,
		onEnter: (elements) => {
			gsap.from(elements, { y: 28, autoAlpha: 0, duration: 0.9, ease, stagger: 0.07, overwrite: true });
		},
	});
}

function figures(ease: string, show: (t: gsap.TweenTarget) => void): void {
	document.querySelectorAll<HTMLElement>('.section .render-figure picture').forEach((picture) => {
		const img = picture.querySelector('img');
		show(picture);
		const tl = gsap.timeline({
			scrollTrigger: { trigger: picture, start: 'top 85%', once: true },
			defaults: { ease },
		});
		tl.fromTo(picture, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.2 }, 0);
		if (img) tl.fromTo(img, { scale: 1.1 }, { scale: 1, duration: 1.6 }, 0);
	});
}

/** Clones the vehicle list into a continuous display line. */
function marquee(): void {
	const list = document.querySelector<HTMLElement>('.vehicles__list');
	if (!list || !list.parentElement) return;
	const wrap = document.createElement('div');
	wrap.className = 'e-marquee bleed';
	const track = document.createElement('div');
	track.className = 'e-marquee__track';
	list.replaceWith(wrap);
	wrap.append(track);
	track.append(list);
	const clone = list.cloneNode(true) as HTMLElement;
	clone.setAttribute('aria-hidden', 'true');
	track.append(clone);
}

/** Opens FAQ answers with an animated height instead of a jump. */
function faq(): void {
	document.querySelectorAll<HTMLDetailsElement>('.faq__item').forEach((item) => {
		const summary = item.querySelector<HTMLElement>('summary');
		const answer = item.querySelector<HTMLElement>('.faq__a');
		if (!summary || !answer) return;
		summary.addEventListener('click', (event) => {
			if (item.open) return; // closing stays instant, as the DS says
			event.preventDefault();
			item.open = true;
			gsap.from(answer, { height: 0, autoAlpha: 0, duration: 0.45, ease: 'power3.out', clearProps: 'all' });
		});
	});
}
