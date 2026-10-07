# CLAVERA — Правовая спецификация публичной beta clavera.ar
## Ответы на вопросы по правовой части сайта · версия 3.0 · 23 августа 2026

> **Назначение.** Единый документ с ответами по всем семи блокам вопросов и окончательными текстами правовых страниц. Заменяет предыдущие частичные ответы. Всё, что ниже, готово к внедрению — работу можно продолжать без ожидания дополнительных согласований.
>
> **Плейсхолдеры.** Значения в квадратных скобках `[ ]` будут переданы отдельно перед деплоем. Их отсутствие не блокирует вёрстку.
>
> **Статус правовых текстов.** Тексты `/privacidad`, `/terminos` и `/cookies` приводятся в окончательной редакции. Финальную визу даст аргентинский адвокат; возможные изменения коснутся отдельных формулировок, а не структуры и не набора страниц, поэтому вёрстку можно начинать сейчас.
>
> **Правовая база:** Ley 25.326 (защита персональных данных) и Decreto 1558/2001 · Ley 24.240 (защита потребителей) · Decreto 274/2019 (добросовестность в торговле и реклама) · Ley 11.723 (интеллектуальная собственность) · Disp. AAIP 60-E/2016 и Res. AAIP 198/2023 (трансграничная передача).

---

## §0. СВОДКА ВЕРДИКТОВ

| № | Вопрос | Вердикт |
|---|---|---|
| 1 | Данные ответственного лица | Одобрено — поля и формула футера в §1 |
| 2 | Política de Privacidad | Одобрено в редакции §2 |
| 3 | Единый checkbox согласия | **Требуется корректировка** — заменяется двумя галочками, §3 |
| 4 | Таблица S7 с диапазоном 80 000–150 000 ARS | **Запрещено** в предложенном виде |
| 4b | Таблица S7 без числового диапазона | Одобрено — редакция §4 |
| 5 | Terms: подсудность CABA | **Запрещено** — подсудность по домицилию пользователя, §6 |
| 5b | Terms: «no constituye oferta» | Корректировка — само по себе недостаточно, §6.2 |
| 5c | Terms: рендеры как *imágenes de proyecto* | Одобрено, обязательно, §6.5 |
| 5d | Terms: права на бренд и контент | **Корректировка** — §6.3 |
| 5e | Seña, возврат, Botón de arrepentimiento, индексация — позже | Одобрено при условии §6.4 |
| 6 | Отказ от GA4 и Meta Pixel на beta | Одобрено |
| 6b | Cookie-banner | Не требуется — достаточно ссылки `/cookies` в футере |
| 6c | Текст `/cookies` | Одобрено в редакции §7 |
| 7 | Приоритет испанской версии | Одобрено в предложенной формулировке, §8 |
| — | Раздел с районами | **Сохраняется**, в переработанной конструкции — §5 |
| — | Цены на публичных страницах | Не публикуются, §6.2 |
| — | Дата открытия | Не публикуется, §6.2 |

---

## §1. ОТВЕТСТВЕННОЕ ЛИЦО

Ответственное лицо — физическое лицо. Юридического лица на текущем этапе нет: «CLAVERA» — обозначение, под которым ведётся деятельность, а не наименование компании. Это должно быть отражено во всех правовых текстах и в футере.

| Поле | Значение |
|---|---|
| Responsable | `[Apellido, Nombre]` |
| CUIT | `[__-________-_]` |
| Domicilio a publicar | `[calle, número, CABA]` |
| Email для обращений | `hola@clavera.ar` |
| Titular de la base de datos | То же лицо |
| N° de inscripción RNBD | `[por completar]` — добавляется после регистрации базы |

**Обязательная формула в футере всех страниц, во всех трёх языках:**

```
CLAVERA es la denominación bajo la cual [Apellido, Nombre], CUIT [•],
con domicilio en [•], CABA, desarrolla su actividad.
Contacto: hola@clavera.ar
```

**Не использовать нигде на сайте:** `CLAVERA S.A.S.`, `CLAVERA SRL`, `nuestra empresa`, `nuestro equipo`, `nuestras oficinas`, `fundada en` — и любые аналоги в EN и RU. Всё это подразумевает организацию, которой юридически не существует.

---

## §2. POLÍTICA DE PRIVACIDAD — `/privacidad`

### 2.1 Ответы на заданные вопросы

| Вопрос | Ответ |
|---|---|
| Какие данные собираются | Перечислены поимённо в п. 2 текста. **Правило: политика перечисляет поля, а не категории.** Появилось новое поле в Typeform — политика обновляется в тот же день |
| Обязательные и добровольные поля | Все данные добровольны. Обязательных в правовом смысле нет; есть поля, без которых участие в исследовании невозможно — именно так и сформулировано (требование ст. 6 инц. «d» Ley 25.326) |
| Цель сбора | Четыре разделённые цели, п. 4 |
| Можно ли использовать контакты для новостей и предложений | **Только при отдельном согласии** — вторая галочка, §3 |
| Срок хранения | 24 месяца с последней активности; маркетинговые контакты — до отзыва согласия; список отписок — бессрочно, в минимальном объёме |
| Сервисы-получатели | Typeform, Google Workspace / Sheets, Cloudflare, WhatsApp / Meta. GA4 и Meta Pixel указаны как **не используемые** |
| Трансграничная передача | Да, происходит. Раскрывается прямо, п. 7 |
| Как запросить доступ, исправление, удаление | `hola@clavera.ar`, п. 9 |
| Сроки ответа | Доступ — 10 календарных дней; исправление, обновление, удаление — 5 рабочих дней. Публикуются в тексте |
| Регистрация базы в AAIP: до запуска или в течение месяца | **До запуска.** Подаётся онлайн, бесплатно. Со стороны сайта требуется только место под номер регистрации в тексте политики |

