import type { Copy } from './types';

/**
 * English working translation.
 *
 * Meaning follows the Spanish canon in src/i18n/es.ts. Wording may be refined
 * editorially later; the claims may not change.
 *
 * Tier-1 vocabulary is forbidden in English exactly as in Spanish (brief
 * Appendix В.1): no `bike parking`, `parking`, `parking lot`, `garage`,
 * `car space`, `hourly rate`, `municipal bike rack`, `valet`. CLAVERA is
 * always "secure storage" / "storage hub".
 *
 * `Car garage` is the one Tier-2 term (Appendix В.2) and appears ONLY as the
 * S7 column header — the single location the appendix permits — and is still
 * pending the lawyer's written approval. The market-reference note is
 * deliberately neutral and carries no Tier-1 or Tier-2 term or root. Meta
 * strings and the render disclosure are the brief's own approved English
 * wording.
 */
export const en: Copy = {
	meta: {
		title: 'CLAVERA — Secure bike storage in Buenos Aires',
		description:
			'Membership-based secure storage for bikes and personal mobility in Buenos Aires. Assigned space, digital access, surveillance.',
		ogTitle: 'Your bike deserves a safe place in the city.',
	},
	a11y: {
		skipLink: 'Skip to main content',
		homeLabel: 'CLAVERA — home',
		languageNavLabel: 'Language',
		ownersNavLabel: 'For owners and developers',
		legalNavLabel: 'Legal',
	},
	header: {
		note: 'Founding members · 40 spaces',
		cta: 'Claim my space',
	},
	hero: {
		eyebrow: 'Secure storage · Buenos Aires',
		headingHtml: 'Your bike deserves a safe place in the city.',
		lede: 'CLAVERA is membership-based secure storage for bikes and personal mobility. Your assigned space, digital access and surveillance, minutes from home.',
		ctaPrimary: 'Claim my space',
		ctaSecondary: 'See how it works',
		facts: ['Assigned space', 'Controlled entry', 'Enclosed and dry'],
	},
	problem: {
		index: '01',
		rail: 'The city',
		eyebrow: 'The city changed',
		statementLead: 'The city filled up with bikes.',
		statementDim: 'The buildings never changed.',
		argument:
			'Buildings in Buenos Aires have no safe place for a bike, let alone an e-bike or a cargo bike. The street adds locks, rust and risk. The apartment adds lifts, hallways and lost space. Informal options are full, give you no receipt and take on no commitment.',
		loop: [
			{ label: 'Every trip out', copy: 'starts with the lift, the hallway and the door.' },
			{ label: 'Every trip back', copy: 'ends exactly the same way.' },
		],
		close: 'Stop carrying the bike into the lift. Stop leaving it on the street.',
	},
	solution: {
		index: '02',
		rail: 'The solution',
		eyebrow: 'Neighbourhood infrastructure',
		heading: 'The same space every time. Always ready for you.',
		lede: 'We turn a secure neighbourhood space into infrastructure designed from scratch for bikes and micromobility.',
		pillars: [
			{ n: '01', title: 'Assigned space', copy: 'In your name, independent and always free for you.' },
			{ n: '02', title: 'Personal digital access', copy: 'A personal QR or code. You come and go without depending on anyone.' },
			{ n: '03', title: 'Enclosed, dry and clean', copy: 'No rain, no damp from the pavement, no dust. Serviced on a schedule.' },
			{ n: '04', title: 'Surveillance and logging', copy: 'Cameras and an individual record of every entry and exit.' },
			{ n: '05', title: 'Take yours out without moving others', copy: 'Every space is independent: you take yours without touching your neighbour’s.' },
			{ n: '06', title: 'Inventory by frame number', copy: 'Make, model and frame number recorded on arrival.' },
			{ n: '07', title: 'Monthly membership', copy: 'No deposit, no annual contract, no agency fee.' },
			{ n: '08', title: 'Cleaning bay', copy: 'A self-service space set up to clean your bike inside the hub.' },
		],
	},
	works: {
		index: '03',
		rail: 'How it works',
		eyebrow: 'How it works',
		heading: 'Three steps, and the bike stops being a problem.',
		steps: [
			{ n: '1', title: 'Reserve your space', copy: 'Leave your details and tell us which neighbourhood you need it in.' },
			{ n: '2', title: 'Activate your access', copy: 'We record make, model and frame number. You receive your personal access.' },
			{ n: '3', title: 'Use it every day', copy: 'You arrive, leave the bike in your space and carry on.' },
		],
	},
	vehicles: {
		index: '04',
		rail: 'What fits',
		eyebrow: 'Your mobility, properly looked after',
		heading: 'Designed for what you actually ride.',
		items: ['City bike', 'Road and MTB', 'E-bike', 'Cargo bike', 'Folding bike', 'Electric scooter'],
		note: 'Optional individual lockers for helmet and gear. For safety, batteries are not charged inside the hub.',
	},
	security: {
		index: '05',
		rail: 'Security',
		eyebrow: 'Security and access',
		heading: 'Nobody wanders in.',
		lede: 'Every member is identified. Every entry is logged. Every bike is tied to its make, model and frame number.',
		items: [
			'Individual ID check when you join',
			'Personal digital access, non-transferable',
			'Cameras and a log of entries and exits',
			'Professional storage structures, fixed and independent per space — no bikes leaning on each other',
			'No battery charging inside the hub',
		],
	},
	comparison: {
		index: '06',
		rail: 'Comparison',
		eyebrow: 'Why CLAVERA',
		heading: 'Neither the street, nor a space designed for cars.',
		tableCaption: 'Comparison of storage options',
		columns: ['Street / balcony', 'Car garage', 'CLAVERA'],
		rowHeader: 'Criterion',
		rows: [
			{
				label: 'Security',
				values: [
					'A lock and good luck',
					'Partial: shared space, nothing of your own',
					'Assigned space + controlled entry + logging',
				],
			},
			{
				label: 'Monthly cost',
				values: [
					'“Free”, until the first theft',
					'80,000 – 150,000 ARS, plus deposit and agency fee',
					'Monthly membership, no deposit, no agency fee',
				],
			},
			{ label: 'Commitment', values: ['—', 'Annual contract', 'Month to month'] },
			{
				label: 'Designed for bikes',
				values: ['No', 'No', 'Yes: every space independent, take yours out without moving others'],
			},
			{ label: 'Weather', values: ['Rain, damp, rust', 'Variable', 'Enclosed, dry and clean'] },
		],
		scrollHint: 'Swipe to see the full table →',
		note: 'Market reference values for the automobile-storage alternative in CABA, August 2026.',
	},
	hub: {
		index: '07',
		rail: 'The space',
		eyebrow: 'The space',
		heading: 'This is how a CLAVERA hub is designed.',
		lede: 'Every hub is planned to the same standard: independent spaces, clear circulation, materials that stand up to daily use.',
		legendTitle: 'Zoning diagram',
		legend: ['Entrance', 'Eight numbered spaces', 'Cargo area', 'Lockers', 'Plant room'],
	},
	cases: {
		index: '08',
		rail: 'Who it is for',
		eyebrow: 'Who it is for',
		heading: 'If any of these sound like you, CLAVERA is for you.',
		items: [
			'Your bike is worth more than the lock protecting it — and it sleeps on the balcony.',
			'You have an e-bike or a cargo bike that does not fit in the lift.',
			'You ride every day and every trip out starts with the lift.',
			'You are a family with more bikes than balcony.',
			'Your building has no bike room, or the one it has is full.',
		],
	},
	zones: {
		index: '09',
		rail: 'Areas',
		eyebrow: 'First hubs',
		heading: 'We are mapping demand before choosing the locations.',
		lede: 'We want to know where it is needed. These are the areas we are working in.',
		items: ['Palermo', 'Chacarita', 'Villa Crespo', 'Recoleta'],
		note: 'Each area moves at its own pace: in some we are looking for a full hub, in others a smaller space inside a building or an existing space. Leave your request and we will tell you what is available in yours.',
	},
	founders: {
		index: '10',
		rail: 'Founders',
		eyebrow: 'Founding Members',
		heading: 'The first 40 spaces start here.',
		figures: [
			{ value: '40', unit: 'spaces', note: 'Founding Member allocation' },
			{ value: '−20%', unit: '', note: 'Off the list price' },
			{ value: '24', unit: 'months', note: 'Discount guaranteed' },
		],
		offerStrong: '20% off the list price, guaranteed for 24 months.',
		offerRest: 'Founding Members choose their space before anyone else.',
		note: 'Leaving your details involves no payment. We send you the Founding Member price and availability in your area.',
		cta: 'See my Founding Member price',
		disclaimer:
			'The Founding Member price is defined as 20% below the list price in force, adjusted quarterly by IPC/ICL, guaranteed for 24 months from sign-up.',
	},
	faq: {
		index: '11',
		rail: 'Questions',
		eyebrow: 'Frequently asked questions',
		heading: 'What matters, without the small print.',
		items: [
			{
				q: 'What is CLAVERA?',
				a: 'CLAVERA is membership-based secure storage for bikes and personal mobility in Buenos Aires. Every member has an assigned space, personal digital access and a record of every entry. It is not a workshop and not a space for cars.',
			},
			{
				q: 'How much does it cost?',
				a: 'We show you the Founding Member price when you leave your details, along with availability in your area. No commitment and no payment. The Founding Member price is 20% below the list price, guaranteed for 24 months.',
			},
			{
				q: 'What if I want to cancel?',
				a: 'The membership is monthly. You give 30 days’ notice and it is cancelled with no penalty.',
			},
			{
				q: 'Do I need my bike to be insured?',
				a: 'No. We take insured and uninsured bikes. On arrival we record make, model and frame number.',
			},
			{ q: 'Can I charge my e-bike there?', a: 'No. For safety, batteries are not charged inside the hub.' },
			{ q: 'Do you do repairs?', a: 'No. CLAVERA is not a workshop: it is storage infrastructure.' },
			{ q: 'Do you take cars or motorbikes?', a: 'No. CLAVERA is exclusively for bikes and personal micromobility.' },
			{
				q: 'Where will the first hub be?',
				a: 'We are mapping demand before choosing the location. The priority areas are Chacarita, Villa Crespo, Palermo and Recoleta. The first hub opens where demand is most concentrated.',
			},
			{
				q: 'How do I take the bike out?',
				a: 'Every space is independent. You take yours out without moving any other bike.',
			},
		],
	},
	survey: {
		eyebrow: 'Help us design the first hub',
		heading: 'How do you use your bike in Buenos Aires?',
		note: 'Three minutes. It helps us choose where to open and how to design the space.',
		cta: 'Take the survey · 3 min',
	},
	footer: {
		claim: 'Urban storage infrastructure for your bike.',
		contactTitle: 'Contact',
		spacesTitle: 'Spaces',
		legalTitle: 'Legal',
		proposeSpace: 'Propose a space',
		forDevelopers: 'For developers',
		privacy: 'Privacy Policy',
		terms: 'Terms and Conditions',
		cookies: 'Cookies',
		rights: '© 2026 CLAVERA. All rights reserved.',
		location: 'Buenos Aires, Argentina',
		languageTitle: 'Language',
		translationNotice:
			'La versión en español (es-AR) es la única con validez legal. Las traducciones son de cortesía.',
	},
	media: {
		disclosure:
			'Project renderings. They do not depict an operating facility. Illustrative image generated digitally.',
		renders: {
			r1: {
				alt: 'General view of a CLAVERA hub: a row of bikes on numbered vertical racks, next to a wall of lockers and a wooden bench.',
				caption: 'General view of the hub',
			},
			r2: {
				alt: 'Bikes on individual numbered vertical racks, each anchored to the wall of a CLAVERA hub.',
				caption: 'Individual vertical racks',
			},
			r3: {
				alt: 'Self-service bike cleaning bay in a CLAVERA hub, with a hose, cleaning products and a floor drain.',
				caption: 'Self-service cleaning bay',
			},
			entrance: {
				alt: 'Entrance to a CLAVERA hub, with an access door, a digital access panel and a security camera.',
				caption: 'Controlled entrance',
			},
			r4: {
				alt: 'Individual lockers in a CLAVERA hub, with one open showing room for a child bike seat.',
				caption: 'Lockers and room for a child bike seat',
			},
			r5: {
				alt: 'Area for cargo bikes and large e-bikes, with marked floor-level spaces in a CLAVERA hub.',
				caption: 'Cargo and e-bike area',
			},
			r6: {
				alt: 'Isometric zoning diagram of a CLAVERA hub: entrance, eight numbered storage spaces, cargo area, lockers and plant room.',
				caption: 'Zoning diagram',
			},
		},
	},
};
