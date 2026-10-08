import type { Copy } from './types';

/**
 * Canonical copy (es-AR, Rioplatense).
 *
 * This is the product-copy authority. English and Russian must preserve this
 * meaning; they may not soften a claim, drop a legal qualifier, or introduce a
 * fact that is not here.
 *
 * 2026-09-28: updated to the owner handoff v1.1 (CLAVERA_Dev_Handoff_Beta_v1_1,
 * 2026-09-23). Section references in comments below are to that handoff.
 */
export const es: Copy = {
	meta: {
		title: 'CLAVERA — Guarda segura de bicicletas en Buenos Aires',
		// B5. No 24/7 here: meta carries no planned-service qualifier.
		description:
			'Guardería segura de bicicletas y movilidad personal por membresía en Buenos Aires. Lugar asignado, acceso digital personal y registro de cada ingreso.',
		ogTitle: 'Tu bici merece un lugar seguro en la ciudad.',
	},
	a11y: {
		skipLink: 'Saltar al contenido principal',
		homeLabel: 'CLAVERA — inicio',
		languageNavLabel: 'Idioma',
		languageNavFooterLabel: 'Idioma, pie de página',
		ownersNavLabel: 'Para propietarios y desarrolladores',
		legalNavLabel: 'Legal',
	},
	header: {
		note: 'Sumate al piloto',
		cta: 'Me interesa el piloto',
	},
	hero: {
		eyebrow: 'Guarda segura · Buenos Aires',
		headingHtml: 'Tu bici merece un lugar seguro en la ciudad.',
		lede: 'CLAVERA es una guardería segura de bicicletas y movilidad personal por membresía. Tu lugar asignado, acceso digital personal y registro de cada ingreso.',
		ctaSecondary: 'Ver cómo funciona',
		facts: ['Lugar asignado', 'Ingreso controlado', 'Cerrado y seco'],
	},
	// §3.2
	zoneSelector: {
		heading: '¿Dónde necesitás guardar tu bici?',
		caption: 'Cerca de tu casa, tu trabajo o una estación. Con tu respuesta armamos el mapa de demanda.',
		placeholder: 'Elegí tu zona',
		cta: 'Seguir',
	},
	problem: {
		index: '01',
		rail: 'La ciudad',
		eyebrow: 'La ciudad cambió',
		statementLead: 'La ciudad se llenó de bicis.',
		statementDim: 'Los edificios no cambiaron.',
		argument:
			'En los edificios de Buenos Aires no hay lugar seguro para una bici, mucho menos para una e-bike o una cargo. La calle suma candados, óxido y riesgo. El departamento suma ascensores, pasillos y espacio perdido. Las opciones informales están llenas, no dan comprobante y no asumen ningún compromiso.',
		loop: [
			{ label: 'Cada salida', copy: 'empieza con el ascensor, el pasillo y la puerta.' },
			{ label: 'Cada regreso', copy: 'termina exactamente igual.' },
		],
		close: 'Dejá de subir la bici por el ascensor. Dejá de dejarla en la calle.',
	},
	solution: {
		index: '02',
		rail: 'La solución',
		eyebrow: 'Infraestructura de barrio',
		heading: 'Siempre el mismo lugar. Siempre listo para vos.',
		lede: 'Convertimos un espacio seguro del barrio en infraestructura pensada desde cero para bicicletas y micromovilidad.',
		plannedNote: 'Así se proyecta cada hub CLAVERA. Son propiedades previstas del servicio futuro: todavía no hay ninguna sede en operación.',
		pillars: [
			{ n: '01', title: 'Lugar asignado', copy: 'Con tu nombre, independiente y siempre libre para vos.' },
			// §3.1 — 24/7 only here and in the access FAQ, both under a planned-service qualifier.
			{ n: '02', title: 'Acceso digital personal, 24/7', copy: 'Con tu QR o código personal entrás y salís a cualquier hora, todos los días, sin depender de nadie.' },
			// §3.5
			{ n: '03', title: 'Cerrado, seco y limpio', copy: 'Sin lluvia, sin humedad de vereda, sin polvo. Limpieza periódica del espacio.' },
			// B5
			{ n: '04', title: 'Registro de accesos', copy: 'Cada ingreso y egreso queda registrado a tu nombre.' },
			{ n: '05', title: 'Retiro sin mover otras bicis', copy: 'Cada lugar es independiente: sacás la tuya sin tocar la del vecino.' },
			{ n: '06', title: 'Inventario por número de cuadro', copy: 'Marca, modelo y número de cuadro registrados al ingresar.' },
			{ n: '07', title: 'Membresía mensual', copy: 'Sin garantía, sin contrato anual, sin comisión inmobiliaria.' },
			// 08 "Zona de limpieza" removed (§3.5).
		],
	},
	works: {
		index: '03',
		rail: 'Cómo funciona',
		eyebrow: 'Cómo funciona',
		heading: 'Tres pasos, y la bici deja de ser un problema.',
		steps: [
			{ n: '1', title: 'Dejá tu interés', copy: 'Dejá tus datos y contanos en qué barrio la necesitás.' },
			{ n: '2', title: 'Activá tu acceso', copy: 'Registramos marca, modelo y número de cuadro. Recibís tu acceso personal.' },
			{ n: '3', title: 'Usala todos los días', copy: 'Llegás, dejás la bici en tu lugar y seguís.' },
		],
	},
	vehicles: {
		index: '04',
		rail: 'Qué entra',
		eyebrow: 'Tu movilidad, bien cuidada',
		heading: 'Diseñado para lo que realmente usás.',
		items: ['Bicicleta urbana', 'Ruta y MTB', 'E-bike', 'Cargo', 'Plegable', 'Monopatín eléctrico'],
		// Owner response v1.2 §1.4 supersedes handoff B6.
		batteryNote:
			'E-bikes y monopatines eléctricos: si la batería es removible, te la llevás con vos; si está integrada, la bici se guarda en una zona separada. No se cargan baterías dentro del hub.',
		// §3.5
		evaluatingNote:
			'Estamos evaluando sumar lockers individuales para casco y equipo, una estación de autoservicio con herramientas básicas y guarda por temporada. Contanos en la encuesta si te interesan.',
	},
	security: {
		index: '05',
		rail: 'Seguridad',
		eyebrow: 'Seguridad y acceso',
		heading: 'Nadie entra de pasada.',
		lede: 'Cada socio se identifica. Cada acceso queda registrado. Cada bici está asociada a su marca, modelo y número de cuadro.',
		// §3.4, in this order.
		items: [
			'Identificación individual con DNI al asociarte',
			'Acceso digital personal, no transferible',
			'Registro individual de ingresos y egresos',
			'Estructuras de guarda fijadas e independientes por lugar — sin bicis apoyadas unas sobre otras',
			'Espacio cerrado y seco: sin lluvia ni humedad de vereda',
			'Sin carga de baterías; e-bikes con batería integrada en zona separada',
		],
		plannedNote: 'Identificación y registro de accesos son propiedades previstas del servicio. Todavía no hay ninguna sede en operación.',
	},
	comparison: {
		index: '06',
		rail: 'Comparación',
		eyebrow: 'Por qué CLAVERA',
		heading: 'Ni la calle, ni un lugar pensado para autos.',
		tableCaption: 'Comparación de opciones de guarda',
		// B3
		columns: ['Calle / balcón', 'Cochera de auto (alternativa)', 'CLAVERA'],
		rowHeader: 'Criterio',
		rows: [
			{
				label: 'Seguridad',
				values: [
					'Candado y suerte',
					'Parcial: espacio compartido, sin lugar propio',
					'Lugar asignado + ingreso controlado + registro',
				],
			},
			{
				label: 'Costo mensual',
				values: [
					'«Gratis», hasta el primer robo',
					'Alquiler mensual, más garantía y comisión',
					'Membresía mensual, sin garantía ni comisión',
				],
			},
			{ label: 'Compromiso', values: ['—', 'Habitualmente, contrato anual', 'Mes a mes'] },
			{
				label: 'Pensado para bicis',
				values: ['No', 'No', 'Sí: cada lugar independiente, retiro sin mover otras bicis'],
			},
			{ label: 'Clima', values: ['Lluvia, humedad, óxido', 'Variable', 'Cerrado, seco y limpio'] },
		],
		scrollHint: 'Deslizá para ver la tabla completa →',
		note: 'CLAVERA no es una cochera ni un estacionamiento: es un servicio de depósito y custodia de bicicletas y dispositivos de movilidad personal por membresía, con lugar asignado.',
	},
	hub: {
		index: '07',
		rail: 'El espacio',
		eyebrow: 'El espacio',
		heading: 'Así está diseñado un hub CLAVERA.',
		lede: 'Cada hub se proyecta con el mismo estándar: lugares independientes, circulación libre, materiales que resisten uso diario.',
		legendTitle: 'Esquema de zonificación',
		legend: ['Ingreso', 'Ocho lugares numerados', 'Zona cargo', 'Lockers', 'Sala técnica'],
	},
	cases: {
		index: '08',
		rail: 'Para quién',
		eyebrow: 'Para quién',
		heading: 'Si te pasa alguna de estas, CLAVERA es para vos.',
		// §3.6: the first two lines replaced, the rest unchanged.
		items: [
			'Tu bici duerme en el balcón, al sol y a la lluvia.',
			'Tu bici vale más que el candado que la cuida.',
			'Usás la bici todos los días y cada salida empieza con el ascensor.',
			'Sos una familia con más bicis que balcón.',
			'Tu edificio no tiene bicicletero, o el que hay está lleno.',
		],
	},
	zones: {
		index: '09',
		rail: 'Zonas',
		// §3.2: the area list is gone; the section holds the zone selector.
		eyebrow: 'Mapa de demanda',
		heading: '¿Dónde la necesitás?',
		disclaimer:
			'Todavía no elegimos ubicaciones: las define la demanda. Elegir una zona no implica compromiso de apertura, fecha ni disponibilidad.',
	},
	// B4: "Sumate al piloto" replaces Socios Fundadores. No offer numbers.
	founders: {
		index: '10',
		rail: 'Piloto',
		eyebrow: 'Piloto',
		heading: 'Sumate al piloto',
		lede: 'Dejanos tu zona y cómo contactarte. Te avisamos cuando haya novedades del piloto cerca tuyo.',
		note: 'Es una manifestación preliminar de interés: no reserva ningún lugar, no genera ningún contrato y no se acepta ningún pago.',
		surveyPrompt: '¿Tenés 3 minutos más?',
		surveyCta: 'Respondé la encuesta',
	},
	faq: {
		index: '11',
		rail: 'Preguntas',
		eyebrow: 'Preguntas frecuentes',
		heading: 'Lo importante, sin letra chica.',
		items: [
			{
				q: '¿Qué es CLAVERA?',
				a: 'CLAVERA es una guardería segura de bicicletas y movilidad personal por membresía en Buenos Aires. Cada socio tiene un lugar asignado, acceso digital personal y registro de cada ingreso. No es un taller ni un lugar para autos.',
			},
			// §3.1
			{
				q: '¿En qué horario puedo entrar?',
				a: 'El acceso está pensado para funcionar las 24 horas, todos los días, con tu código personal. Es una propiedad prevista del servicio: todavía no hay ninguna sede en operación.',
			},
			// B4
			{
				q: '¿Cuánto cuesta?',
				a: 'Todavía no publicamos el precio. Lo publicamos junto con las condiciones completas antes de cualquier contratación. No se acepta ningún pago.',
			},
			// §3.7
			{
				q: '¿Qué pasa si me quiero dar de baja?',
				a: 'La membresía es mes a mes, sin permanencia mínima. Las condiciones completas, incluida la baja, se publican antes de cualquier contratación.',
			},
			{
				q: '¿Necesito tener mi bici asegurada?',
				a: 'No. Recibimos bicicletas aseguradas y no aseguradas. Al ingresar registramos marca, modelo y número de cuadro.',
			},
			// B6
			{
				q: '¿Puedo guardar mi e-bike?',
				a: 'Sí. E-bikes y monopatines eléctricos: si la batería es removible, te la llevás con vos; si está integrada, la bici se guarda en una zona separada. No se cargan baterías dentro del hub.',
			},
			{ q: '¿Hacen reparaciones?', a: 'No. CLAVERA no es un taller: es infraestructura de guarda.' },
			{ q: '¿Guardan autos o motos?', a: 'No. CLAVERA es exclusivamente para bicicletas y micromovilidad personal.' },
			// §3.3
			{
				q: '¿Dónde va a estar CLAVERA?',
				a: 'Todavía no está decidido: lo define la demanda. Elegí tu zona más arriba y respondé la encuesta: la búsqueda de un espacio empieza donde se concentre el interés.',
			},
			{
				q: '¿Cómo se retira la bici?',
				a: 'Cada lugar es independiente. Retirás la tuya sin mover ninguna otra bicicleta.',
			},
		],
	},
	pilot: {
		cta: 'Avisame',
	},
	// §3.3
	survey: {
		eyebrow: 'Ayudanos a diseñar CLAVERA',
		heading: '¿Cómo usás tu bici en Buenos Aires?',
		note: 'Tres minutos. Nos ayuda a entender dónde hace falta y cómo diseñar el espacio.',
		cta: 'Responder encuesta · 3 min',
		languageNotice: '',
	},
	footer: {
		claim: 'Infraestructura urbana de guarda para tu bici.',
		contactTitle: 'Contacto',
		spacesTitle: 'Espacios',
		legalTitle: 'Legal',
		proposeSpace: 'Proponer un espacio',
		forDevelopers: 'Para desarrolladores',
		privacy: 'Política de Privacidad',
		terms: 'Términos y Condiciones',
		cookies: 'Cookies',
		rights: '© 2026 CLAVERA. Todos los derechos reservados.',
		location: 'Buenos Aires, Argentina',
		languageTitle: 'Idioma',
		pendingNote: 'En preparación.',
		whatsappPending: 'WhatsApp Business — próximamente.',
		phonePending: 'Teléfono — próximamente.',
	},
	legalPage: {
		backToHome: 'Volver al inicio',
		lastUpdatedLabel: 'Última actualización',
		lastUpdatedPending: 'Pendiente de publicación',
		versionLabel: 'Versión',
		courtesyNotice: '',
		readInSpanish: '',
	},
	media: {
		disclosure:
			'Imágenes de proyecto. No corresponden a una sede en operación. Imagen ilustrativa generada digitalmente.',
		renders: {
			r1: {
				alt: 'Vista general de un hub CLAVERA: hilera de bicicletas en soportes verticales numerados, junto a una pared de lockers y un banco de madera.',
				caption: 'Vista general del hub',
			},
			r2: {
				alt: 'Bicicletas en soportes verticales individuales numerados, cada uno anclado a la pared de un hub CLAVERA.',
				caption: 'Soportes verticales individuales',
			},
			r3: {
				alt: 'Zona de autolavado para bicicletas en un hub CLAVERA, con manguera, productos de limpieza y piso con desagüe.',
				caption: 'Zona de autolavado',
			},
			entrance: {
				// B5: no camera in the description.
				alt: 'Ingreso de un hub CLAVERA, con puerta de acceso y panel de acceso digital.',
				caption: 'Ingreso controlado',
			},
			r4: {
				alt: 'Lockers individuales en un hub CLAVERA, con uno abierto que muestra espacio para una silla portabebé de bicicleta.',
				caption: 'Lockers y espacio para silla de bebé',
			},
			r5: {
				alt: 'Zona para bicicletas cargo y e-bikes de gran tamaño, con lugares delimitados a nivel de piso en un hub CLAVERA.',
				caption: 'Zona cargo y e-bikes',
			},
			r6: {
				alt: 'Esquema isométrico de zonificación de un hub CLAVERA: ingreso, ocho lugares numerados de guarda, zona cargo, lockers y sala técnica.',
				caption: 'Esquema de zonificación',
			},
		},
	},
};