### 2.2 Текст для публикации

```
POLÍTICA DE PRIVACIDAD — CLAVERA
Última actualización: [fecha]

1. RESPONSABLE DEL TRATAMIENTO
CLAVERA es la denominación bajo la cual [Apellido, Nombre], CUIT [__-________-_],
con domicilio en [domicilio], Ciudad Autónoma de Buenos Aires, República
Argentina (en adelante, "el Responsable"), desarrolla su actividad. El
Responsable es titular de la base de datos.
Contacto para el ejercicio de derechos: hola@clavera.ar

2. DATOS QUE RECOLECTAMOS
A través del formulario alojado en Typeform recolectamos:
nombre o apodo; dirección de correo electrónico; número de teléfono / WhatsApp;
barrio de residencia o de interés; tipo, marca y modelo del vehículo de
movilidad; respuestas sobre hábitos de uso y preferencias del servicio.
Adicionalmente, el sitio registra datos técnicos de navegación: dirección IP,
tipo de dispositivo y navegador, y parámetros de origen de la visita (UTM).
No recolectamos datos sensibles en los términos del art. 2 de la Ley 25.326.
El sitio no está dirigido a menores de 18 años.

3. CARÁCTER DE LA PROVISIÓN
La provisión de todos los datos es voluntaria. No completar los campos del
formulario impide participar del estudio de demanda y ser contactado, pero no
genera ninguna otra consecuencia para el titular.

4. FINALIDADES DEL TRATAMIENTO
a) Investigar la demanda de un servicio de guarda segura de bicicletas y
   dispositivos de movilidad personal en la Ciudad Autónoma de Buenos Aires.
b) Definir zonas, barrios y ubicaciones potenciales del servicio.
c) Responder consultas y contactar al titular respecto de su propia solicitud.
d) Únicamente si el titular prestó su consentimiento específico y adicional:
   enviar comunicaciones sobre disponibilidad, precios, apertura y novedades
   de CLAVERA por correo electrónico y/o WhatsApp.
Los datos no se utilizan para elaborar perfiles ni para decisiones automatizadas.

5. BASE LEGAL
El tratamiento se funda en el consentimiento libre, expreso e informado del
titular (arts. 5 y 6 de la Ley 25.326), prestado mediante casillas de
verificación no premarcadas.

6. DESTINATARIOS Y ENCARGADOS DE TRATAMIENTO
Los datos son tratados por proveedores que actúan como encargados por cuenta
del Responsable:
· Typeform SL — alojamiento y procesamiento del formulario.
· Google LLC (Google Workspace / Google Sheets) — correo y almacenamiento.
· Cloudflare, Inc. — entrega y seguridad del sitio.
· WhatsApp / Meta Platforms — canal de mensajería, cuando el titular lo autoriza.
No vendemos, alquilamos ni cedemos datos personales a terceros con fines
comerciales propios de esos terceros.
El Responsable podrá transferir la base de datos a la persona jurídica que
constituya para continuar la actividad de CLAVERA, manteniendo idénticas
finalidades, alcance y derechos del titular, sin que ello implique cambio en
las condiciones aquí informadas.

7. TRANSFERENCIA INTERNACIONAL
Los proveedores mencionados procesan datos fuera de la República Argentina.
Dichas transferencias se realizan al amparo de cláusulas contractuales que
garantizan un nivel adecuado de protección, conforme al art. 12 de la Ley
25.326, la Disposición 60-E/2016 y la Resolución AAIP 198/2023.

8. PLAZO DE CONSERVACIÓN
· Datos del estudio de demanda: 24 meses desde la última interacción del
  titular, vencidos los cuales se eliminan o se anonimizan de forma irreversible.
· Datos de contacto con fines de comunicación comercial: hasta que el titular
  revoque su consentimiento.
· Registro de bajas: conservamos el dato mínimo indispensable (correo o
  teléfono) por tiempo indeterminado, con la única finalidad de garantizar que
  no se vuelva a contactar a quien solicitó la baja.

9. DERECHOS DEL TITULAR
El titular puede solicitar en cualquier momento el acceso, la rectificación,
la actualización y la supresión de sus datos, así como revocar su
consentimiento, escribiendo a hola@clavera.ar.
Plazos de respuesta: acceso, 10 días corridos (art. 14, inc. 2, Ley 25.326);
rectificación, actualización o supresión, 5 días hábiles (art. 16, inc. 2).
El titular de los datos personales tiene la facultad de ejercer el derecho de
acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses,
salvo que acredite un interés legítimo al efecto, conforme al art. 14, inc. 3
de la Ley 25.326.

10. BAJA DE COMUNICACIONES
Toda comunicación comercial incluirá un mecanismo simple y gratuito de baja.
También puede solicitarse escribiendo a hola@clavera.ar. La baja se hace
efectiva dentro de los 5 días hábiles.

11. SEGURIDAD
El Responsable adopta medidas técnicas y organizativas razonables para
proteger los datos contra el acceso no autorizado, la pérdida o la alteración,
incluyendo acceso restringido, autenticación de doble factor en las cuentas
administrativas y cifrado en tránsito.

12. COOKIES
Ver la política específica en clavera.ar/cookies.

13. MODIFICACIONES
Esta política puede ser actualizada. La versión vigente es la publicada en
clavera.ar/privacidad, con indicación de su fecha.

14. ÓRGANO DE CONTROL
La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de
Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y
reclamos que interpongan quienes resulten afectados en sus derechos por
incumplimiento de las normas vigentes en materia de protección de datos
personales.

15. LEY APLICABLE
Ley 25.326 de Protección de los Datos Personales y su Decreto Reglamentario
1558/2001.
```

