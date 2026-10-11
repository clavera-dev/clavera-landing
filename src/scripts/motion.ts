/**
 * Redesign H — the page's second client script (spec §5, §6).
 *
 * Two jobs, both progressive enhancement. Content is never edited or wrapped;
 * only classes and data attributes are added.
 *
 * 1. Header state. Once the hero photograph has passed under the fixed
 *    header, `html.header-solid` swaps the header's fading scrim for a solid
 *    band (Header.astro). This is legibility, not motion, so it runs under
 *    reduced motion too. Without JavaScript the gradient stays, as before.
 *
 * 2. One-shot reveals. Section headings, render figures, divider
 *    hairlines, the pillar cells and the step ticks get `data-reveal` and
 *    receive `.is-in` the first time they enter the viewport. Every hiding
 *    rule in src/styles/motion.css is gated on `html.motion-on`, which is
 *    only set here and never under prefers-reduced-motion, so no-JS, a failed
 *    script and reduced motion all show the complete static page.
 */
const root = document.documentElement;

/* 1. Header state -------------------------------------------------------- */

const header = document.querySelector<HTMLElement>('.site-header');
const heroPhoto = document.querySelector<HTMLElement>('.hero__media picture');

if (header && heroPhoto && 'IntersectionObserver' in window) {
	let observer: IntersectionObserver | undefined;
	const watch = () => {
		observer?.disconnect();
		// The header changes height at its breakpoints; the photograph counts
		// as "under the header" until its bottom edge passes the header's.
		const inset = Math.round(header.getBoundingClientRect().height);
		observer = new IntersectionObserver(
			([entry]) => root.classList.toggle('header-solid', !entry.isIntersecting),
			{ rootMargin: `-${inset}px 0px 0px 0px` },
		);
		observer.observe(heroPhoto);
	};
	watch();
	for (const query of ['(min-width: 700px)', '(min-width: 1200px)']) {
		window.matchMedia(query).addEventListener('change', watch);
	}
}

/* 2. One-shot reveals ---------------------------------------------------- */

const motionAllowed = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
const main = document.querySelector('main');

if (motionAllowed && main && 'IntersectionObserver' in window) {
	const targets: HTMLElement[] = [];
	const tag = (el: Element, kind: string, order = 0) => {
		const node = el as HTMLElement;
		if (node.closest('.hero') || node.dataset.reveal !== undefined) return;
		node.dataset.reveal = kind;
		if (order) node.style.setProperty('--reveal-order', String(order));
		targets.push(node);
	};

	// Headings only — not ledes, not lists, not FAQ items, not every paragraph.
	main.querySelectorAll('.section .heading-h2, .problem__statement, .founders__heading').forEach((el) =>
		tag(el, 'heading'),
	);
	main.querySelectorAll('.section .render-figure').forEach((el) => tag(el, 'curtain'));
	main.querySelectorAll('.section--divided').forEach((el) => tag(el, 'divider'));
	main.querySelectorAll('.index__row').forEach((el) => tag(el, 'tile'));
	main.querySelectorAll('.steps__item').forEach((el, i) => tag(el, 'tick', i));

	const reveal = (el: Element) => el.classList.add('is-in');
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				// Entering from above (scrolling back up after a jump): show it
				// as it is rather than open it from its far edge.
				if (entry.boundingClientRect.top < 0) entry.target.classList.add('reveal-instant');
				reveal(entry.target);
				observer.unobserve(entry.target);
			}
		},
		{ rootMargin: '0px 0px -8% 0px' },
	);

	// Anything already on screen is shown as it is, with no transition: the
	// first screen never animates in, only what is scrolled to.
	const inView = (el: Element) => {
		const rect = el.getBoundingClientRect();
		return rect.top < window.innerHeight && rect.bottom > 0;
	};
	for (const el of targets) if (inView(el)) reveal(el);
	root.classList.add('motion-on');
	for (const el of targets) if (!el.classList.contains('is-in')) observer.observe(el);

	// Safety net: nothing near or above the viewport may stay hidden, e.g.
	// after a jump to an anchor further down the page.
	window.setTimeout(() => {
		for (const el of targets) {
			if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < window.innerHeight * 1.25) {
				reveal(el);
			}
		}
	}, 3000);
}
