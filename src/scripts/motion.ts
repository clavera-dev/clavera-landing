/**
 * Variant A motion: tags below-the-fold elements for a one-shot reveal.
 *
 * Progressive enhancement. Under prefers-reduced-motion, or when
 * IntersectionObserver is missing, this does nothing and the page stays
 * exactly as authored. Content is never edited — only attributes are added.
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce && 'IntersectionObserver' in window) {
	const root = document.documentElement;
	const main = document.querySelector('main');

	if (main) {
		const textTargets = main.querySelectorAll<HTMLElement>(
			[
				'.section .eyebrow',
				'.section h2',
				'.section h3',
				'.section .lede',
				'.section > .shell > p',
				'.problem__statement',
				'.founders__heading',
				'.survey__heading',
			].join(','),
		);
		const listSelector =
			'.index, .steps, .vehicles__list, .security__list, .hub__legend-list, .casos__list, .problem__loop';

		const tag = (el: Element, i = 0) => {
			if (el.closest('.hero') || el.hasAttribute('data-reveal')) return;
			(el as HTMLElement).dataset.reveal = '';
			(el as HTMLElement).style.setProperty('--i', String(Math.min(i, 6)));
		};

		const items: Element[] = [];
		textTargets.forEach((el) => {
			// Items inside a staggered list are tagged by their list below.
			if (el.closest(listSelector)) return;
			tag(el);
			items.push(el);
		});
		main.querySelectorAll(listSelector).forEach((list) => {
			Array.from(list.children).forEach((child, i) => {
				tag(child, i);
				items.push(child);
			});
		});
		main.querySelectorAll('.faq__item').forEach((el, i) => {
			tag(el, i % 4);
			items.push(el);
		});
		main.querySelectorAll('.render-figure').forEach((fig) => {
			if (fig.closest('.hero')) return;
			(fig as HTMLElement).dataset.revealImage = '';
			items.push(fig);
		});
		const dividers = Array.from(main.querySelectorAll('.section--divided'));
		items.push(...dividers);

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

		// Anything already on screen is shown without a transition: the first
		// screen never fades in half-visible, and nothing flashes in at load.
		items.forEach((el) => {
			const r = el.getBoundingClientRect();
			if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
		});
		root.classList.add('motion-on');
		items.forEach((el) => {
			if (!el.classList.contains('is-in')) io.observe(el);
		});

		// Safety net: never leave content hidden if something is not observed.
		window.setTimeout(() => {
			document.querySelectorAll('[data-reveal]:not(.is-in), [data-reveal-image]:not(.is-in)').forEach((el) => {
				const r = el.getBoundingClientRect();
				if (r.top < window.innerHeight * 1.2) el.classList.add('is-in');
			});
		}, 4000);
	}
}