**Важно по п. 6, последний абзац.** Оговорка о возможном будущем переносе базы данных в юридическое лицо — обязательный элемент, а не формальность. Она публикуется с первого дня и не удаляется ни при каких правках текста.

---

## §3. СОГЛАСИЕ В TYPEFORM

**Вердикт: предложенная единая галочка заменяется двумя.**

**Почему.** Предложенный текст объединяет две разные обработки — участие в исследовании и получение коммерческих сообщений — в одном согласии. Ст. 5 Ley 25.326 требует **свободного** согласия: связанное согласие не оставляет пользователю выбора и при оспаривании признаётся недействительным целиком, вместе с маркетинговой частью. Дополнительно предложенный текст уполномочивает «CLAVERA» — не субъект права, — не покрывает передачу данных за пределы Аргентины и не содержит указания на добровольность предоставления данных.

**Ответ на прямой вопрос «нужны ли отдельные согласия»: да, нужны.**

### Casilla 1 — obligatoria, no premarcada

```
He leído y acepto la Política de Privacidad. Autorizo el tratamiento de mis
respuestas por [Apellido, Nombre], CUIT [•], que opera bajo la denominación
CLAVERA, con la finalidad de investigar la demanda y definir zonas y
ubicaciones del servicio, y acepto que mis datos sean procesados por sus
proveedores fuera de la Argentina conforme al punto 7 de dicha Política.
```

### Casilla 2 — opcional, no premarcada

```
Además, autorizo a [Apellido, Nombre] a enviarme comunicaciones sobre
disponibilidad, precios, apertura y novedades de CLAVERA por correo
electrónico y/o WhatsApp. Puedo revocar esta autorización en cualquier momento
escribiendo a hola@clavera.ar.
```

### Leyenda fija под формой — не галочка

```
Los datos son de provisión voluntaria. No completarlos impide participar del
estudio de demanda y ser contactado, sin ninguna otra consecuencia.
Responsable: [Apellido, Nombre], CUIT [•], [domicilio], CABA. Contacto para el
ejercicio de los derechos de acceso, rectificación y supresión:
hola@clavera.ar.
```

### EN — courtesy

> **Box 1.** I have read and accept the Privacy Policy. I authorise [Name], CUIT [•], operating under the name CLAVERA, to process my responses for the purpose of researching demand and defining service zones and locations, including processing by its providers outside Argentina.
>
> **Box 2.** I also authorise [Name] to send me communications about availability, pricing, opening and CLAVERA news by email and/or WhatsApp. I may withdraw this authorisation at any time by writing to hola@clavera.ar.

### RU — courtesy

> **Галочка 1.** Я ознакомился с Политикой конфиденциальности и принимаю её. Я разрешаю [Ф. И. О.], CUIT [•], действующему под обозначением CLAVERA, обрабатывать мои ответы в целях исследования спроса и определения зон и локаций сервиса, в том числе обработку провайдерами за пределами Аргентины.
>
> **Галочка 2.** Я также разрешаю [Ф. И. О.] направлять мне сообщения о доступности, ценах, открытии и новостях CLAVERA по email и/или WhatsApp. Я могу отозвать это разрешение в любой момент, написав на hola@clavera.ar.

### Технические требования

1. Обе галочки **не отмечены по умолчанию**. Предзаполненная галочка юридически равна отсутствию согласия.
2. **Галочка 2 не блокирует отправку формы.** Если текущая конфигурация Typeform этого не позволяет — это задача на перенастройку, а не основание объединить галочки.
3. **Метка согласия сохраняется в каждой записи.** Обязательные hidden-поля:
   - `consent_v` — версия политики, например `2026-08-23`
   - `consent_ts` — метка времени отправки
   - `marketing_optin` — `true` / `false`
   - `lang` — язык, на котором дано согласие
   Без этих полей согласие недоказуемо.
4. Ссылка `Política de Privacidad` открывается в новой вкладке и доступна **до** отправки формы.
5. Оба Typeform (`ARGCABA` и `latam`) настраиваются идентично.

---

## §4. ТАБЛИЦА S7 — «POR QUÉ CLAVERA»

