import type { LegalDocumentByLocale } from './types';

/**
 * Términos y Condiciones / Terms and Conditions / Условия использования.
 *
 * ES is the authoritative text: CLAVERA_Legal_Spec_v3_0_received.md §6.6,
 * with point 2 (TITULAR) filled from handoff v1.1 B1 (Anna Kazanova, CUIT
 * 20-96380996-5, Aráoz 2686, CABA). All other points are unchanged by the
 * handoff. Point 11 keeps the spec's mandatory rule (competent court is the
 * user's own domicile, article 36, Ley 24.240) rather than the rejected CABA
 * jurisdiction clause.
 */
export const terms: LegalDocumentByLocale = {
	es: {
		title: 'Términos y Condiciones de Uso — clavera.ar',
		description: 'Condiciones de uso del sitio de CLAVERA y de la beta: alcance, responsabilidades y contacto.',
		sections: [
			{
				id: '1',
				heading: 'OBJETO',
				paragraphs: [
					'Este sitio es de carácter informativo. Su finalidad es presentar el proyecto CLAVERA y relevar el interés del público mediante un formulario voluntario.',
				],
			},
			{
				id: '2',
				heading: 'TITULAR',
				paragraphs: [
					'CLAVERA es la denominación bajo la cual Anna Kazanova, CUIT 20-96380996-5, con domicilio en Aráoz 2686, CABA, desarrolla su actividad.',
					'Contacto: hola@clavera.ar',
				],
			},
			{
				id: '3',
				heading: 'AUSENCIA DE OFERTA CONTRACTUAL',
				paragraphs: [
					'La información publicada tiene carácter general e informativo y no constituye una oferta contractual vinculante. Las condiciones definitivas del servicio, incluidos precios, alcance y contrato de membresía, se publicarán al momento de la apertura y con anterioridad a cualquier contratación.',
				],
			},
			{
				id: '4',
				heading: 'AUSENCIA DE PAGOS',
				paragraphs: [
					'El sitio no acepta pagos, señas, depósitos ni reservas. No se solicitan datos de tarjetas ni de cuentas bancarias. Ninguna comunicación de CLAVERA solicitará pagos a través de este sitio en su versión actual.',
				],
			},
			{
				id: '5',
				heading: 'IMÁGENES',
				paragraphs: [
					'Las imágenes publicadas son imágenes de proyecto y no representan instalaciones existentes. Cada imagen se identifica como tal.',
				],
			},
			{
				id: '6',
				heading: 'CONTENIDOS DEL SITIO',
				paragraphs: [
					'Los textos, el diseño, las imágenes y demás elementos de este sitio son obra de su titular o se utilizan bajo licencia, y se encuentran protegidos por la Ley 11.723 de Propiedad Intelectual. Queda prohibida su reproducción total o parcial sin autorización escrita. "CLAVERA" es la denominación con la que el titular designa su actividad.',
				],
			},
			{
				id: '7',
				heading: 'ENLACES A TERCEROS',
				paragraphs: [
					'El formulario se aloja en Typeform, sujeto a sus propios términos y política de privacidad. CLAVERA no responde por el contenido ni por las prácticas de sitios de terceros.',
				],
			},
			{
				id: '8',
				heading: 'DISPONIBILIDAD',
				paragraphs: [
					'El sitio se ofrece "tal como está". No se garantiza su disponibilidad ininterrumpida ni la ausencia de errores.',
				],
			},
			{
				id: '9',
				heading: 'DATOS PERSONALES',
				paragraphs: [
					'El tratamiento de datos personales se rige por la Política de Privacidad disponible en clavera.ar/privacidad.',
				],
			},
			{
				id: '10',
				heading: 'IDIOMA',
				paragraphs: [
					'La versión en español (es-AR) es la única con validez legal. Las traducciones al inglés y al ruso se ofrecen a título informativo; en caso de discrepancia, prevalece el texto en español.',
				],
			},
			{
				id: '11',
				heading: 'LEY APLICABLE Y JURISDICCIÓN',
				paragraphs: [
					'Estos Términos se rigen por las leyes de la República Argentina. Para toda controversia resultará competente el tribunal correspondiente al domicilio del usuario, conforme al artículo 36 de la Ley 24.240.',
				],
			},
			{
				id: '12',
				heading: 'MODIFICACIONES',
				paragraphs: [
					'CLAVERA puede modificar estos Términos. La versión vigente es la publicada en clavera.ar/terminos, con indicación de su fecha.',
				],
			},
		],
	},
	en: {
		title: 'Terms and Conditions of Use — clavera.ar',
		description: 'Terms of use for the CLAVERA website and beta: scope, responsibilities and contact. Courtesy translation; Spanish prevails.',
		sections: [
			{
				id: '1',
				heading: 'PURPOSE',
				paragraphs: [
					'This site is informational in nature. Its purpose is to present the CLAVERA project and to gauge public interest through a voluntary form.',
				],
			},
			{
				id: '2',
				heading: 'OWNER',
				paragraphs: [
					'CLAVERA is the name under which Anna Kazanova, CUIT 20-96380996-5, with address at Aráoz 2686, CABA, carries out this activity.',
					'Contact: hola@clavera.ar',
				],
			},
			{
				id: '3',
				heading: 'NO CONTRACTUAL OFFER',
				paragraphs: [
					'The information published is general and informational and does not constitute a binding contractual offer. The definitive conditions of the service, including prices, scope and the membership contract, will be published at the time of opening and before any sign-up.',
				],
			},
			{
				id: '4',
				heading: 'NO PAYMENTS',
				paragraphs: [
					'The site does not accept payments, deposits or reservations of any kind. No card or bank account details are requested. No communication from CLAVERA will ask for payment through this site in its current version.',
				],
			},
			{
				id: '5',
				heading: 'IMAGES',
				paragraphs: [
					'The published images are project renderings and do not depict existing facilities. Each image is identified as such.',
				],
			},
			{
				id: '6',
				heading: 'SITE CONTENT',
				paragraphs: [
					'The text, design, images and other elements of this site are the work of its owner or are used under licence, and are protected by Law 11.723 on Intellectual Property. Their full or partial reproduction without written authorisation is prohibited. "CLAVERA" is the name under which the owner designates this activity.',
				],
			},
			{
				id: '7',
				heading: 'THIRD-PARTY LINKS',
				paragraphs: [
					'The form is hosted on Typeform, subject to its own terms and privacy policy. CLAVERA is not responsible for the content or practices of third-party sites.',
				],
			},
			{
				id: '8',
				heading: 'AVAILABILITY',
				paragraphs: [
					'The site is offered "as is". Uninterrupted availability and the absence of errors are not guaranteed.',
				],
			},
			{
				id: '9',
				heading: 'PERSONAL DATA',
				paragraphs: ['The processing of personal data is governed by the Privacy Policy available at clavera.ar/privacidad.'],
			},
			{
				id: '10',
				heading: 'LANGUAGE',
				paragraphs: [
					'The Spanish (es-AR) version is the only one with legal validity. The English and Russian translations are offered for informational purposes; in case of discrepancy, the Spanish text prevails.',
				],
			},
			{
				id: '11',
				heading: 'APPLICABLE LAW AND JURISDICTION',
				paragraphs: [
					'These Terms are governed by the laws of Argentina. For any dispute, the court corresponding to the user’s own domicile has jurisdiction, in accordance with article 36 of Law 24.240.',
				],
			},
			{
				id: '12',
				heading: 'CHANGES',
				paragraphs: ['CLAVERA may modify these Terms. The version in force is the one published at clavera.ar/terminos, showing its date.'],
			},
		],
	},
	ru: {
		title: 'Условия использования — clavera.ar',
		description: 'Условия использования сайта CLAVERA и беты: рамки, ответственность и контакты. Перевод для удобства; приоритет у испанской версии.',
		sections: [
			{
				id: '1',
				heading: 'ПРЕДМЕТ',
				paragraphs: [
					'Этот сайт носит информационный характер. Его цель — представить проект CLAVERA и оценить интерес публики через добровольную форму.',
				],
			},
			{
				id: '2',
				heading: 'ВЛАДЕЛЕЦ',
				paragraphs: [
					'CLAVERA — обозначение, под которым Anna Kazanova (Анна Казанова), CUIT 20-96380996-5, с адресом Aráoz 2686, CABA, ведёт свою деятельность.',
					'Контакт: hola@clavera.ar',
				],
			},
			{
				id: '3',
				heading: 'ОТСУТСТВИЕ ДОГОВОРНОЙ ОФЕРТЫ',
				paragraphs: [
					'Опубликованная информация носит общий и информационный характер и не является обязывающей договорной офертой. Окончательные условия сервиса, включая цены, объём и договор о подписке, будут опубликованы при открытии и до любого оформления.',
				],
			},
			{
				id: '4',
				heading: 'ОТСУТСТВИЕ ПЛАТЕЖЕЙ',
				paragraphs: [
					'Сайт не принимает платежи, задатки, депозиты или резервирования в какой-либо форме. Данные банковских карт или счетов не запрашиваются. Ни одно сообщение от CLAVERA не будет запрашивать оплату через этот сайт в его текущей версии.',
				],
			},
			{
				id: '5',
				heading: 'ИЗОБРАЖЕНИЯ',
				paragraphs: [
					'Опубликованные изображения являются изображениями проекта и не отображают существующие объекты. Каждое изображение обозначено как таковое.',
				],
			},
			{
				id: '6',
				heading: 'СОДЕРЖИМОЕ САЙТА',
				paragraphs: [
					'Тексты, дизайн, изображения и прочие элементы этого сайта являются произведением его владельца или используются по лицензии и охраняются Законом 11.723 об интеллектуальной собственности. Их полное или частичное воспроизведение без письменного разрешения запрещено. «CLAVERA» — обозначение, под которым владелец ведёт эту деятельность.',
				],
			},
			{
				id: '7',
				heading: 'ССЫЛКИ НА ТРЕТЬИ СТОРОНЫ',
				paragraphs: [
					'Форма размещена на Typeform и подчиняется его собственным условиям и политике конфиденциальности. CLAVERA не отвечает за содержание или практики сторонних сайтов.',
				],
			},
			{
				id: '8',
				heading: 'ДОСТУПНОСТЬ',
				paragraphs: [
					'Сайт предоставляется «как есть». Бесперебойная доступность и отсутствие ошибок не гарантируются.',
				],
			},
			{
				id: '9',
				heading: 'ПЕРСОНАЛЬНЫЕ ДАННЫЕ',
				paragraphs: [
					'Обработка персональных данных регулируется Политикой конфиденциальности, доступной на clavera.ar/privacidad.',
				],
			},
			{
				id: '10',
				heading: 'ЯЗЫК',
				paragraphs: [
					'Версия на испанском языке (es-AR) является единственной, имеющей юридическую силу. Переводы на английский и русский языки предоставляются в информационных целях; в случае расхождений преимущество имеет текст на испанском языке.',
				],
			},
			{
				id: '11',
				heading: 'ПРИМЕНИМОЕ ПРАВО И ПОДСУДНОСТЬ',
				paragraphs: [
					'Настоящие Условия регулируются законодательством Аргентины. Для рассмотрения любого спора компетентен суд по месту жительства пользователя, в соответствии со ст. 36 Закона 24.240.',
				],
			},
			{
				id: '12',
				heading: 'ИЗМЕНЕНИЯ',
				paragraphs: [
					'CLAVERA может изменять настоящие Условия. Действующей является версия, опубликованная на clavera.ar/terminos, с указанием её даты.',
				],
			},
		],
	},
};
