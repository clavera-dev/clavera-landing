/**
 * Variant G: small progressive-enhancement layer for src/styles/variant-g.css.
 *
 * 1. Always: adds the "/ 11" total to each sheet stamp (decorative; the rail
 *    is aria-hidden).
 * 2. Only when motion is allowed: tags below-the-fold elements for one-shot
 *    reveals (IntersectionObserver), wraps the vehicle list in a clipping
 *    track for the scroll-linked line, and adds the LED progress rail.
 *
 * Content is never edited, only attributes and wrappers are added. Nothing
 * here reads, stores or forwards visitor input. No dependency.
 */
const root = document.documentElement;
const main = document.querySelector('main');

// 1. Stamp totals -----------------------------------------------------------
const rails = Array.from(document.querySelectorAll<HTMLElement>('.sheet__rail'));
const total = String(rails.length).padStart(2, '0');
rails.forEach((rail) => {
	const index = rail.querySelector('.sheet__index');
	if (!index || rail.querySelector('.g-stamp__total')) return;
	const span = document.createElement('span');
	span.className = 'g-stamp__total';
	span.textContent = `/ ${total}`;
	index.after(span);
});

// 2. Motion -----------------------------------------------------------------
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce && main && 'IntersectionObserver' in window) {
	const scrollTimelines = CSS.supports('animation-timeline: view()');

	// LED rail. Engines without scroll timelines get its fill from here.
	const led = document.createElement('div');
	led.className = 'g-led';
	led.setAttribute('aria-hidden', 'true');
	document.body.append(led);
	if (!scrollTimelines) {
		let queued = false;
		const update = () => {
			queued = false;
			const max = document.documentElement.scrollHeight - window.innerHeight;
			led.style.setProperty('--g-progress', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
		};
		window.addEventListener(
			'scroll',
			() => {
				if (queued) return;
				queued = true;
				requestAnimationFrame(update);
			},
			{ passive: true },
		);
		update();
	}

	// Vehicle line: a clipping, full-bleed track around the existing list.
	const list = main.querySelector<HTMLElement>('.vehicles__list');
	if (list && scrollTimelines && list.parentElement) {
		const track = document.createElement('div');
		track.className = 'g-track bleed';
		list.replaceWith(track);
		track.append(list);
	}

	// Reveals.
	const items: Element[] = [];
	const tag = (el: Element, i = 0) => {
		if (el.closest('.hero') || el.hasAttribute('data-g-reveal')) return;
		const node = el as HTMLElement;
		node.dataset.gReveal = '';
		node.style.setProperty('--g-i', String(Math.min(i, 6)));
		items.push(el);
	};

	const listSelector =
		'.index, .steps, .security__list, .hub__legend-list, .casos__list, .problem__loop';
	main
		.querySelectorAll(
			[
				'.section .eyebrow',
				'.section h2',
				'.section h3',
				'.section .lede',
				'.section > .sheet > p',
				'.problem__statement',
				'.founders__heading',
				'.survey__heading',
			].join(','),
		)
		.forEach((el) => {
			// Items inside a staggered list are tagged by their list below.
			if (!el.closest(listSelector)) tag(el);
		});
	main.querySelectorAll(listSelector).forEach((group) => {
		Array.from(group.children).forEach((child, i) => tag(child, i));
	});
	main.querySelectorAll('.faq__item').forEach((el, i) => tag(el, i % 4));
	main.querySelectorAll<HTMLElement>('.render-figure').forEach((fig) => {
		if (fig.closest('.hero')) return;
		fig.dataset.gImage = '';
		items.push(fig);
	});
	items.push(...Array.from(main.querySelectorAll('.section--divided')));

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('is-in');
				io.unobserve(entry.target);
			}
		},
		{ threshold: 0, rootMargin: '0px 0px -8% 0px' },
	);

	// Whatever is already on screen is shown at once: nothing flashes in at load.
	items.forEach((el) => {
		const r = el.getBoundingClientRect();
		if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
	});
	root.classList.add('g-motion');
	items.forEach((el) => {
		if (!el.classList.contains('is-in')) io.observe(el);
	});

	// Safety net: never leave content near the viewport hidden.
	window.setTimeout(() => {
		document.querySelectorAll('[data-g-reveal]:not(.is-in), [data-g-image]:not(.is-in)').forEach((el) => {
			if (el.getBoundingClientRect().top < window.innerHeight * 1.2) el.classList.add('is-in');
		});
	}, 4000);
}