**Вердикт: в предложенном виде — запрещено. Утверждённая редакция ниже, публикуется сразу.**

### 4.1 Что изменено и почему

| Элемент | Решение | Основание |
|---|---|---|
| Диапазон `80 000–150 000 ARS` | **Убран** | Сравнительная реклама допустима при условии объективности и **проверяемости** (Decreto 274/2019). Числа без документированной выборки этот тест не проходят |
| `contrato anual` | Смягчено до `habitualmente, contrato anual` | Иначе это утверждение о практике всего рынка |
| Заголовок `Cochera de auto` | Заменён на `Cochera de auto (alternativa)` | Снимает риск прочтения таблицы как самоописания CLAVERA |
| Подпись `Valores de referencia de mercado…` | **Убрана** | Без чисел не нужна |
| Строка-дисклеймер под таблицей | **Добавлена, обязательна** | См. ниже |

Ответы на остальные вопросы блока: источник указывать не требуется, так как числа удалены; вопрос о публикации до подтверждения рыночных значений снимается по той же причине; одобрение распространяется на EN и RU при условии идентичной структуры и наличия дисклеймера во всех трёх версиях.

### 4.2 ES — юридически действующая версия

| | Calle / balcón | Cochera de auto (alternativa) | CLAVERA |
|---|---|---|---|
| **Seguridad real** | ✗ | parcial | lugar asignado + acceso con identificación |
| **Costo** | «gratis», hasta el robo | alquiler mensual + garantía y comisión | membresía mensual, sin garantía |
| **Compromiso** | — | habitualmente, contrato anual | mes a mes |
| **Pensado para bicis** | ✗ | ✗ | ✓ diseño específico para micromovilidad |

**Строка непосредственно под таблицей — обязательна, не сворачивается, не переносится в футер:**
```
CLAVERA no es una cochera ni un estacionamiento: es un servicio de depósito y
custodia de bicicletas y dispositivos de movilidad personal por membresía, con
lugar asignado.
```

### 4.3 EN

| | Street / balcony | Car garage (alternative) | CLAVERA |
|---|---|---|---|
| **Real security** | ✗ | partial | assigned spot + identified access |
| **Cost** | "free", until it's stolen | monthly rent + deposit and commission | monthly membership, no deposit |
| **Commitment** | — | usually an annual contract | month to month |
| **Built for bikes** | ✗ | ✗ | ✓ purpose-built for micromobility |

### 4.4 RU

| | Улица / балкон | Автомобильная кочера (альтернатива) | CLAVERA |
|---|---|---|---|
| **Реальная безопасность** | ✗ | частичная | закреплённое место + доступ по идентификации |
| **Стоимость** | «бесплатно» — до первой кражи | месячная аренда + гарантия и комиссия | месячная подписка, без гарантийного депозита |
| **Обязательства** | — | как правило, годовой контракт | из месяца в месяц |
| **Создано для велосипедов** | ✗ | ✗ | ✓ специализированный дизайн для микромобильности |

Цена CLAVERA в таблице отсутствует — это сохраняется во всех версиях.

---

## §5. РАЗДЕЛ «ZONAS» — РАЙОНЫ

**Раздел сохраняется. Меняется конструкция высказывания.**

### 5.1 Принцип

Ограничение по ст. 7–8 Ley 24.240 касается не темы, а модальности. Связывает нас не упоминание района, а утверждение о факте, которого пока нет.

| Конструкция | Статус | Пример |
|---|---|---|
| Утверждение о будущем факте | 🚫 Точное сведение, связывает по ст. 8 | «Primer hub: Chacarita» · «Próximas ubicaciones: Palermo, Belgrano» |
| Описание текущего процесса | ✅ Проверяемо, ни к чему не обязывает | «Estamos relevando el interés en estos barrios» |
| Вопрос к пользователю | ✅ Вне режима ст. 7–8 полностью | «¿En qué barrio la necesitás?» |

Прежняя формула была недопустима из-за слова *próximas*, а не из-за названий районов.

### 5.2 Правило самопроверки — тест на глагол

| ✅ Разрешено рядом с названием района | 🚫 Запрещено рядом с названием района |
|---|---|
| `relevamos` · `estamos evaluando` · `en evaluación` | `abrimos` · `abriremos` · `próximamente` |
| `estudio de demanda en` | `primer hub` · `nuestra ubicación` |
| `¿dónde la necesitás?` | `estaremos en` · `llegamos a` |
| `zonas en evaluación` | `próximas ubicaciones` |

Если рядом с районом стоит глагол из правой колонки — деплой не выпускается.

### 5.3 ES — текст для публикации

```
¿DÓNDE VA A ESTAR CLAVERA?

Todavía no está decidido. Lo define la demanda.

Estamos relevando el interés en estos barrios de la Ciudad de Buenos Aires:

Belgrano · Chacarita · Colegiales · Núñez · Palermo · Palermo Hollywood ·
Villa Crespo

Ninguna zona está confirmada ni tiene fecha. La búsqueda de un local se inicia
en el barrio donde el relevamiento muestre una concentración suficiente de
personas interesadas.

¿Tu barrio no está en la lista? Indicalo igual: también lo contabilizamos.

[ CTA: Decinos dónde la necesitás → ]
```

