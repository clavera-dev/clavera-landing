import type { Copy } from './types';

/**
 * Canonical copy (es-AR, Rioplatense).
 *
 * This is the product-copy authority. English and Russian must preserve this
 * meaning; they may not soften a claim, drop a legal qualifier, or introduce a
 * fact that is not here.
 */
export const es: Copy = {
	meta: {
		title: 'CLAVERA — Guarda segura de bicicletas en Buenos Aires',
		description:
			'Guardería segura de bicicletas y movilidad personal por membresía en Buenos Aires. Lugar asignado, acceso digital y vigilancia, a minutos de tu casa.',
		ogTitle: 'Tu bici merece un lugar seguro en la ciudad.',
	},
	a11y: {
		skipLink: 'Saltar al contenido principal',
		homeLabel: 'CLAVERA — inicio',
		languageNavLabel: 'Idioma',
		ownersNavLabel: 'Para propietarios y desarrolladores',
		legalNavLabel: 'Legal',
	},
	header: {
		note: 'Socios fundadores · 40 lugares',
		cta: 'Quiero mi lugar',
	},
	hero: {
		eyebrow: 'Guarda segura · Buenos Aires',
		headingHtml: 'Tu bici merece un lugar seguro en la ciudad.',
		lede: 'CLAVERA es una guardería segura de bicicletas y movilidad personal por membresía. Tu lugar asignado, acceso digital y vigilancia, a minutos de tu casa.',
		ctaPrimary: 'Quiero mi lugar',
		ctaSecondary: 'Ver cómo funciona',
		facts: ['Lugar asignado', 'Ingreso controlado', 'Cerrado y seco'],
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
		pillars: [
			{ n: '01', title: 'Lugar asignado', copy: 'Con tu nombre, independiente y siempre libre para vos.' },
			{ n: '02', title: 'Acceso digital personal', copy: 'QR o código personal. Entrás y salís sin depender de nadie.' },
			{ n: '03', title: 'Cerrado, seco y limpio', copy: 'Sin lluvia, sin humedad de vereda, sin polvo. Mantenimiento periódico.' },
			{ n: '04', title: 'Vigilancia y registro', copy: 'Cámaras y registro individual de cada ingreso y egreso.' },
			{ n: '05', title: 'Retiro sin mover otras bicis', copy: 'Cada lugar es independiente: sacás la tuya sin tocar la del vecino.' },
			{ n: '06', title: 'Inventario por número de cuadro', copy: 'Marca, modelo y número de cuadro registrados al ingresar.' },
			{ n: '07', title: 'Membresía mensual', copy: 'Sin garantía, sin contrato anual, sin comisión inmobiliaria.' },
			{ n: '08', title: 'Zona de limpieza', copy: 'Un espacio de autoservicio preparado para limpiar tu bicicleta dentro del hub.' },
		],
	},
	works: {
		index: '03',
		rail: 'Cómo funciona',
		eyebrow: 'Cómo funciona',
		heading: 'Tres pasos, y la bici deja de ser un problema.',
		steps: [
			{ n: '1', title: 'Reservá tu lugar', copy: 'Dejá tus datos y contanos en qué barrio la necesitás.' },
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
		note: 'Lockers individuales opcionales para casco y equipo. Por seguridad, no se cargan baterías dentro del hub.',
	},
	security: {
		index: '05',
		rail: 'Seguridad',
		eyebrow: 'Seguridad y acceso',
		heading: 'Nadie entra de pasada.',
		lede: 'Cada socio se identifica. Cada acceso queda registrado. Cada bici está asociada a su marca, modelo y número de cuadro.',
		items: [
			'Identificación individual con DNI al asociarte',
			'Acceso digital personal, no transferible',
			'Cámaras y registro de ingresos y egresos',
			'Estructuras de guarda profesionales, fijadas e independientes por lugar — sin bicis apoyadas unas sobre otras',
			'Sin carga de baterías dentro del hub',
		],
	},
	comparison: {
		index: '06',
		rail: 'Comparación',
		eyebrow: 'Por qué CLAVERA',
		heading: 'Ni la calle, ni un lugar pensado para autos.',
		tableCaption: 'Comparación de opciones de guarda',
		columns: ['Calle / balcón', 'Cochera de auto', 'CLAVERA'],
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
					'80.000 – 150.000 ARS, más garantía y comisión',
					'Membresía mensual, sin garantía ni comisión',
				],
			},
			{ label: 'Compromiso', values: ['—', 'Contrato anual', 'Mes a mes'] },
			{
				label: 'Pensado para bicis',
				values: ['No', 'No', 'Sí: cada lugar independiente, retiro sin mover otras bicis'],
			},
			{ label: 'Clima', values: ['Lluvia, humedad, óxido', 'Variable', 'Cerrado, seco y limpio'] },
		],
		scrollHint: 'Deslizá para ver la tabla completa →',
		note: 'Valores de referencia de mercado para cocheras en CABA, agosto 2026.',
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
		items: [
			'Tu bici vale más que el candado que la cuida — y duerme en el balcón.',
			'Tenés una e-bike o una cargo que no entra en el ascensor.',
			'Usás la bici todos los días y cada salida empieza con el ascensor.',
			'Sos una familia con más bicis que balcón.',
			'Tu edificio no tiene bicicletero, o el que hay está lleno.',
		],
	},
	zones: {
		index: '09',
		rail: 'Zonas',
		eyebrow: 'Primeros hubs',
		heading: 'Estamos construyendo el mapa de demanda antes de elegir las ubicaciones.',
		lede: 'Nos interesa saber dónde hace falta. Estas son las zonas donde estamos trabajando.',
		items: ['Palermo', 'Chacarita', 'Villa Crespo', 'Recoleta'],
		note: 'Cada zona avanza a su ritmo: en algunas buscamos un hub completo, en otras un espacio más chico dentro de un edificio o un espacio existente. Dejá tu pedido y te contamos qué hay disponible en la tuya.',
	},
	founders: {
		index: '10',
		rail: 'Fundadores',
		eyebrow: 'Socios Fundadores',
		heading: 'Los primeros 40 lugares empiezan acá.',
		figures: [
			{ value: '40', unit: 'lugares', note: 'Cupo de Socios Fundadores' },
			{ value: '−20%', unit: '', note: 'Sobre el precio de lista' },
			{ value: '24', unit: 'meses', note: 'Descuento garantizado' },
		],
		offerStrong: '20% de descuento sobre el precio de lista, garantizado por 24 meses.',
		offerRest: 'Los Socios Fundadores eligen su lugar antes que nadie.',
		note: 'Dejar tus datos no implica ningún pago. Te enviamos el precio de Socio Fundador y la disponibilidad en tu zona.',
		cta: 'Ver mi precio de Socio Fundador',
		disclaimer:
			'El precio de Socio Fundador se define como un 20% por debajo del precio de lista vigente, con actualización trimestral por IPC/ICL, garantizado por 24 meses desde el alta.',
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
			{
				q: '¿Cuánto cuesta?',
				a: 'Te mostramos el precio de Socio Fundador al dejar tus datos, junto con la disponibilidad en tu zona. Sin compromiso y sin pago. El precio de Socio Fundador es un 20% por debajo del precio de lista, garantizado por 24 meses.',
			},
			{
				q: '¿Qué pasa si me quiero dar de baja?',
				a: 'La membresía es mensual. Avisás con 30 días de anticipación y se da de baja sin penalidades.',
			},
			{
				q: '¿Necesito tener mi bici asegurada?',
				a: 'No. Recibimos bicicletas aseguradas y no aseguradas. Al ingresar registramos marca, modelo y número de cuadro.',
			},
			{ q: '¿Puedo cargar mi e-bike ahí?', a: 'No. Por seguridad, no se cargan baterías dentro del hub.' },
			{ q: '¿Hacen reparaciones?', a: 'No. CLAVERA no es un taller: es infraestructura de guarda.' },
			{ q: '¿Guardan autos o motos?', a: 'No. CLAVERA es exclusivamente para bicicletas y micromovilidad personal.' },
			{
				q: '¿Dónde va a estar el primer hub?',
				a: 'Estamos construyendo el mapa de demanda antes de elegir la ubicación. Las zonas prioritarias son Chacarita, Villa Crespo, Palermo y Recoleta. El primer hub abre donde la demanda esté más concentrada.',
			},
			{
				q: '¿Cómo se retira la bici?',
				a: 'Cada lugar es independiente. Retirás la tuya sin mover ninguna otra bicicleta.',
			},
		],
	},
	survey: {
		eyebrow: 'Ayudanos a diseñar el primer hub',
		heading: '¿Cómo usás tu bici en Buenos Aires?',
		note: 'Tres minutos. Nos ayuda a elegir dónde abrir y cómo diseñar el espacio.',
		cta: 'Responder encuesta · 3 min',
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
		translationNotice: '',
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
				alt: 'Ingreso de un hub CLAVERA, con puerta de acceso, panel de acceso digital y cámara de seguridad.',
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
