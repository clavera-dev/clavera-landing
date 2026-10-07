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
 * S7 (owner handoff v1.1 B3, 2026-09-23): the column header is
 * `Car garage (alternative)`, and the mandatory line under the table says
 * CLAVERA "is not a car garage or a car park". Both are verbatim handoff text
 * and are exempted from the Tier-1 scan only as exact strings (see
 * tests/terminology.ts). The handoff conflicts with its own §6.1 zero-match
 * list here; that conflict is recorded in PROJECT_DECISIONS.md. Written legal
 * approval for S7 is still outstanding. The render disclosure is the brief's
 * own approved English wording.
 */
export const en: Copy = {
	meta: {
		title: 'CLAVERA — Secure bike storage in Buenos Aires',
		description:
			'Membership-based secure storage for bikes and personal mobility in Buenos Aires. Assigned space, personal digital access and a record of every entry.',
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
		note: 'Join the pilot',
		cta: 'I’m interested in the pilot',
	},
	hero: {
		eyebrow: 'Secure storage · Buenos Aires',
		headingHtml: 'Your bike deserves a safe place in the city.',
		lede: 'CLAVERA is membership-based secure storage for bikes and personal mobility. Your assigned space, personal digital access and a record of every entry.',
		ctaSecondary: 'See how it works',
		facts: ['Assigned space', 'Controlled entry', 'Enclosed and dry'],
	},
	zoneSelector: {
		heading: 'Where do you need to store your bike?',
		caption: 'Near your home, your work or a station. Your answer builds our demand map.',
		placeholder: 'Choose your area',
		cta: 'Continue',
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
		plannedNote: 'This is how every CLAVERA hub is designed. These are planned properties of the future service: no location is in operation yet.',
		pillars: [
			{ n: '01', title: 'Assigned space', copy: 'In your name, independent and always free for you.' },
			{ n: '02', title: 'Personal digital access, 24/7', copy: 'With your personal QR or code you come and go at any time, every day, without depending on anyone.' },
			{ n: '03', title: 'Enclosed, dry and clean', copy: 'No rain, no damp from the pavement, no dust. The space is cleaned regularly.' },
			{ n: '04', title: 'Access log', copy: 'Every entry and exit is recorded in your name.' },
			{ n: '05', title: 'Take yours out without moving others', copy: 'Every space is independent: you take yours without touching your neighbour’s.' },
			{ n: '06', title: 'Inventory by frame number', copy: 'Make, model and frame number recorded on arrival.' },
			{ n: '07', title: 'Monthly membership', copy: 'No deposit, no annual contract, no agency fee.' },
		],
	},
	works: {
		index: '03',
		rail: 'How it works',
		eyebrow: 'How it works',
		heading: 'Three steps, and the bike stops being a problem.',
		steps: [
			{ n: '1', title: 'Register your interest', copy: 'Leave your details and tell us which neighbourhood you need it in.' },
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
		batteryNote:
			'E-bikes and e-scooters: if the battery is removable, you take it with you; if it is built in, the bike is stored in a separate area. Batteries are not charged inside the hub.',
		evaluatingNote:
			'We are evaluating individual lockers for helmets and gear, a self-service station with basic tools, and seasonal storage. Tell us in the survey if you are interested.',
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
			'Individual log of entries and exits',
			'Fixed storage structures, independent per space — no bikes leaning on each other',
			'Enclosed and dry: no rain, no damp from the pavement',
			'No battery charging; e-bikes with built-in batteries in a separate area',
		],
		plannedNote: 'Identification and access logging are planned properties of the service. No location is in operation yet.',
	},
	comparison: {
		index: '06',
		rail: 'Comparison',
		eyebrow: 'Why CLAVERA',
		heading: 'Neither the street, nor a space designed for cars.',
		tableCaption: 'Comparison of storage options',
		columns: ['Street / balcony', 'Car garage (alternative)', 'CLAVERA'],
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
					'Monthly rent, plus deposit and agency fee',
					'Monthly membership, no deposit, no agency fee',
				],
			},
			{ label: 'Commitment', values: ['—', 'Usually an annual contract', 'Month to month'] },
			{
				label: 'Designed for bikes',
				values: ['No', 'No', 'Yes: every space independent, take yours out without moving others'],
			},
			{ label: 'Weather', values: ['Rain, damp, rust', 'Variable', 'Enclosed, dry and clean'] },
		],
		scrollHint: 'Swipe to see the full table →',
		note: 'CLAVERA is not a car garage or a car park: it is a membership-based storage and safekeeping service for bicycles and personal mobility devices, with an assigned space.',
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
			'Your bike sleeps on the balcony, in the sun and the rain.',
			'Your bike is worth more than the lock protecting it.',
			'You ride every day and every trip out starts with the lift.',
			'You are a family with more bikes than balcony.',
			'Your building has no bike room, or the one it has is full.',
		],
	},
	zones: {
		index: '09',
		rail: 'Areas',
		eyebrow: 'Demand map',
		heading: 'Where do you need it?',
		disclaimer:
			'We have not chosen any locations yet: demand decides. Choosing an area implies no commitment to open, no date and no availability.',
	},
	founders: {
		index: '10',
		rail: 'Pilot',
		eyebrow: 'Pilot',
		heading: 'Join the pilot',
		lede: 'Tell us your area and how to reach you. We will let you know when there is news about the pilot near you.',
		note: 'This is a preliminary expression of interest: it reserves no space, creates no contract, and no payment is accepted.',
		surveyPrompt: 'Got 3 more minutes?',
		surveyCta: 'Take the survey',
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
				q: 'When can I get in?',
				a: 'Access is designed to work 24 hours a day, every day, with your personal code. This is a planned property of the service: no location is in operation yet.',
			},
			{
				q: 'How much does it cost?',
				a: 'We have not published the price yet. It will be published together with the full conditions before any sign-up. No payment is accepted.',
			},
			{
				q: 'What if I want to cancel?',
				a: 'Membership is month to month, with no minimum term. Full conditions, including cancellation, are published before any sign-up.',
			},
			{
				q: 'Do I need my bike to be insured?',
				a: 'No. We take insured and uninsured bikes. On arrival we record make, model and frame number.',
			},
			{
				q: 'Can I store my e-bike?',
				a: 'Yes. E-bikes and e-scooters: if the battery is removable, you take it with you; if it is built in, the bike is stored in a separate area. Batteries are not charged inside the hub.',
			},
			{ q: 'Do you do repairs?', a: 'No. CLAVERA is not a workshop: it is storage infrastructure.' },
			{ q: 'Do you take cars or motorbikes?', a: 'No. CLAVERA is exclusively for bikes and personal micromobility.' },
			{
				q: 'Where will CLAVERA be?',
				a: 'Not decided yet: demand decides. Choose your area above and take the survey: the search for a space starts where interest is concentrated.',
			},
			{
				q: 'How do I take the bike out?',
				a: 'Every space is independent. You take yours out without moving any other bike.',
			},
		],
	},
	pilot: {
		cta: 'Notify me',
	},
	survey: {
		eyebrow: 'Help us design CLAVERA',
		heading: 'How do you use your bike in Buenos Aires?',
		note: 'Three minutes. It helps us understand where it is needed and how to design the space.',
		cta: 'Take the survey · 3 min',
		languageNotice: 'The survey is in Spanish.',
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
		pendingNote: 'In preparation.',
		whatsappPending: 'WhatsApp Business — coming soon.',
		phonePending: 'Phone — coming soon.',
	},
	legalPage: {
		backToHome: 'Back to home',
		lastUpdatedLabel: 'Last updated',
		lastUpdatedPending: 'Publication pending',
		versionLabel: 'Version',
		courtesyNotice:
			'This is a courtesy translation. The Spanish (es-AR) version is the only one with legal validity.',
		readInSpanish: 'Read it in Spanish',
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
				alt: 'Entrance to a CLAVERA hub, with an access door and a digital access panel.',
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