**Подпись мелким шрифтом под блоком — обязательна:**
```
Barrios en evaluación. No implica compromiso de apertura, fecha ni
disponibilidad.
```

### 5.4 EN

```
WHERE WILL CLAVERA BE?

Not decided yet. Demand decides.

We are currently measuring interest in these Buenos Aires neighbourhoods:

Belgrano · Chacarita · Colegiales · Núñez · Palermo · Palermo Hollywood ·
Villa Crespo

No zone is confirmed and none has a date. The search for premises starts in the
neighbourhood where the survey shows a sufficient concentration of interested
people.

Your neighbourhood not on the list? Tell us anyway — we count it too.

[ CTA: Tell us where you need it → ]

Neighbourhoods under evaluation. No commitment as to opening, date or
availability.
```

### 5.5 RU

```
ГДЕ БУДЕТ CLAVERA?

Пока не решено. Решает спрос.

Сейчас мы измеряем интерес в этих районах Буэнос-Айреса:

Бельграно · Чакарита · Колехиалес · Ньюньес · Палермо · Палермо Голливуд ·
Вилья-Креспо

Ни одна зона не подтверждена и не имеет даты. Поиск помещения начинается в том
районе, где опрос покажет достаточную концентрацию заинтересованных людей.

Твоего района нет в списке? Укажи его всё равно — мы его тоже учитываем.

[ CTA: Скажи, где он тебе нужен → ]

Районы на стадии оценки. Не является обязательством по открытию, срокам или
доступности.
```

### 5.6 Требования к реализации

1. **Порядок районов — строго алфавитный, во всех трёх языках.** Это не оформительское решение: любая другая сортировка читается как очередь открытия и становится утверждением о последовательности. Не выделять ни один район визуально, не помечать как «первый», не нумеровать.
2. **Названия районов не переводятся в ES и EN версиях.** В RU — транслитерация, как в §5.5.
3. **Селектор районов размещается на странице, а не только в Typeform.** Выбор передаётся в Typeform hidden-параметром `barrio`, соответствующее поле формы предзаполняется. Пользователь не отвечает на один вопрос дважды.
4. **Single-select, не мультивыбор**, плюс свободное поле `otro barrio`. Человек хранит велосипед в одном месте; мультивыбор размывает данные.
5. **Свободное поле для более точной геопривязки** — ближайший перекрёсток или почтовый код. Необязательное. Разрешение «район» для аналитики недостаточно.
6. **Счётчики заявок по районам не публикуются.** Ни цифр, ни прогресс-баров, ни «уже N человек в вашем районе». Данные по плотности — внутренний аналитический материал.
7. **Карта — опционально и только схематично.** Допустима заливка контуров районов в иллюстративном стиле. Запрещены: пины, адреса, точки, подписи вида «aquí», любое указание конкретного места.
8. Раздел присутствует во всех трёх языках с идентичным списком районов.

---

## §6. TÉRMINOS Y CONDICIONES — `/terminos`

### 6.1 Подсудность — предложенная формулировка недействительна

Ст. 36 Ley 24.240 in fine: в потребительских отношениях компетентен суд **домицилия пользователя**; условие о противоположном ничтожно. Ст. 37 той же нормы: условие, ограничивающее права потребителя, считается ненаписанным.

Оговорка о подсудности CABA не даёт преимущества, поскольку недействительна, но создаёт риск: наличие абузивного условия в публичных Terms используется в спорах как самостоятельный аргумент. Корректная формулировка — п. 11 текста.

### 6.2 «No constituye oferta» — недостаточно само по себе

Ст. 7 Ley 24.240: оферта, обращённая к неопределённым потребителям, обязывает оферента. Ст. 8: точные сведения в рекламе включаются в договор.

Дисклеймер снимает риск в отношении общих описаний и **не снимает** его в отношении конкретных сведений: цены, даты открытия, конкретного адреса, ёмкости, характеристик безопасности.

**Принятое решение по режиму публикации:**
- **Цены не публикуются** ни на одной публичной странице, включая `/gracias`.
- **Дата открытия не публикуется** ни в каком виде.
- **Конкретный адрес не публикуется.** Районы публикуются в конструкции §5.

Если цена раскрывается внутри Typeform, ей предшествует формула:
```
Precio orientativo de lanzamiento, expresado en pesos argentinos, sujeto a
confirmación al momento de la apertura. No constituye una oferta vinculante.
```

### 6.3 Права на бренд и контент

Три ограничения, обязательные во всех текстах и всех языках:

1. **Товарный знак не зарегистрирован и заявка не подана.** Запрещены: символ **®**, слова *marca registrada*, *registered trademark*, «зарегистрированная торговая марка», а также *marca en trámite* — заявки нет. Использование ® при отсутствии регистрации является самостоятельным нарушением (Decreto 274/2019).
2. **Символ ™ также не использовать** — в аргентинском праве он не имеет содержания и создаёт у пользователя ложное впечатление регистрации.
3. **Авторское право на тексты, дизайн и изображения возникает автоматически** по Ley 11.723 и регистрации не требует — его заявлять можно. Допустимая формулировка — п. 6 текста ниже.

