import type { LegalDocumentByLocale } from './types';

/**
 * Política de Privacidad / Privacy Policy / Политика конфиденциальности.
 *
 * ES is the authoritative text: CLAVERA_Legal_Spec_v3_0_received.md §2.2,
 * with points 2, 4(d) and 6 replaced by the v3.1 "Canales de contacto" patch
 * (CLAVERA_Dev_Handoff_Beta_v1_1.md §5). Point 7 (cross-border transfer) is
 * unchanged by the patch and its numbering is fixed — do not renumber.
 *
 * Placeholders filled from handoff v1.1 B1: Responsable "Anna Kazanova",
 * CUIT "20-96380996-5", domicilio "Aráoz 2686, CABA". The RNBD registration
 * number is not published (no number has been issued). The publication date
 * is read from src/config/legal.ts, not written here — see LegalPage.astro.
 *
 * EN and RU are courtesy translations derived from this Spanish text, per
 * point 10 of the Terms and the footer's Spanish-primacy clause.
 */
export const privacy: LegalDocumentByLocale = {
	es: {
		title: 'Política de Privacidad — CLAVERA',
		sections: [
			{
				id: '1',
				heading: 'RESPONSABLE DEL TRATAMIENTO',
				paragraphs: [
					'CLAVERA es la denominación bajo la cual Anna Kazanova, CUIT 20-96380996-5, con domicilio en Aráoz 2686, Ciudad Autónoma de Buenos Aires, República Argentina (en adelante, "el Responsable"), desarrolla su actividad. El Responsable es titular de la base de datos.',
					'Contacto para el ejercicio de derechos: hola@clavera.ar',
					'WhatsApp: +54 9 11 2832-9931',
				],
			},
			{
				id: '2',
				heading: 'DATOS QUE RECOLECTAMOS',
				paragraphs: [
					'A través del formulario alojado en Typeform recolectamos: nombre o apodo; dirección de correo electrónico; número de teléfono / WhatsApp; barrio de residencia o de interés; tipo, marca y modelo del vehículo de movilidad; respuestas sobre hábitos de uso y preferencias del servicio.',
					'Adicionalmente, el sitio registra datos técnicos de navegación: dirección IP, tipo de dispositivo y navegador, y parámetros de origen de la visita (UTM).',
					'No recolectamos datos sensibles en los términos del art. 2 de la Ley 25.326. El sitio no está dirigido a menores de 18 años.',
					'Si nos escribís por WhatsApp, Instagram, Facebook o TikTok, recibimos tu nombre de usuario o número y el contenido del mensaje. Esos datos se usan solo para responderte y, si lo pedís, para enviarte el enlace al formulario.',
				],
			},
			{
				id: '3',
				heading: 'CARÁCTER DE LA PROVISIÓN',
				paragraphs: [
					'La provisión de todos los datos es voluntaria. No completar los campos del formulario impide participar del estudio de demanda y ser contactado, pero no genera ninguna otra consecuencia para el titular.',
				],
			},
			{
				id: '4',
				heading: 'FINALIDADES DEL TRATAMIENTO',
				letteredList: [
					'Investigar la demanda de un servicio de guarda segura de bicicletas y dispositivos de movilidad personal en la Ciudad Autónoma de Buenos Aires.',
					'Definir zonas, barrios y ubicaciones potenciales del servicio.',
					'Responder consultas y contactar al titular respecto de su propia solicitud.',
					'Únicamente si el titular prestó su consentimiento específico y adicional: enviar comunicaciones sobre disponibilidad, precios, apertura y novedades de CLAVERA por correo electrónico, WhatsApp o Instagram, según el medio elegido por el titular.',
				],
				closingParagraphs: ['Los datos no se utilizan para elaborar perfiles ni para decisiones automatizadas.'],
			},
			{
				id: '5',
				heading: 'BASE LEGAL',
				paragraphs: [
					'El tratamiento se funda en el consentimiento libre, expreso e informado del titular (arts. 5 y 6 de la Ley 25.326), prestado mediante casillas de verificación no premarcadas.',
				],
			},
			{
				id: '6',
				heading: 'DESTINATARIOS Y ENCARGADOS DE TRATAMIENTO',
				paragraphs: ['Los datos son tratados por proveedores que actúan como encargados por cuenta del Responsable:'],
				list: [
					'Typeform SL — alojamiento y procesamiento del formulario.',
					'Google LLC (Google Workspace / Google Sheets) — correo y almacenamiento.',
					'Cloudflare, Inc. — entrega y seguridad del sitio.',
					'Meta Platforms, Inc. — WhatsApp Business e Instagram, cuando el titular elige esos medios de contacto.',
				],
				closingParagraphs: [
					'Cuando el titular se comunica con CLAVERA a través de Facebook o TikTok, esos mensajes se tratan en las respectivas plataformas conforme a sus propias políticas de privacidad; CLAVERA no incorpora esos datos a su base de datos salvo que el titular complete el formulario.',
					'No vendemos, alquilamos ni cedemos datos personales a terceros con fines comerciales propios de esos terceros.',
					'El Responsable podrá transferir la base de datos a la persona jurídica que constituya para continuar la actividad de CLAVERA, manteniendo idénticas finalidades, alcance y derechos del titular, sin que ello implique cambio en las condiciones aquí informadas.',
				],
			},
			{
				id: '7',
				heading: 'TRANSFERENCIA INTERNACIONAL',
				paragraphs: [
					'Los proveedores mencionados procesan datos fuera de la República Argentina. Dichas transferencias se realizan al amparo de cláusulas contractuales que garantizan un nivel adecuado de protección, conforme al art. 12 de la Ley 25.326, la Disposición 60-E/2016 y la Resolución AAIP 198/2023.',
				],
			},
			{
				id: '8',
				heading: 'PLAZO DE CONSERVACIÓN',
				list: [
					'Datos del estudio de demanda: 24 meses desde la última interacción del titular, vencidos los cuales se eliminan o se anonimizan de forma irreversible.',
					'Datos de contacto con fines de comunicación comercial: hasta que el titular revoque su consentimiento.',
					'Registro de bajas: conservamos el dato mínimo indispensable (correo o teléfono) por tiempo indeterminado, con la única finalidad de garantizar que no se vuelva a contactar a quien solicitó la baja.',
				],
			},
			{
				id: '9',
				heading: 'DERECHOS DEL TITULAR',
				paragraphs: [
					'El titular puede solicitar en cualquier momento el acceso, la rectificación, la actualización y la supresión de sus datos, así como revocar su consentimiento, escribiendo a hola@clavera.ar.',
					'Plazos de respuesta: acceso, 10 días corridos (art. 14, inc. 2, Ley 25.326); rectificación, actualización o supresión, 5 días hábiles (art. 16, inc. 2).',
					'El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que acredite un interés legítimo al efecto, conforme al art. 14, inc. 3 de la Ley 25.326.',
				],
			},
			{
				id: '10',
				heading: 'BAJA DE COMUNICACIONES',
				paragraphs: [
					'Toda comunicación comercial incluirá un mecanismo simple y gratuito de baja. También puede solicitarse escribiendo a hola@clavera.ar. La baja se hace efectiva dentro de los 5 días hábiles.',
				],
			},
			{
				id: '11',
				heading: 'SEGURIDAD',
				paragraphs: [
					'El Responsable adopta medidas técnicas y organizativas razonables para proteger los datos contra el acceso no autorizado, la pérdida o la alteración, incluyendo acceso restringido, autenticación de doble factor en las cuentas administrativas y cifrado en tránsito.',
				],
			},
			{
				id: '12',
				heading: 'COOKIES',
				paragraphs: ['Ver la política específica en clavera.ar/cookies.'],
			},
			{
				id: '13',
				heading: 'MODIFICACIONES',
				paragraphs: [
					'Esta política puede ser actualizada. La versión vigente es la publicada en clavera.ar/privacidad, con indicación de su fecha.',
				],
			},
			{
				id: '14',
				heading: 'ÓRGANO DE CONTROL',
				paragraphs: [
					'La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N.° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.',
				],
			},
			{
				id: '15',
				heading: 'LEY APLICABLE',
				paragraphs: ['Ley 25.326 de Protección de los Datos Personales y su Decreto Reglamentario 1558/2001.'],
			},
		],
	},
	en: {
		title: 'Privacy Policy — CLAVERA',
		sections: [
			{
				id: '1',
				heading: 'DATA CONTROLLER',
				paragraphs: [
					'CLAVERA is the name under which Anna Kazanova, CUIT 20-96380996-5, with address at Aráoz 2686, City of Buenos Aires (CABA), Argentina (the "Controller"), carries out this activity. The Controller is the owner of the database.',
					'Contact for exercising your rights: hola@clavera.ar',
					'WhatsApp: +54 9 11 2832-9931',
				],
			},
			{
				id: '2',
				heading: 'DATA WE COLLECT',
				paragraphs: [
					'Through the form hosted on Typeform we collect: name or nickname; email address; phone number / WhatsApp; neighbourhood of residence or interest; type, make and model of your mobility vehicle; answers about usage habits and service preferences.',
					'The site also records technical browsing data: IP address, device and browser type, and the parameters that identify how you arrived at the site (UTM).',
					'We do not collect sensitive data as defined in article 2 of Law 25.326. The site is not directed at anyone under 18.',
					'If you write to us on WhatsApp, Instagram, Facebook or TikTok, we receive your username or number and the content of the message. This data is used only to reply to you and, if you ask, to send you the link to the form.',
				],
			},
			{
				id: '3',
				heading: 'VOLUNTARY NATURE OF THE DATA',
				paragraphs: [
					'Providing any data is voluntary. Not completing the form fields prevents you from taking part in the demand study and from being contacted, but has no other consequence for you.',
				],
			},
			{
				id: '4',
				heading: 'PURPOSES OF PROCESSING',
				letteredList: [
					'To research demand for a secure storage service for bicycles and personal mobility devices in the City of Buenos Aires (CABA).',
					'To define candidate zones, neighbourhoods and locations for the service.',
					'To answer queries and contact you regarding your own request.',
					'Only if you have given specific, additional consent: to send communications about availability, pricing, opening and CLAVERA news by email, WhatsApp or Instagram, according to the channel you choose.',
				],
				closingParagraphs: ['Data is not used to build profiles or for automated decisions.'],
			},
			{
				id: '5',
				heading: 'LEGAL BASIS',
				paragraphs: [
					'Processing is based on your free, express and informed consent (articles 5 and 6 of Law 25.326), given through checkboxes that are not pre-checked.',
				],
			},
			{
				id: '6',
				heading: 'RECIPIENTS AND DATA PROCESSORS',
				paragraphs: ['Data is processed by providers acting as processors on behalf of the Controller:'],
				list: [
					'Typeform SL — hosting and processing of the form.',
					'Google LLC (Google Workspace / Google Sheets) — email and storage.',
					'Cloudflare, Inc. — site delivery and security.',
					'Meta Platforms, Inc. — WhatsApp Business and Instagram, when you choose those contact channels.',
				],
				closingParagraphs: [
					'When you contact CLAVERA through Facebook or TikTok, those messages are processed on the respective platforms under their own privacy policies; CLAVERA does not add that data to its database unless you complete the form.',
					'We do not sell, rent or transfer personal data to third parties for those third parties’ own commercial purposes.',
					'The Controller may transfer the database to the legal entity it incorporates to continue the CLAVERA activity, maintaining the same purposes, scope and rights described here, without any change to the conditions set out in this policy.',
				],
			},
			{
				id: '7',
				heading: 'INTERNATIONAL TRANSFER',
				paragraphs: [
					'The providers named above process data outside Argentina. These transfers take place under contractual clauses that guarantee an adequate level of protection, in accordance with article 12 of Law 25.326, Disposition 60-E/2016 and Resolution AAIP 198/2023.',
				],
			},
			{
				id: '8',
				heading: 'RETENTION PERIOD',
				list: [
					'Demand-study data: 24 months from your last interaction, after which it is deleted or irreversibly anonymised.',
					'Contact data used for commercial communications: until you withdraw your consent.',
					'Unsubscribe record: we keep the minimum indispensable data (email or phone) indefinitely, for the sole purpose of ensuring that whoever unsubscribed is not contacted again.',
				],
			},
			{
				id: '9',
				heading: 'YOUR RIGHTS',
				paragraphs: [
					'You may request access, rectification, updating and deletion of your data at any time, and withdraw your consent, by writing to hola@clavera.ar.',
					'Response times: access, 10 calendar days (article 14(2), Law 25.326); rectification, updating or deletion, 5 business days (article 16(2)).',
					'You have the right to exercise your right of access free of charge at intervals of no less than six months, unless you show a legitimate interest for a shorter interval, in accordance with article 14(3) of Law 25.326.',
				],
			},
			{
				id: '10',
				heading: 'OPTING OUT OF COMMUNICATIONS',
				paragraphs: [
					'Every commercial communication will include a simple, free opt-out mechanism. You may also request it by writing to hola@clavera.ar. The opt-out takes effect within 5 business days.',
				],
			},
			{
				id: '11',
				heading: 'SECURITY',
				paragraphs: [
					'The Controller adopts reasonable technical and organisational measures to protect data against unauthorised access, loss or alteration, including restricted access, two-factor authentication on administrative accounts and encryption in transit.',
				],
			},
			{
				id: '12',
				heading: 'COOKIES',
				paragraphs: ['See the specific policy at clavera.ar/cookies.'],
			},
			{
				id: '13',
				heading: 'CHANGES',
				paragraphs: [
					'This policy may be updated. The version in force is the one published at clavera.ar/privacidad, showing its date.',
				],
			},
			{
				id: '14',
				heading: 'SUPERVISORY AUTHORITY',
				paragraphs: [
					'The AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, as the Supervisory Authority under Law No. 25.326, is empowered to handle complaints from anyone whose rights are affected by non-compliance with the personal-data-protection rules in force.',
				],
			},
			{
				id: '15',
				heading: 'APPLICABLE LAW',
				paragraphs: ['Law 25.326 on the Protection of Personal Data and its regulatory Decree 1558/2001.'],
			},
		],
	},
	ru: {
		title: 'Политика конфиденциальности — CLAVERA',
		sections: [
			{
				id: '1',
				heading: 'ОТВЕТСТВЕННЫЙ ЗА ОБРАБОТКУ ДАННЫХ',
				paragraphs: [
					'CLAVERA — обозначение, под которым Anna Kazanova (Анна Казанова), CUIT 20-96380996-5, с адресом Aráoz 2686, город Буэнос-Айрес (CABA), Аргентина (далее «Ответственный»), ведёт свою деятельность. Ответственный является владельцем базы данных.',
					'Контакт для реализации прав: hola@clavera.ar',
					'WhatsApp: +54 9 11 2832-9931',
				],
			},
			{
				id: '2',
				heading: 'КАКИЕ ДАННЫЕ МЫ СОБИРАЕМ',
				paragraphs: [
					'Через форму, размещённую на Typeform, мы собираем: имя или псевдоним; адрес электронной почты; номер телефона / WhatsApp; район проживания или интереса; тип, марку и модель вашего транспортного средства; ответы о привычках использования и предпочтениях сервиса.',
					'Дополнительно сайт фиксирует технические данные о посещении: IP-адрес, тип устройства и браузера, параметры источника перехода (UTM).',
					'Мы не собираем чувствительные данные в значении ст. 2 Закона 25.326. Сайт не предназначен для лиц младше 18 лет.',
					'Если вы пишете нам в WhatsApp, Instagram, Facebook или TikTok, мы получаем ваше имя пользователя или номер и содержание сообщения. Эти данные используются только для ответа вам и, если вы попросите, для отправки ссылки на форму.',
				],
			},
			{
				id: '3',
				heading: 'ДОБРОВОЛЬНОСТЬ ПРЕДОСТАВЛЕНИЯ ДАННЫХ',
				paragraphs: [
					'Предоставление всех данных является добровольным. Незаполнение полей формы лишает возможности участвовать в исследовании спроса и быть контактированным, но не влечёт для вас никаких иных последствий.',
				],
			},
			{
				id: '4',
				heading: 'ЦЕЛИ ОБРАБОТКИ',
				letteredList: [
					'Исследовать спрос на услугу безопасного хранения велосипедов и устройств персональной мобильности в городе Буэнос-Айрес (CABA).',
					'Определить зоны, районы и потенциальные локации сервиса.',
					'Отвечать на обращения и связываться с вами по поводу вашего собственного запроса.',
					'Только при наличии отдельного и дополнительного согласия: направлять сообщения о доступности, ценах, открытии и новостях CLAVERA по электронной почте, в WhatsApp или Instagram — по каналу, выбранному вами.',
				],
				closingParagraphs: ['Данные не используются для составления профилей или для автоматизированных решений.'],
			},
			{
				id: '5',
				heading: 'ПРАВОВОЕ ОСНОВАНИЕ',
				paragraphs: [
					'Обработка основывается на свободном, явном и осознанном согласии субъекта данных (ст. 5 и 6 Закона 25.326), предоставленном через незаполненные заранее галочки.',
				],
			},
			{
				id: '6',
				heading: 'ПОЛУЧАТЕЛИ И ОБРАБОТЧИКИ ДАННЫХ',
				paragraphs: ['Данные обрабатываются поставщиками, действующими в качестве обработчиков по поручению Ответственного:'],
				list: [
					'Typeform SL — размещение и обработка формы.',
					'Google LLC (Google Workspace / Google Sheets) — почта и хранение.',
					'Cloudflare, Inc. — доставка и безопасность сайта.',
					'Meta Platforms, Inc. — WhatsApp Business и Instagram, если вы выбираете эти каналы связи.',
				],
				closingParagraphs: [
					'Если вы обращаетесь к CLAVERA через Facebook или TikTok, такие сообщения обрабатываются на соответствующих платформах по их собственным политикам конфиденциальности; CLAVERA не вносит эти данные в свою базу, если вы не заполнили форму.',
					'Мы не продаём, не сдаём в аренду и не передаём персональные данные третьим лицам для их собственных коммерческих целей.',
					'Ответственный может передать базу данных юридическому лицу, которое он учредит для продолжения деятельности CLAVERA, с сохранением тех же целей, объёма и прав, описанных здесь, без изменения изложенных в этой политике условий.',
				],
			},
			{
				id: '7',
				heading: 'ТРАНСГРАНИЧНАЯ ПЕРЕДАЧА',
				paragraphs: [
					'Указанные поставщики обрабатывают данные за пределами Аргентины. Такая передача осуществляется на основании договорных условий, гарантирующих надлежащий уровень защиты, в соответствии со ст. 12 Закона 25.326, Постановлением 60-E/2016 и Резолюцией AAIP 198/2023.',
				],
			},
			{
				id: '8',
				heading: 'СРОК ХРАНЕНИЯ',
				list: [
					'Данные исследования спроса: 24 месяца с момента последнего взаимодействия, по истечении которых они удаляются или необратимо обезличиваются.',
					'Контактные данные для коммерческих сообщений: до отзыва согласия.',
					'Реестр отказов: мы храним минимально необходимые данные (email или телефон) бессрочно, исключительно для того, чтобы не связываться повторно с теми, кто отказался от рассылки.',
				],
			},
			{
				id: '9',
				heading: 'ВАШИ ПРАВА',
				paragraphs: [
					'Вы можете в любой момент запросить доступ, исправление, обновление и удаление своих данных, а также отозвать согласие, написав на hola@clavera.ar.',
					'Сроки ответа: доступ — 10 календарных дней (ст. 14, п. 2 Закона 25.326); исправление, обновление или удаление — 5 рабочих дней (ст. 16, п. 2).',
					'Субъект персональных данных вправе бесплатно реализовать право доступа к ним с интервалом не менее шести месяцев, за исключением случаев, когда он подтверждает законный интерес для более частого обращения, в соответствии со ст. 14, п. 3 Закона 25.326.',
				],
			},
			{
				id: '10',
				heading: 'ОТКАЗ ОТ РАССЫЛОК',
				paragraphs: [
					'Каждое коммерческое сообщение будет содержать простой и бесплатный механизм отказа. Отказаться можно также, написав на hola@clavera.ar. Отказ вступает в силу в течение 5 рабочих дней.',
				],
			},
			{
				id: '11',
				heading: 'БЕЗОПАСНОСТЬ',
				paragraphs: [
					'Ответственный принимает разумные технические и организационные меры для защиты данных от несанкционированного доступа, утраты или изменения, включая ограниченный доступ, двухфакторную аутентификацию на административных аккаунтах и шифрование при передаче.',
				],
			},
			{
				id: '12',
				heading: 'COOKIE-ФАЙЛЫ',
				paragraphs: ['См. отдельную политику на clavera.ar/cookies.'],
			},
			{
				id: '13',
				heading: 'ИЗМЕНЕНИЯ',
				paragraphs: [
					'Эта политика может быть обновлена. Действующей является версия, опубликованная на clavera.ar/privacidad, с указанием её даты.',
				],
			},
			{
				id: '14',
				heading: 'НАДЗОРНЫЙ ОРГАН',
				paragraphs: [
					'AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, как Орган контроля по Закону № 25.326, уполномочено рассматривать жалобы и обращения лиц, чьи права нарушены несоблюдением действующих норм о защите персональных данных.',
				],
			},
			{
				id: '15',
				heading: 'ПРИМЕНИМОЕ ПРАВО',
				paragraphs: ['Закон 25.326 о защите персональных данных и регламентирующий его Декрет 1558/2001.'],
			},
		],
	},
};
