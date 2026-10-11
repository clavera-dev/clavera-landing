/**
 * Variant F — tile behaviour (experiment, branch claude/visual-f-bento).
 *
 * Two small things, both answering the visitor: tiles settle in as they
 * scroll into view (motion.dev `inView`, 2.6 KB mini build), and the tile
 * border lights up around the pointer. Nothing here reads or stores input.
 * Under prefers-reduced-motion the module exits before touching the DOM.
 */
import { inView } from 'motion';

const root = document.documentElement;

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	root.classList.add('f-js');

	const tiles = document.querySelectorAll<HTMLElement>(
		'.index__row, .steps__item, .vehicles__item, .security__list li, .casos__item, .faq__item, .problem__loop-item',
	);

	// Stagger index within each parent list, so a grid settles left to right.
	const counters = new Map<Element, number>();
	tiles.forEach((tile) => {
		const parent = tile.parentElement ?? document.body;
		const i = counters.get(parent) ?? 0;
		counters.set(parent, i + 1);
		tile.style.setProperty('--f-i', String(i % 8));
		tile.setAttribute('data-f-tile', '');
	});

	tiles.forEach((tile) => {
		inView(
			tile,
			() => {
				tile.setAttribute('data-f-in', '');
			},
			{ margin: '0px 0px -10% 0px' },
		);
	});

	// Spotlight border follows the pointer; fine pointers only.
	if (window.matchMedia('(pointer: fine)').matches) {
		tiles.forEach((tile) => {
			tile.addEventListener('pointermove', (event) => {
				const rect = tile.getBoundingClientRect();
				tile.style.setProperty('--f-x', `${event.clientX - rect.left}px`);
				tile.style.setProperty('--f-y', `${event.clientY - rect.top}px`);
				tile.style.setProperty('--f-spot', '1');
			});
			tile.addEventListener('pointerleave', () => {
				tile.style.setProperty('--f-spot', '0');
			});
		});
	}
}