### 6.4 Условие для отложенных пунктов

Отложить seña, возврат, Botón de Arrepentimiento, индексацию и расторжение допустимо **только пока сайт не принимает деньги ни в какой форме** — включая перевод на alias, наличные и «резерв места».

С момента приёма первого платежа одновременно и немедленно требуются: Botón de Arrepentimiento и Botón de Baja de Servicio на первом экране без регистрации и дополнительных шагов (Disp. 954/2025); двухшаговое подтверждение оплаты; полные Terms с порядком возврата; электронная фактура; кнопка Data Fiscal. Промежуточного состояния нет — это следует учесть в архитектуре сейчас, чтобы не переделывать потом.

### 6.5 Подпись под изображениями

Обязательна **у каждого изображения**, визуально связана с ним. Не в футере и не в общих Terms.

- **ES:** `Imagen de proyecto. No representa una instalación existente.`
- **EN:** `Project image. Does not depict an existing facility.`
- **RU:** `Изображение проекта. Не отображает существующий объект.`

### 6.6 Текст для публикации

```
TÉRMINOS Y CONDICIONES DE USO — clavera.ar
Última actualización: [fecha]

1. OBJETO
Este sitio es de carácter informativo. Su finalidad es presentar el proyecto
CLAVERA y relevar el interés del público mediante un formulario voluntario.

2. TITULAR
CLAVERA es la denominación bajo la cual [Apellido, Nombre], CUIT [•], con
domicilio en [•], CABA, desarrolla su actividad.
Contacto: hola@clavera.ar

3. AUSENCIA DE OFERTA CONTRACTUAL
La información publicada tiene carácter general e informativo y no constituye
una oferta contractual vinculante. Las condiciones definitivas del servicio,
incluidos precios, alcance y contrato de membresía, se publicarán al momento
de la apertura y con anterioridad a cualquier contratación.

4. AUSENCIA DE PAGOS
El sitio no acepta pagos, señas, depósitos ni reservas. No se solicitan datos
de tarjetas ni de cuentas bancarias. Ninguna comunicación de CLAVERA solicitará
pagos a través de este sitio en su versión actual.

5. IMÁGENES
Las imágenes publicadas son imágenes de proyecto y no representan instalaciones
existentes. Cada imagen se identifica como tal.

6. CONTENIDOS DEL SITIO
Los textos, el diseño, las imágenes y demás elementos de este sitio son obra de
su titular o se utilizan bajo licencia, y se encuentran protegidos por la Ley
11.723 de Propiedad Intelectual. Queda prohibida su reproducción total o
parcial sin autorización escrita. "CLAVERA" es la denominación con la que el
titular designa su actividad.

7. ENLACES A TERCEROS
El formulario se aloja en Typeform, sujeto a sus propios términos y política de
privacidad. CLAVERA no responde por el contenido ni por las prácticas de sitios
de terceros.

8. DISPONIBILIDAD
El sitio se ofrece "tal como está". No se garantiza su disponibilidad
ininterrumpida ni la ausencia de errores.

9. DATOS PERSONALES
El tratamiento de datos personales se rige por la Política de Privacidad
disponible en clavera.ar/privacidad.

10. IDIOMA
La versión en español (es-AR) es la única con validez legal. Las traducciones
al inglés y al ruso se ofrecen a título informativo; en caso de discrepancia,
prevalece el texto en español.

11. LEY APLICABLE Y JURISDICCIÓN
Estos Términos se rigen por las leyes de la República Argentina. Para toda
controversia resultará competente el tribunal correspondiente al domicilio del
usuario, conforme al artículo 36 de la Ley 24.240.

12. MODIFICACIONES
CLAVERA puede modificar estos Términos. La versión vigente es la publicada en
clavera.ar/terminos, con indicación de su fecha.
```

---

## §7. COOKIES И АНАЛИТИКА — `/cookies`

**Решение не подключать GA4 и Meta Pixel на beta принимается.** Оно снимает необходимость в consent-баннере, устраняет вопрос трансграничной передачи рекламных идентификаторов и убирает Meta из числа получателей данных, при этом источник трафика сохраняется через UTM.

### 7.1 Ответы на заданные вопросы

| Вопрос | Ответ |
|---|---|
| Нужен ли cookie-banner, если нет аналитических и рекламных cookies | **Нет.** В Аргентине нет аналога европейского ePrivacy; Ley 25.326 применяется там, где обрабатываются персональные данные. Достаточно ссылки `/cookies` в футере, без модального окна |
| Какие cookies и localStorage допустимы без согласия | Cookies безопасности Cloudflare (`__cf_bm`, `cf_clearance`); балансировка нагрузки; CSRF-токен; `localStorage` для выбранного языка. Все — без идентификаторов, пригодных для межсайтового отслеживания |
| Требуется ли отдельное согласие на UTM и технические данные | **Нет**, при раскрытии в Política de Privacidad (п. 2). **Жёсткое правило: персональные данные никогда не помещаются в UTM-параметры и query-строки** — ни email, ни телефон, ни имя. URL логируется CDN, сохраняется в реферерах и попадает в чужие логи |
| Нужно ли перечислять cookies самого Typeform | **Нет** — пользователь переходит на внешний домен, где действует политика Typeform. Обязательно другое: Typeform назван в политике как encargado, дана ссылка на его политику, раскрыта трансграничная передача |
| Что обязательно перед подключением GA4 и Meta Pixel | Шесть пунктов в 7.3 |

### 7.2 Текст для публикации

```
POLÍTICA DE COOKIES — clavera.ar
Última actualización: [fecha]

Este sitio utiliza únicamente cookies y almacenamiento local técnicamente
necesarios para su funcionamiento y seguridad. No utilizamos cookies
analíticas, publicitarias ni de seguimiento entre sitios.

Cookies y almacenamiento en uso:
· Cloudflare (__cf_bm, cf_clearance) — protección contra tráfico automatizado y
  entrega segura del sitio. Duración: hasta 30 minutos y hasta 1 año
  respectivamente.
· Almacenamiento local del navegador — recuerda el idioma elegido. No se
  transmite a ningún servidor.

Parámetros de origen (UTM): cuando llegás desde un anuncio o un enlace externo,
el sitio puede registrar el origen de la visita para medir qué canales
funcionan. Estos parámetros no identifican a la persona por sí solos.

Al momento de esta publicación no utilizamos Google Analytics ni Meta Pixel.
Si en el futuro los incorporamos, lo haremos previa solicitud de tu
consentimiento y actualizaremos esta política.

El formulario de interés se aloja en Typeform, que aplica sus propias cookies y
su propia política de privacidad, disponible en su sitio.

Podés bloquear o eliminar cookies desde la configuración de tu navegador. El
bloqueo de las cookies de seguridad puede impedir el acceso al sitio.

Consultas: hola@clavera.ar
```

### 7.3 Чеклист перед будущим подключением GA4 / Meta Pixel

Все шесть обязательны, ни один не откладывается:

1. **Consent-баннер с предварительной блокировкой** — скрипты не загружаются до получения согласия. Баннер «мы используем cookies, ОК» без блокировки согласием не является.
2. **Гранулярность и симметрия** — категории «необходимые / аналитические / рекламные» с раздельным управлением; кнопка «отклонить» визуально равнозначна кнопке «принять».
3. **Таблица cookies** на `/cookies`: имя, провайдер, назначение, срок, категория.
4. **Обновление Política de Privacidad** — новые получатели, цели, сроки хранения, трансграничная передача.
5. **Meta Pixel — advanced matching отключён** до отдельного правового анализа: передача хэшированных email и телефонов переводит Meta из аналитического инструмента в получателя контактных данных.
6. **Обновление заявленных целей в регистрации базы** — они должны совпадать с фактическими.

**Архитектурное требование сейчас:** consent-слой предусмотреть в структуре в виде заглушки и точки подключения, чтобы позже не переписывать логику загрузки скриптов.

---

## §8. ЯЗЫКОВЫЕ ВЕРСИИ

**Вердикт: одобрено в предложенной формулировке.**

Публикуется в футере и в п. 10 Terms:

- **ES:** `La versión en español (es-AR) es la única con validez legal. Las traducciones son de cortesía.`
- **EN:** `The Spanish (es-AR) version is the only legally binding one. English and Russian translations are provided for convenience.`
- **RU:** `Юридическую силу имеет только версия на испанском языке (es-AR). Переводы предоставляются для удобства.`

**Уточнение о пределах действия.** Против потребителя эта клаузула защищает не полностью: ст. 37 Ley 24.240 и ст. 1094–1095 ГК/ТК предписывают толкование в пользу потребителя. Если пользователь принял решение на основании RU- или EN-версии, а та обещала больше испанской, суд с высокой вероятностью применит понимание пользователя. Клаузула распределяет бремя при равнозначных текстах — она не страхует от неточного перевода.

### Правило версионирования — обязательно

1. **Единственный источник истины — ES.** EN и RU порождаются из него, никогда наоборот.
2. **Правки вносятся только в ES**, затем транслируются. Изменение EN или RU без изменения ES запрещено.
3. **Версия и дата** проставляются на всех трёх версиях одновременно и совпадают. Расхождение дат — сигнал рассинхронизации.
4. **Числа сверяются механически** перед каждым деплоем: сроки хранения, сроки ответа, любые количественные значения.
5. **Обратный перевод RU → ES** для трёх правовых страниц перед первой публикацией.

---

## §9. STOP-ЛИСТ ФОРМУЛИРОВОК

*Проверяется машинным поиском по собранной версии сайта перед каждым деплоем — во всех трёх языках, включая alt-тексты, meta-описания, `title`, тексты кнопок и подписи изображений. Проверка глазами не засчитывается.*

### 9.1 Запрещённая лексика — квалификационный риск

Употребление применительно к CLAVERA создаёт риск переквалификации деятельности с несовместимым режимом ответственности и тарифного регулирования.

```
estacionamiento · parking · bike parking · garaje · garage · playa
cochera (кроме колонки «alternativa» в таблице S7) · cochera para bicis
tarifa por hora · precio por hora · por hora
парковка · велопарковка · паркинг · стоянка · гараж · почасовой тариф
```

**Разрешённая и предпочтительная лексика:**
```
guardería segura de bicicletas · depósito y custodia por membresía
lugar asignado · guarda · hub de micromovilidad · centro de micromovilidad
```

### 9.2 Запрещённые утверждения

Ни одно из них не может быть подтверждено на сегодня; каждое становится связывающим по ст. 8 Ley 24.240.

```
Безопасность и страхование:
  «seguro» / «asegurado» / «cobertura» / «tu bici está asegurada»
  «garantizamos» / «100% seguro» / «sin riesgo de robo»
  «responsabilidad total» / «respondemos por tu bici»
  «vigilancia 24 horas» / «monitoreo permanente» / «guardia»

Локация и сроки — ЗАПРЕЩЕНО:
  любой конкретный адрес, номер дома, перекрёсток, пин на карте
  «primer hub: [barrio]» · «nuestra ubicación» · «estaremos en [barrio]»
  «próximas ubicaciones» · «próximamente en [barrio]» · «llegamos a [barrio]»
  «abrimos en [mes]» · «apertura [fecha]» · любой срок открытия
  порядок или очередь открытия районов, нумерация, «primero / luego»
  счётчики заявок по районам
  «первый хаб» / «наш район» / «мы открываемся в» в RU и EN версиях

Локация — РАЗРЕШЕНО:
  перечисление районов как «barrios en evaluación» / «estamos relevando el
  interés en» — в алфавитном порядке, с дисклеймером §5.3
  вопрос «¿en qué barrio la necesitás?»
  схематичная карта с заливкой контуров районов, без пинов и адресов

Цены:
  любая цифра в песо или долларах на публичных страницах
  «desde X» · «menos de X» · «más barato que una cochera»

Марка:
  ® · ™ · «marca registrada» · «marca en trámite» · «registered trademark»

Юридическое лицо:
  «CLAVERA S.A.S.» · «CLAVERA SRL» · «nuestra empresa» · «nuestro equipo»
  «nuestras oficinas» · «fundada en»

Превосходные степени (требуют доказательства по Decreto 274/2019):
  «el primero» · «el único» · «el mejor» · «líder» · «la red más grande»

Социальные доказательства, которых нет:
  количество членов · длина листа ожидания · отзывы · логотипы партнёров
  «ya somos X socios» · «X personas en lista de espera»
```

### 9.3 Условно допустимые формулировки

| Формулировка | Условие |
|---|---|
| `acceso con identificación` | Реализуемо и планируется — допустимо |
| `lugar asignado` | Ядро модели — допустимо |
| `membresía mensual, sin garantía` | Связывает: гарантийный депозит взимать нельзя. Решение принято — допустимо |
| `mes a mes` | Связывает: минимального срока быть не должно. Допустимо |
| `cámaras de seguridad` | Только после подтверждения установки. На beta — не публиковать |
| `24/7` | Только после подтверждения режима доступа. На beta — не публиковать |

---

## §10. ЗАДАЧИ ПО РЕАЛИЗАЦИИ

**Страницы:**
- `/privacidad`, `/terminos`, `/cookies` — тексты §2.2, §6.6, §7.2; три языка; дата в шапке
- Ссылки на все три — в футере каждой страницы, включая `/gracias`
- Идентификационная формула §1 — в футере каждой страницы

**Форма:**
- Две галочки, не отмечены по умолчанию; галочка 2 не блокирует отправку
- Hidden-поля `consent_v`, `consent_ts`, `marketing_optin`, `lang`
- Leyenda под формой (§3)
- Ссылка на политику открывается в новой вкладке, доступна до отправки
- Идентичная конфигурация в обоих Typeform

**Раздел «Zonas»:**
- Текст §5.3–5.5, алфавитный порядок районов
- Селектор на странице, передача `barrio` в Typeform hidden-параметром
- Single-select + свободное поле `otro barrio`
- Необязательное поле точной геопривязки (перекрёсток или почтовый код)
- Без счётчиков, без пинов, без выделения районов

**Технические правила:**
- Персональные данные никогда не попадают в URL, UTM и query-строки
- GA4, Meta Pixel и любые сторонние аналитические скрипты — не подключать
- Consent-слой предусмотреть архитектурно (заглушка и точка подключения)
- Подпись «imagen de proyecto» — у каждого изображения
- Перед каждым деплоем — прогон STOP-листа §9 машинным поиском по трём языкам

**Переводы:**
- ES — источник; EN и RU порождаются из него
- Даты и номера версий на трёх языках совпадают
- Числа сверяются механически перед деплоем

---

## §11. ЧТО БУДЕТ ПЕРЕДАНО ОТДЕЛЬНО

Отсутствие этих значений не блокирует вёрстку — они подставляются перед деплоем.

```
[ ] Apellido y Nombre (responsable)
[ ] CUIT
[ ] Domicilio a publicar
[ ] N° de inscripción RNBD — добавляется в §2.2 после регистрации
[ ] Финальная виза адвоката по трём правовым текстам
[ ] Дата публикации для полей «Última actualización»
```

---

*Документ версии 3.0. Заменяет все предыдущие ответы по правовой части. Следующая версия — после визы адвоката либо при изменении статуса товарного знака или формы ведения деятельности.*
