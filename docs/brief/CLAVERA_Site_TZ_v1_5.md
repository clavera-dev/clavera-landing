# CLAVERA — Сайт: полное техническое задание и контент-база (v1.5)

**Дата:** 18 августа 2026
**Статус:** действующая редакция. Заменяет CLAVERA_Landing_Content v1.0 / v1.1 / v1.3 и Landing_TZ v1.4 полностью.
**Владелец документа:** Anna (product owner). **Исполнитель:** разработчик + 3D-визуализатор.
**Объём v1.5:** три страницы-продукта — потребительский лендинг (B2C), страница для девелоперов (B2D) и страница для владельцев кочер и общественных пространств (B2P, микро-хаб 10–20 мест).
**Приоритет источников:** этот файл → юр. заключение v1.2 → CLAVERA Storage Architecture v2.1 → Pricing v1.0 → BikeHub_Unit_Model_USD.xlsx. При конфликте выигрывает документ выше по списку; расхождение фиксируется в Приложении Д и устраняется в следующей версии.

> **Назначение лендинга.** Не продажа. **Валидация спроса и цены до подписания аренды.**
> Успех = ≥30 оплаченных невозвратных депозитов при известном CPL и известной конверсии по каждой ценовой точке.
> Всё, что не служит этой цели, из v1 удаляется.

---

## §0.1 Changelog v1.4 → v1.5

| # | Изменение | Причина |
|---|---|---|
| 1 | **География восстановлена и разделена на два класса каналов.** Palermo, Palermo Hollywood, Belgrano и Núñez возвращены — но как зоны **asset-light каналов** (кочеры, микро-хабы, девелоперы), не как зоны поиска флагманского galpón | Palermo/Belgrano закрыты по ставке **ground-floor local comercial**. Кочера в subsuelo, revenue-share и договор с девелопером имеют принципиально другую структуру издержек, поэтому те же районы через эти каналы открыты. Раздел §10.1 |
| 2 | **Добавлена страница `/desarrolladores`** (B2D) — полное ТЗ, Часть XIII | Девелоперский трек асимметричен и **time-sensitive**: после сдачи объекта гараж дробится на индивидуально титулованные *unidades complementarias*, и собрать смежный блок становится почти невозможно |
| 3 | **Добавлена страница `/espacios`** (B2P) — полное ТЗ, Часть XIV, включая продуктовую концепцию **микро-хаба на 10–20 мест** | Ley 6779 (январь 2025) снял 10%-й тарифный потолок для велосипедов из Ley 4827 — впервые велохранение внутри кочеры стало экономически интересно её владельцу. Это окно для asset-light входа |
| 4 | Введён **стандарт «Punto»** — 8 неотчуждаемых гейтов, которые партнёрское помещение обязано пройти, чтобы получить бренд CLAVERA | Обещание безопасности — ядро бренда. В чужом помещении контроль частичный, а репутационный удар при краже полный |
| 5 | Введено **правило защиты сущности**: B2B-страницы не индексируются в фазе валидации, Tier-2 лексика ограничена притяжательной конструкцией (`tu cochera`, никогда `nuestra cochera`) | иначе поисковые и ответные системы начнут описывать CLAVERA как estacionamiento, что разрушает и позиционирование, и юр. рамку |
| 6 | Три независимые воронки, три CRM-пайплайна, три набора UTM. **B2B-лиды не входят в зачёт go/no-go по 30 депозитам** | смешение воронок делает главную метрику нечитаемой |
| 7 | Расширен список `barrio` в форме B2C и в гео-таргетинге | сбор карты спроса не должен ограничиваться зонами размещения |
| 8 | Добавлено Приложение Е — внутренний реестр девелоперских кандидатов (не публикуется) | Humboldt 1339/1345, Palpa 3524, Paraguay 5400, Zapata 200 |

## §0.1b Changelog v1.1 → v1.4

| # | Изменение | Причина |
|---|---|---|
| 1 | Формат документа изменён с «контент-база» на **полное ТЗ**: добавлены части III–XII (рендеры, форма и данные, многоязычность, SEO, GEO, AEO, техтребования, аналитика, юр. страницы, приёмка) | контента недостаточно для сборки продакшн-версии |
| 2 | **Исправлена формулировка скидки.** Запрещено: `precio preferencial del 20% sobre el precio de lista`. Обязательно: `20% de descuento sobre el precio de lista` | в прототипе смысл был инвертирован — читалось как «20% от списочной» или «+20%» |
| 3 | **Удалено любое упоминание страхования.** FAQ про страховку переписан; фраза о «compañías asociadas» запрещена до полиса на руках | Ley 24.240 art. 8: реклама обязывает оферента. Полиса нет |
| 4 | **24/7 разжижён:** блок преимуществ расширен с 4 до 8 равновесных пунктов, из hero убран, сноска расширена до «según el hub» | обещание 24/7 фиксировало kill-criterion и лишало гибкости на аренде |
| 5 | **Введён §0.6 «Правило доказуемости»**: числа на сайте только измеренные или нормативные. Удалены `40 s` и безадресные `10 min` | «40 s» опубликовано до теста T6 (проходимость 1,20–1,30 м ещё не проверена) |
| 6 | **Восстановлен блок сравнения (S7)** с якорем cochera 80 000–150 000 ARS **без раскрытия цены CLAVERA** | «−20%» без якоря не имеет смысла; двухволновая схема при этом сохраняется |
| 7 | **Добавлен блок рендеров (S8) и Часть III** — полный бриф на 3D, включая обязательную маркировку и геометрическую сверку с Storage Architecture v2.1 | рендеры без маркировки = publicidad engañosa (объекта не существует) |
| 8 | **Ценовой A/B переведён на скрытое поле + вторую волну.** На странице цены нет, вариант присваивается при загрузке и пишется в заявку | в прототипе вариант негде было зафиксировать → тест цены был технически невозможен |
| 9 | **Форма сокращена** с 7 полей до 4 видимых. WTP-вопрос перенесён в Typeform (van Westendorp) | 7 полей на lead-форме при задаче «минимальный CPL» — прямая потеря конверсии |
| 10 | **География исправлена:** убран Belgrano, добавлены Paternal и Almagro; Palermo сохранён как зона спроса, но не как зона размещения | Palermo Hollywood PB закрыт как категория (~23 810 ARS/м²/мес, +46% к потолку) |
| 11 | **Многоязычность сохранена и регламентирована:** ES-AR канон, EN и RU — вторичные, с обязательной сегментацией лидов по языку и правилом ≥70% ES в зачёте go/no-go | RU-трафик без сегментации воспроизводит диаспорную выборку, забракованную на 11 ответах |
| 12 | Добавлена **страница «Gracias» (S15)** как место раскрытия цены, старта опроса и WhatsApp-канала | опрос конкурировал с основной конверсией за клик |
| 13 | §9 «Dónde» переписан: «строим карту спроса до выбора адреса» вместо «Primer hub: Chacarita» | активных кандидатов ноль; формулировка прототипа честнее и сильнее |
| 14 | Приложение Б пересчитано: founding-когорта 40 мест × −20% × 24 мес поднимает требование по продаваемой ёмкости с ~110 до **~118 мест** | требование выводилось при допущении единой ставки для всей базы |
| 15 | Добавлены Приложение В (терминологический словарь ×4 языка) и Приложение Г (трассируемость правок к аудиту прототипа) | контроль исполнения |

---

## §0.2 Формат документа

- Испанский текст — **публикуемый копи**, дословно. Правки формулировок без согласования запрещены.
- 🇷🇺 *курсив* — служебный перевод, **на сайт не выводится**.
- `[TBD]` — публиковать запрещено. Реестр — Приложение А.
- `[БЛОКЕР]` — блокирует запуск платного трафика.
- `{ПЕРЕМЕННАЯ}` — подставляется конфигом.

---

## §0.3 Пять блокеров запуска (закрыть до первого потраченного песо)

| # | Блокер | Раздел | Признак закрытия |
|---|---|---|---|
| B1 | Формулировка скидки | S11 | На странице `20% de descuento sobre el precio de lista` |
| B2 | Любое обещание страхования | S12 FAQ-05 | Слов *seguro / asegurado / cobertura* нет вне разрешённой формулировки |
| B3 | Политика конфиденциальности (Ley 25.326) | Часть XI | Страница `/privacidad` опубликована, ссылка в форме и футере |
| B4 | Домен `clavera.ar` + верификация в Meta | Часть IX | Прод на clavera.ar, домен верифицирован в Business Manager |
| B5 | Скрытое поле ценового варианта + события аналитики | Часть IV, X | В тестовой заявке присутствуют `price_variant`, UTM, `lang` |

---

## §0.4 Целевая аудитория

Владельцы велосипедов и e-bike **среднего и выше среднего** ценового класса: транспорт от ~800 000 ARS, e-bike 2–4 млн ARS, cargo. Референс тона — уровень бренда транспорта клиента, **не** «народный велопаркинг».

Три ядра:
1. **Резидент старого фонда** — маленький лифт, нет кладовой, велосипед на балконе.
2. **Владелец e-bike / cargo** — транспорт физически не поднимается в квартиру, стоимость сопоставима с мотоциклом.
3. **Ежедневный коммьютер** — трение доставания важнее цены.

Не целевые в v1: курьеры и delivery-платформы (отдельный B2B-поток, другой лендинг), туристы, владельцы мотоциклов.

---

## §0.5 Юридические ограничения лексики (обязательно)

Источник: юр. заключение v1.2. Три уровня.

**Tier 1 — запрещено везде** (копи, meta, alt, ARIA, URL, имена файлов, тексты объявлений, посты, ответы в DM):
`estacionamiento`, `estacionamiento de bicicletas`, `parking`, `bike parking`, `bicicletero municipal`, `garaje`, `cochera` (как самоописание), `playa`, `tarifa por hora`, `por hora`, `guardacoches`.

**Tier 2 — только в отрицании/сравнении/притяжательной конструкции, с письменным ОК юриста:**
1. Упоминание `cochera de auto` в сравнительной таблице S7. Формулировка фиксирована и не переписывается.
2. На странице `/espacios` (Часть XIV) слово `cochera` допустимо **исключительно как описание актива собеседника**: `tu cochera`, `su cochera`, `la cochera que hoy alquilás`. Запрещено в любой конструкции, где оно характеризует услугу CLAVERA: `nuestra cochera`, `cochera CLAVERA`, `cochera para bicicletas` — Tier 1.

**Правило защиты сущности `[БЛОКЕР]`.** Определение CLAVERA (`guardería segura de bicicletas y movilidad personal por membresía`) идентично на всех трёх страницах и во всех языках. Ни на одной странице не появляется конструкция, в которой CLAVERA является кочерой, гаражом или эстасионамьенто. Нарушение этого правила ломает одновременно позиционирование, юр. рамку (рубро *depósito/guarda*, а не *estacionamiento*) и AEO-сущность.

**Tier 3 — рекомендуемое ядро:**
`guardería segura de bicicletas`, `guarda segura`, `depósito y custodia por membresía`, `lugar asignado`, `hub de micromovilidad`, `infraestructura urbana de guarda`, `resguardo`, `socio`, `membresía`.

**Запрещённые обещания (любой формулировкой):**
- полная ответственность, гарантия от кражи, любые страховые суммы, `[TBD]` до полиса;
- «сухо и климатизировано» с указанием параметров (%, °C) — только качественно;
- часы доступа без оговорки `según el hub`;
- любые сроки открытия и адреса до подписания аренды;
- любое сравнение с веломагазинами и бесплатными муниципальными guarderías.

**Приём платежей** (вторая волна): обязателен `Botón de arrepentimiento` (Disp. 954/2025) и двухшаговое подтверждение. Первая волна денег не принимает.

---

## §0.6 Правило доказуемости утверждений `[БЛОКЕР]`

Каждое **число** и каждое **утверждение о свойствах объекта** на сайте относится к одному из классов:

| Класс | Определение | Можно публиковать |
|---|---|---|
| **М** — измеренное | подтверждено обмером, тестом или счётом | да, с внутренней ссылкой на протокол |
| **Н** — нормативное | следует из нормы (Код застройки, закон) | да |
| **Р** — рыночное | подтверждено ≥3 независимыми наблюдениями рынка | да, с диапазоном, без точной цифры |
| **О** — оценочное | допущение модели, экспертная оценка | **нет** |

Следствия для v1:
- `40 s para retirar tu bici` — класс О (тест T6 не проведён) → **удалено**;
- `10 min que podés recuperar` — класс О → **переформулировано качественно**, вернётся числом после опроса при n ≥ 100 с пометкой источника;
- `0,60 m por bicicleta`, `acceso independiente sin mover otras bicis` — класс Н → **разрешено**;
- `cochera 80 000–150 000 ARS` — класс Р → **разрешено диапазоном**;
- `seco` — класс М (первичный гейт, Roseti 530 закрыт по влажности) → **разрешено качественно**, без цифр.

---

# ЧАСТЬ II · АРХИТЕКТУРА СТРАНИЦЫ И КОНТЕНТ

## §1 Карта секций

| id | Секция | Роль | Приоритет | Anchor |
|---|---|---|---|---|
| S1 | Hero | Позиционирование + первичный CTA | P0 | `#top` |
| S2 | El problema | Активация боли | P0 | `#problema` |
| S3 | Ocho pilares | Продукт как 8 равновесных свойств | P0 | `#solucion` |
| S4 | Cómo funciona | Снятие трения «а как это вообще» | P1 | `#works` |
| S5 | Qué podés guardar | Квалификация транспорта | P1 | `#vehiculos` |
| S6 | Seguridad y acceso | Главное возражение | P0 | `#seguridad` |
| S7 | Comparación | **Ценовой якорь без цены** | P0 | `#comparacion` |
| S8 | Cómo se ve un hub (рендеры) | Доверие, премиальность | P0 | `#hub` |
| S9 | Para quién / casos | Самоидентификация | P2 | `#casos` |
| S10 | Zonas | Сбор гео-спроса | P0 | `#zonas` |
| S11 | Socios Fundadores + форма | **Конверсия** | P0 | `#fundadores` |
| S12 | FAQ | Снятие остаточных возражений + AEO | P0 | `#faq` |
| S13 | Encuesta (тизер) | Вторичная конверсия | P2 | `#encuesta` |
| S14 | Footer + legales | Юр. обязательное | P0 | — |
| S15 | `/gracias` | **Раскрытие цены, опрос, WhatsApp** | P0 | отдельный URL |

Порядок секций фиксирован. Перестановка S7 и S8 допустима по итогам A/B верстки.

## §1.1 Карта страниц сайта (v1.5)

| URL | Аудитория | Роль | Индексация | Ссылка из главной | ТЗ |
|---|---|---|---|---|---|
| `/` | B2C — владельцы транспорта | сбор лидов и депозитов, ценовой тест | index | — | Часть II |
| `/gracias` | B2C | раскрытие цены, опрос | **noindex** | после отправки формы | S15 |
| `/desarrolladores` | B2D — девелоперы, застройщики, архитекторы | заявки на смежный блок в новостройке до сдачи | **noindex в фазе 1** | футер | **Часть XIII** |
| `/espacios` | B2P — владельцы кочер, консорцио, коммерческие помещения | заявки на микро-хаб 10–20 мест по revenue-share | **noindex в фазе 1** | футер | **Часть XIV** |
| `/privacidad`, `/terminos`, `/cookies` | все | юр. обязательное | index | футер | Часть XI |

**Правила разделения `[БЛОКЕР]`:**
1. B2B-страницы **не появляются в основной навигации**. Только в футере, мелким шрифтом, в блоке `Para propietarios y desarrolladores`. Причина: любой элемент в главном меню, ведущий не к конверсии, снижает конверсию.
2. **`noindex` в фазе 1** (до закрытия go/no-go по B2C). Причина — §0.5, правило защиты сущности: пока потребительская сущность не закреплена в индексе, страницы с лексикой `cochera` и `desarrollo inmobiliario` рискуют переопределить, чем является CLAVERA. Индексация включается в фазе 2 вместе с гео-страницами.
3. **Трафик на B2B-страницы приводится адресно:** прямые ссылки в письмах, LinkedIn, брокерам, в сообщениях владельцам. Не через рекламу в гео CABA.
4. **Три независимые воронки.** Отдельные формы, отдельные пайплайны CRM, отдельные UTM-префиксы (`b2c-`, `b2d-`, `b2p-`). B2B-заявки **не входят** в зачёт порога 30 депозитов.
5. Язык B2B-страниц — **только es-AR**. EN/RU версий не делать: аудитория локальная и профессиональная.

---

## S1 · Hero

**ES:**

> `eyebrow:` GUARDA SEGURA · BUENOS AIRES
>
> # Tu bici merece un lugar seguro en la ciudad.
>
> CLAVERA es una guardería segura de bicicletas y movilidad personal por membresía. Tu lugar asignado, acceso digital y vigilancia, a minutos de tu casa.
>
> Dejá de subir la bici por el ascensor. Dejá de dejarla en la calle.

🇷🇺 *Твой велосипед заслуживает надёжного места в городе. CLAVERA — безопасное хранилище велосипедов и персональной мобильности по подписке. Закреплённое место, цифровой доступ и охрана, в паре минут от дома. Хватит поднимать велосипед в лифте. Хватит оставлять его на улице.*

**CTA основной:** `Quiero mi lugar` → `#fundadores`
**CTA вторичный:** `Ver cómo funciona` → `#works`

**Микро-бейджи под CTA (ровно три, порядок фиксирован):**
`Lugar asignado` · `Ingreso controlado` · `Cerrado y seco`

> **Изменение против прототипа `[БЛОКЕР по §0.6]`:** бейдж `Acceso personal 24/7¹` из hero **удалён**, а крупный визуальный блок `ACCESO 24/7` из hero-зоны **удалён**. 24/7 живёт только в S3 (пилон 3) и S6, с оговоркой. Причина: обещание круглосуточного доступа сейчас является жёстким требованием к арендуемому объекту и к консорцио; вынесенное в hero, оно превращается в центральное обещание бренда и лишает права взять сухой галпон с доступом 06:00–24:00.

**Правила верстки hero:** текст в HTML (не в изображении); LCP-элемент — заголовок либо hero-рендер с `fetchpriority="high"`; высота первого экрана такова, что основной CTA виден без скролла на 375×667.

---

## S2 · El problema

**ES:**

> `eyebrow:` LA CIUDAD CAMBIÓ
>
> ## Cada vez más bicis. Cada vez menos lugar para guardarlas.
>
> En los edificios de Buenos Aires no hay lugar seguro para una bici, mucho menos para una e-bike o una cargo. La calle suma candados, óxido y riesgo. El departamento suma ascensores, pasillos y espacio perdido. Las opciones informales están llenas, no dan comprobante y no asumen ningún compromiso.
>
> **La ciudad se llenó de bicis. Los edificios no cambiaron.**

🇷🇺 *Всё больше велосипедов. Всё меньше места, где их держать. В домах Буэнос-Айреса нет безопасного места для велосипеда — тем более для e-bike или карго. Улица — это замки, ржавчина и риск. Квартира — это лифты, коридоры и потерянное место. Неофициальные варианты забиты, не дают квитанции и не несут обязательств. Город наполнился велосипедами. Дома не изменились.*

**Числовой блок — заменён `[БЛОКЕР по §0.6]`:**

Прототип содержал `10 min` и `40 s`. Оба удаляются. Вместо них — качественная пара:

> **Cada salida** empieza con el ascensor, el pasillo y la puerta.
> **Cada regreso** termina igual.
> 🇷🇺 *Каждый выезд начинается с лифта, коридора и двери. Каждое возвращение заканчивается тем же.*

**Отложенный возврат чисел:** после опроса при n ≥ 100 публикуется одна цифра — среднее самоотчётное время на извлечение велосипеда — с подписью `Encuesta CLAVERA, {N} respuestas, {mes} 2026`. Цифра про скорость операций внутри хаба не публикуется до протокола теста T6.

---

## S3 · Ocho pilares

Задача блока — **распределить обещания так, чтобы ни одно не несло вес бренда в одиночку**. Восемь карточек, равный визуальный вес, порядок фиксирован. Сетка 4×2 на десктопе, 2×4 на планшете, 1×8 на мобиле.

**ES:**

> `eyebrow:` INFRAESTRUCTURA DE BARRIO
>
> ## Siempre el mismo lugar. Siempre listo para vos.
>
> Convertimos un espacio seguro del barrio en infraestructura pensada desde cero para bicicletas y micromovilidad.

| № | Título | Copy ES | 🇷🇺 |
|---|---|---|---|
| 01 | **Lugar asignado** | Con tu nombre, independiente y siempre libre para vos. | Закреплённое место с твоим именем, независимое и всегда свободное |
| 02 | **Acceso digital personal** | QR o código personal. Entrás y salís sin depender de nadie. | Персональный QR или код. Входишь и выходишь ни от кого не завися |
| 03 | **Acceso amplio** | Todos los días, con horario amplio según el hub.¹ | Ежедневно, с расширенным графиком в зависимости от хаба |
| 04 | **Cerrado, seco y limpio** | Sin lluvia, sin humedad de vereda, sin polvo. Mantenimiento periódico. | Закрыто, сухо, чисто. Регулярное обслуживание |
| 05 | **Vigilancia y registro** | Cámaras y registro individual de cada ingreso y egreso. | Камеры и индивидуальная фиксация каждого входа и выхода |
| 06 | **Retiro sin mover otras bicis** | Cada lugar es independiente: sacás la tuya sin tocar la del vecino. | Извлечение без перемещения соседних велосипедов |
| 07 | **Inventario por número de cuadro** | Marca, modelo y número de cuadro registrados al ingresar. | Инвентаризация по номеру рамы |
| 08 | **Membresía mensual** | Sin garantía, sin contrato anual, sin comisión inmobiliaria. | Месячная подписка без гарантийного депозита, годового контракта и риелторской комиссии |

**Сноска ¹ (единственная на странице, полный текст):**

> ¹ El horario definitivo se confirma al abrir cada hub y puede tener restricciones puntuales por mantenimiento o feriados, informadas con anticipación.
> 🇷🇺 *Окончательный график подтверждается при открытии каждого хаба и может иметь точечные ограничения по обслуживанию или праздникам, о которых сообщается заранее.*

**Почему пилон 06 добавлен:** «независимое извлечение» — норма (Código de Edificación 3.8.8.7, шаг 0,60 м) и внутренний стандарт Independent Access Rule, то есть класс Н по §0.6. Это единственное свойство, которое **невозможно** воспроизвести в бесплатной или неформальной альтернативе, и оно не требует ни одного обещания, которое пришлось бы отзывать. Одновременно оно снимает вес с 24/7.

---

## S4 · Cómo funciona

**ES:**

> `eyebrow:` CÓMO FUNCIONA
>
> ## Tres pasos, y la bici deja de ser un problema.

| № | Título | Copy ES | 🇷🇺 |
|---|---|---|---|
| 1 | **Reservá tu lugar** | Dejá tus datos y contanos en qué barrio la necesitás. | Оставь данные и скажи, в каком районе нужно место |
| 2 | **Activá tu acceso** | Registramos marca, modelo y número de cuadro. Recibís tu acceso personal. | Регистрируем марку, модель и номер рамы. Получаешь персональный доступ |
| 3 | **Usala todos los días** | Llegás, dejás la bici en tu lugar y seguís. | Приезжаешь, ставишь велосипед на своё место и идёшь дальше |

> **Заголовок изменён.** Прототип: `De la puerta a la calle en menos de un minuto.` — класс О, удаляется вместе с `40 s`.
> **Аннотация (не публикуется):** инвентаризация рамы в шаге 2 — не бюрократия, а юридический признак *custodia* и основа будущего declared value. Из копи не убирать.

---

## S5 · Qué podés guardar

**ES:**

> `eyebrow:` TU MOVILIDAD, BIEN CUIDADA
>
> ## Diseñado para lo que realmente usás.
>
> Bicicleta urbana · Ruta y MTB · E-bike · Cargo · Plegable · Monopatín eléctrico
>
> Lockers individuales opcionales para casco y equipo. Por seguridad, no se cargan baterías dentro del hub.

🇷🇺 *Городской, шоссейный и MTB, e-bike, карго, складной, электросамокат. Опциональные индивидуальные локеры для шлема и экипировки. Из соображений безопасности батареи внутри хаба не заряжаются.*

**Не упоминать:** мотоциклы, мопеды, зарядку, ремонт, мойку.

**Аналитическая пометка (не публикуется):** cargo занимает 2–3 слота, e-bike требует полувертикали или нижнего яруса. При подсчёте спроса против требования ~118 продаваемых мест (Приложение Б) **cargo-лид ≠ 1 место**. Коэффициенты для сведения: urbana/ruta/plegable = 1,0; e-bike = 1,0 (но премиум-тариф); cargo = 2,5; monopatín = 0,5.

---

## S6 · Seguridad y acceso

**ES:**

> `eyebrow:` SEGURIDAD Y ACCESO
>
> ## Nadie entra de pasada.
>
> Cada socio se identifica. Cada acceso queda registrado. Cada bici está asociada a su marca, modelo y número de cuadro.
>
> - Identificación individual con DNI al asociarte
> - Acceso digital personal, no transferible
> - Cámaras y registro de ingresos y egresos
> - Estructuras de guarda profesionales, fijadas e independientes por lugar — sin bicis apoyadas unas sobre otras
> - Sin carga de baterías dentro del hub
> - Horario amplio, todos los días, según el hub¹

🇷🇺 *Никто не заходит мимоходом. Каждый участник идентифицируется, каждый доступ фиксируется, каждый велосипед привязан к марке, модели и номеру рамы. Индивидуальная идентификация по DNI при вступлении; персональный непередаваемый цифровой доступ; камеры и журнал входов/выходов; профессиональные закреплённые и раздельные конструкции хранения — никаких велосипедов, опирающихся друг на друга; без зарядки батарей внутри хаба; расширенный график ежедневно, в зависимости от хаба.*

**`[TBD]` — не публиковать:** страховое покрытие, declared value, название мониторинговой компании, марки оборудования, число камер, наличие охранника.

> **Изменение против прототипа:** крупный визуальный блок `ACCESO 24/7` из этой секции удаляется; режим доступа проходит последней строкой списка с той же сноской. 24/7 как формулировка **возвращается на сайт только после** письменного подтверждения арендодателя и консорцио по конкретному объекту.

---

## S7 · Comparación `[восстановлено, было утрачено в прототипе]`

Задача — дать **верхний ценовой якорь, не раскрывая цену CLAVERA**. Это единственный способ сделать «−20%» осмысленным в двухволновой схеме.

**ES:**

> `eyebrow:` POR QUÉ CLAVERA
>
> ## Ni la calle, ni un lugar pensado para autos.

| | Calle / balcón | Cochera de auto | **CLAVERA** |
|---|---|---|---|
| **Seguridad** | Candado y suerte | Parcial: espacio compartido, sin lugar propio | Lugar asignado + ingreso controlado + registro |
| **Costo mensual** | «Gratis», hasta el primer robo | 80 000 – 150 000 ARS, más garantía y comisión | Membresía mensual, sin garantía ni comisión |
| **Compromiso** | — | Contrato anual | Mes a mes |
| **Pensado para bicis** | No | No | Sí: cada lugar independiente, retiro sin mover otras bicis |
| **Clima** | Lluvia, humedad, óxido | Variable | Cerrado, seco y limpio |

🇷🇺 *Ни улица, ни место, спроектированное для машин. Колонка «Цена» у CLAVERA намеренно без цифры — якорь ставит колонка cochera.*

**Обязательная подпись под таблицей:**

> Valores de referencia de mercado para cocheras en CABA, {mes} 2026.
> 🇷🇺 *Справочные рыночные значения по кочерам в CABA.*

**Правила `[БЛОКЕР]`:**
1. Ячейка «Costo mensual» у CLAVERA **не содержит числа** ни в одной языковой версии.
2. Слово `cochera` используется **только** как заголовок колонки и только в этой таблице (Tier 2, §0.5). Требуется письменное ОК юриста на публикацию таблицы в этом виде.
3. Диапазон 80 000–150 000 обновляется при каждом квартальном пересмотре рынка; дата в подписи обязательна.
4. Слоган `La mitad de una cochera, al precio de un gimnasio` **из v1 исключён**: при списочной цене 90–100 тыс. арифметика даёт 60–80% кочеры, и утверждение становится ложным (см. Приложение Б, п. 4).

---

## S8 · Cómo se ve un hub CLAVERA (рендеры) `[новая секция]`

**ES:**

> `eyebrow:` EL ESPACIO
>
> ## Así está diseñado un hub CLAVERA.
>
> Cada hub se proyecta con el mismo estándar: lugares independientes, circulación libre, materiales que resisten uso diario.

🇷🇺 *Так спроектирован хаб CLAVERA. Каждый хаб проектируется по единому стандарту: независимые места, свободная циркуляция, материалы, выдерживающие ежедневную эксплуатацию.*

**Обязательная подпись под каждым рендером — дословно, во всех языковых версиях `[БЛОКЕР]`:**

> Imágenes de proyecto. No corresponden a una sede en operación.
> 🇷🇺 *Изображения проекта. Не соответствуют действующему объекту.*
> EN: *Project renderings. They do not depict an operating facility.*

**Почему это блокер:** объекта не существует. Рендер без такой подписи при последующем сборе депозитов — прямой состав publicidad engañosa (Ley 24.240 art. 8) и основание для возврата всех депозитов. Подпись обязана быть в HTML-тексте, не в изображении, размером не менее 12 px, контраст ≥ 4,5:1. Дублируется в `<figcaption>` и в `alt`.

Полный производственный бриф на рендеры — **Часть III**.

---

## S9 · Para quién es / Casos

**ES:**

> `eyebrow:` PARA QUIÉN
>
> ## Si te pasa alguna de estas, CLAVERA es para vos.
>
> - Tu bici vale más que el candado que la cuida — y duerme en el balcón.
> - Tenés una e-bike o una cargo que no entra en el ascensor.
> - Usás la bici todos los días y cada salida empieza con el ascensor.
> - Sos una familia con más bicis que balcón.
> - Tu edificio no tiene bicicletero, o el que hay está lleno.

🇷🇺 *Твой велосипед стоит дороже замка, который его охраняет, — а ночует на балконе. У тебя e-bike или карго, который не влезает в лифт. Ты катаешься каждый день, и каждый выезд начинается с лифта. Вы — семья, у которой велосипедов больше, чем балкона. В твоём доме нет велостоянки, или та, что есть, забита.*

> Из v1.1 удалена формулировка `perdés 10 minutos por viaje` (класс О) и карточка `El commuter: salís en 40 segundos` (класс О).

---

## S10 · Zonas

**ES:**

> `eyebrow:` PRIMEROS HUBS
>
> ## Estamos construyendo el mapa de demanda antes de elegir las ubicaciones.
>
> Nos interesa saber dónde hace falta. Estas son las zonas donde estamos trabajando.
>
> **Chacarita · Villa Crespo · Colegiales · Paternal · Almagro · Palermo · Palermo Hollywood · Belgrano · Núñez**
>
> Cada zona avanza a su ritmo: en algunas buscamos un hub completo, en otras un espacio más chico dentro de un edificio o un espacio existente. Dejá tu pedido y te contamos qué hay disponible en la tuya.

🇷🇺 *Мы строим карту спроса до выбора локаций. Нам важно понять, где это нужно. Зоны, в которых мы работаем: Чакарита, Вилья-Креспо, Колехиалес, Патерналь, Альмагро, Палермо, Палермо-Голливуд, Бельграно, Ньюньес. Каждая зона движется своим темпом: в одних мы ищем полноценный хаб, в других — меньшее пространство внутри здания или уже существующего объекта. Оставь заявку — расскажем, что доступно в твоей.*

**Карта:** схематическая, без адресов и без пинов. Атрибуция картографии обязательна:
`Cartografía: Buenos Aires Data ↗` → `https://data.buenosaires.gob.ar/es/dataset/barrios`

### §10.1 Двухклассовая модель зон `[изменение v1.5, важно]`

В v1.4 Palermo и Belgrano были исключены. Это было верно **для одного канала** и неверно как общий вывод. Уточнение:

Закрыт не район, а **связка «район × канал»**. Palermo Hollywood закрыт как категория на ставке ~23 810 ARS/м²/мес для **ground-floor local comercial** — это на 46% выше потолка CLAVERA. Но три других канала имеют принципиально иную структуру издержек:

| Канал | Что платим | Почему Palermo/Belgrano открываются |
|---|---|---|
| **Ground-floor local comercial** | полная рыночная ставка за витринную площадь | ❌ закрыт в Palermo, Palermo Hollywood, Belgrano, Núñez |
| **Subsuelo / контрафренте** | ставка со скидкой: у площади близкая к нулю ритейл-ценность для других арендаторов | ⚠️ открыт при подтверждении сухости; коэффициент subsuelo-дисконта — критерий Site Score v3.0 |
| **Микро-хаб в кочере / общественном пространстве (B2P)** | **фиксированной аренды нет** — revenue-share | ✅ открыт: издержка привязана к выручке, а не к ставке за м² |
| **Девелоперский блок (B2D)** | долгосрочная аренда/концессия площади, непродаваемой под авто | ✅ открыт: базой служит не рыночная ставка, а альтернативная стоимость непродаваемого машиноместа |

**Итоговая таксономия зон:**

| Зона | Барриос | Флагман (galpón) | Subsuelo | Микро-хаб B2P | Девелопер B2D |
|---|---|---|---|---|---|
| **A — рабочая по всем каналам** | Chacarita, Villa Crespo, Colegiales, Paternal, Almagro | ✅ приоритет | ✅ | ✅ | ✅ |
| **B — только asset-light** | Palermo, Palermo Hollywood, Belgrano, Núñez | ❌ закрыт по ставке | ⚠️ при дисконте и сухости | ✅ **основной канал** | ✅ **основной канал** |
| **C — только сбор спроса** | остальной CABA | ❌ | ❌ | по входящему запросу | по входящему запросу |

**Три следствия, которые надо принять сознательно:**

1. **Зона B — это в первую очередь спрос, а не площадь.** Плотность премиального транспорта, доходы и доля арендаторов в Palermo и Belgrano выше, чем в зоне A. Раньше это было бесполезно, потому что нечего было предложить. Теперь есть: 10–20 мест по revenue-share.
2. **Микро-хаб в зоне B меняет природу валидации.** Флагман валидируется депозитами — обещаниями. Микро-хаб валидируется **платящими участниками и фактической загрузкой в конкретном баррио**. Это на порядок более сильный сигнал, и он получается без аренды, без habilitación с нуля и почти без CAPEX. Подробно — §14.1.
3. **Порог go/no-go не смягчается.** 30 оплаченных депозитов остаются условием подписания **флагманской аренды**. Микро-хаб — не обход этого гейта, а независимый и более дешёвый способ его пройти: платящий участник в Palermo сильнее депозита в Palermo.

### §10.2 Поле `barrio` в форме (расширено)

Chacarita · Villa Crespo · Colegiales · Paternal · Almagro · Palermo · Palermo Hollywood · Palermo Soho · Belgrano · Núñez · Recoleta · Caballito · Boedo · San Telmo · Otro barrio de CABA · Fuera de CABA

Сортировка: сначала зона A, затем зона B, затем остальные по алфавиту, затем `Otro` / `Fuera`. Порядок значим — он мягко направляет ответы без ограничения.

---

## S11 · Socios Fundadores + форма `[ядро конверсии]`

**ES:**

> `eyebrow:` SOCIOS FUNDADORES
>
> ## Los primeros 40 lugares empiezan acá.
>
> **20% de descuento sobre el precio de lista, garantizado por 24 meses.** Los Socios Fundadores eligen su lugar antes que nadie.
>
> Dejar tus datos no implica ningún pago. Te enviamos el precio de Socio Fundador y la disponibilidad en tu zona.

🇷🇺 *Первые 40 мест начинаются здесь. 20% скидки от списочной цены, гарантированно на 24 месяца. Основатели выбирают место раньше всех. Оставить данные — это не платёж. Мы присылаем цену Основателя и доступность в твоей зоне.*

**Визуальный бейдж:** `−20%` / `24 MESES`

### B1 — исправление формулировки `[БЛОКЕР]`

| Статус | Формулировка |
|---|---|
| ❌ В прототипе | `Precio preferencial del 20% sobre el precio de lista` |
| ✅ Обязательно | `20% de descuento sobre el precio de lista` |
| ✅ Допустимый вариант | `Un 20% por debajo del precio de lista` |

Ошибка меняла смысл на «цена в 20% от списочной» либо «+20% сверх списочной» и стояла в единственной числовой точке оффера. Проверить во **всех трёх** языковых версиях: EN `20% off the list price`, RU *«20% скидки от списочной цены»*.

### Обязательные оговорки под оффером

> El precio de Socio Fundador se define como un 20% por debajo del precio de lista vigente, con actualización trimestral por IPC/ICL, garantizado por 24 meses desde el alta.
> 🇷🇺 *Цена Основателя определяется как 20% ниже действующей списочной цены, с квартальной индексацией по IPC/ICL, гарантированно на 24 месяца с момента подключения.*

**Критично:** скидка формулируется как **процент от списочной цены**, никогда как фиксированная сумма в песо. При инфляции ~30% фиксация в песо на 24 месяца уничтожает юнит-экономику.

### Поля формы

**Видимые — 4 (было 7):**

| # | Поле | Тип | Обяз. | Label ES |
|---|---|---|---|---|
| 1 | contacto | tel / email, один переключатель | ✅ | `WhatsApp o email` |
| 2 | barrio | select | ✅ | `¿En qué barrio la necesitás?` |
| 3 | tipo_vehiculo | select | ✅ | `Tipo de vehículo` |
| 4 | nombre | text | ❌ | `Nombre (opcional)` |

**Значения `barrio`:** полный список и порядок — §10.2 (16 значений, зона A → зона B → прочие → `Otro` / `Fuera de CABA`)
**Значения `tipo_vehiculo`:** Bici urbana · Ruta / MTB · E-bike · Cargo · Plegable · Monopatín eléctrico · Más de una

**Удалено из формы:**
- `Marca y modelo` → переносится на онбординг (нужен для declared value, не для лида);
- **вопрос о WTP** → переносится в Typeform, где живёт van Westendorp.

**Обоснование удаления WTP `[БЛОКЕР по методологии]`:** пять диапазонов, начинающихся с `menos de 50.000`, (а) якорят вниз, (б) раскрывают ценовой коридор и тем частично отменяют смысл «цены на странице нет», (в) дают одноразовый заявленный WTP вместо четырёхвопросной шкалы van Westendorp, которая всё равно запланирована. Один слабый инструмент, поставленный перед сильным, портит оба.

**Скрытые поля — обязательны все `[БЛОКЕР B5]`:**

`price_variant` · `lang` · `utm_source` · `utm_medium` · `utm_campaign` · `utm_content` · `utm_term` · `referrer` · `landing_version` (= `1.4`) · `session_id` · `ts_utc` · `device` · `consent_version`

**Согласие (чекбокс, по умолчанию снят, обязательный):**

> Autorizo a CLAVERA a contactarme por WhatsApp o email sobre disponibilidad, precio y novedades de la membresía. Podés pedir la baja en cualquier momento escribiendo a hola@clavera.ar. Ver <u>Política de Privacidad</u>.
> 🇷🇺 *Разрешаю CLAVERA связаться со мной по WhatsApp или email по вопросам доступности, цены и новостей о членстве. Отписаться можно в любой момент письмом на hola@clavera.ar. См. Политику конфиденциальности.*

> Формулировка расширена против прототипа: прежняя (`solo para contactarme sobre disponibilidad y la membresía`) юридически запрещала любую последующую рассылку, включая вторую волну с новостями. Ссылка на политику обязательна — это блокер B3.

**Кнопка:** `Ver mi precio de Socio Fundador →`
**После отправки:** редирект на `/gracias` (S15). Никакого inline-сообщения об успехе — редирект нужен для чистого события конверсии и для раскрытия цены.

### Счётчик мест

Прототип счётчика не содержит — это честно и правильно. Если счётчик вводится, он обязан отражать **реальный остаток** из CRM. Фиктивный счётчик — риск по Ley 24.240 и разрушение доверия премиального сегмента. Формулировка при вводе: `Ser Socio Fundador — quedan {N} lugares`.

---

## S12 · FAQ

Двойное назначение: снятие возражений + **основной источник для AEO** (Часть VIII). Отсюда требования: ответ начинается с прямого ответа в первом предложении, длина ответа 25–60 слов, разметка `FAQPage` обязательна, контент в серверном HTML (не подгружается JS).

**ES:**

> `eyebrow:` PREGUNTAS FRECUENTES
>
> ## Lo importante, sin letra chica.

| # | Pregunta | Respuesta ES | 🇷🇺 |
|---|---|---|---|
| 01 | ¿Qué es CLAVERA? | CLAVERA es una guardería segura de bicicletas y movilidad personal por membresía en Buenos Aires. Cada socio tiene un lugar asignado, acceso digital personal y registro de cada ingreso. No es un taller ni un lugar para autos. | Что такое CLAVERA |
| 02 | ¿Puedo entrar cuando quiera? | Sí. Tenés acceso digital personal y horario amplio, todos los días. El horario definitivo de cada hub se confirma al abrir y puede tener restricciones puntuales por mantenimiento o feriados, informadas con anticipación. | Режим доступа |
| 03 | ¿Cuánto cuesta? | Te mostramos el precio de Socio Fundador al dejar tus datos, junto con la disponibilidad en tu zona. Sin compromiso y sin pago. El precio de Socio Fundador es un 20% por debajo del precio de lista, garantizado por 24 meses. | Цена |
| 04 | ¿Qué pasa si me quiero dar de baja? | La membresía es mensual. Avisás con 30 días de anticipación y se da de baja sin penalidades. | Отписка |
| 05 | ¿Necesito tener mi bici asegurada? | No. Recibimos bicicletas aseguradas y no aseguradas. Al ingresar registramos marca, modelo y número de cuadro. | Страховка |
| 06 | ¿Puedo cargar mi e-bike ahí? | No. Por seguridad, no se cargan baterías dentro del hub. | Зарядка |
| 07 | ¿Hacen reparaciones? | No. CLAVERA no es un taller: es infraestructura de guarda. | Ремонт |
| 08 | ¿Guardan autos o motos? | No. CLAVERA es exclusivamente para bicicletas y micromovilidad personal. | Авто/мото |
| 09 | ¿Dónde va a estar el primer hub? | Estamos construyendo el mapa de demanda antes de elegir la ubicación. Las zonas prioritarias son Chacarita, Villa Crespo, Colegiales, Paternal y Almagro. El primer hub abre donde la demanda esté más concentrada. | Локация |
| 10 | ¿Cómo se retira la bici? | Cada lugar es independiente. Retirás la tuya sin mover ninguna otra bicicleta. | Извлечение |

### B2 — исправление FAQ-05 `[БЛОКЕР]`

| Статус | Текст |
|---|---|
| ❌ В прототипе | `No. Recibimos bicicletas aseguradas y no aseguradas. Preparamos una opción de seguro individual con compañías asociadas.` |
| ✅ Обязательно | `No. Recibimos bicicletas aseguradas y no aseguradas. Al ingresar registramos marca, modelo y número de cuadro.` |

Второе предложение прототипа анонсировало продукт, которого нет, при отсутствии единого подписанного соглашения со страховщиком. По Ley 24.240 art. 8 реклама обязывает оферента: анонс «опции страхования» создаёт исполнимое ожидание. Переформулировка самого **вопроса** (`¿Necesito tener mi bici asegurada?` вместо `¿Mi bici está asegurada?`) — удачная находка прототипа, сохраняется: она снимает тему, не создавая обязательства.

**Слова `seguro`, `asegurado`, `cobertura`, `póliza`, `declared value`** не появляются на сайте нигде, кроме разрешённой формулировки FAQ-05, до наличия полиса на руках.

### Прочие правки FAQ

- **FAQ-04:** добавлен срок уведомления **30 дней**. Прототип (`Avisás y listo`) не определял срок — при 24-месячной гарантии цены это открытый вектор споров при оттоке.
- **FAQ-01, FAQ-09, FAQ-10 — новые.** FAQ-01 даёт машиночитаемое определение сущности (критично для AEO). FAQ-09 закрывает «а где это будет» без обещаний. FAQ-10 выносит норму независимого доступа в вопрос, который реально задают.
- **FAQ-08** переформулирован без слова `cochera`: прототип v1.1 спрашивал `¿Es una cochera?`. Отрицательное употребление — Tier 2 и требует ОК юриста; в FAQ оно не нужно, поскольку та же работа делается таблицей S7.

---

## S13 · Encuesta (тизер)

**ES:**

> `eyebrow:` AYUDANOS A DISEÑAR EL PRIMER HUB
>
> ## ¿Cómo usás tu bici en Buenos Aires?
>
> Tres minutos. Nos ayuda a elegir dónde abrir y cómo diseñar el espacio.
>
> `Responder encuesta · 3 min ↗`

🇷🇺 *Помоги спроектировать первый хаб. Как ты пользуешься велосипедом в Буэнос-Айресе? Три минуты. Это помогает нам выбрать, где открыться, и как спроектировать пространство.*

**Изменения `[БЛОКЕР по приоритету конверсии]`:**
1. Секция перемещается **ниже FAQ** и получает пониженный визуальный вес (не карточка-баннер, а строка со ссылкой).
2. **Основное место опроса — страница `/gracias`** (S15). Там опрос заполняют квалифицированные лиды, и он не конкурирует за клик с формой.
3. **Проверить язык анкеты `[БЛОКЕР]`:** по ссылке `claveraar.typeform.com/ARGCABA` обязана лежать версия на **риоплатском испанском**. Русская переиспользованная анкета на испаноязычном лендинге воспроизводит ровно ту диаспорную выборку, которая была забракована на 11 ответах. До подтверждения перевода ссылка со страницы снимается.
4. Ссылка получает `?utm_source=landing&utm_content={ubicacion}` для различения «опрос со страницы» и «опрос после заявки».

---

## S14 · Footer

**ES:**

> **CLAVERA**
> Infraestructura urbana de guarda para tu bici.
> Buenos Aires, Argentina.
>
> hola@clavera.ar · Instagram · Facebook
>
> **Para propietarios y desarrolladores:** Proponer un espacio · Para desarrolladores
>
> Política de Privacidad · Términos y Condiciones · Cookies
>
> © 2026 CLAVERA. Todos los derechos reservados.

**Обязательно `[БЛОКЕР B3]`:** ссылки на три юридические страницы. Отсутствие политики конфиденциальности при активной форме сбора персональных данных нарушает Ley 25.326 и с высокой вероятностью приводит к отказам при модерации рекламы в Meta.

**`[TBD]`:** razón social и CUIT — добавляются в футер сразу после регистрации субъекта. До этого — только `hola@clavera.ar` и локация.

---

## S15 · Страница `/gracias` `[новая, критичная]`

Единственное место, где раскрывается цена. Не индексируется (`noindex`), но серверно рендерится.

**ES:**

> ## Listo. Tu lugar está anotado.
>
> ### Tu precio de Socio Fundador: **{PRECIO_FUNDADOR} ARS por mes**
>
> Precio de lista: ~~{PRECIO_LISTA} ARS~~ — como Socio Fundador pagás un 20% menos, garantizado por 24 meses con actualización trimestral por IPC/ICL.
>
> **Qué sigue:**
> 1. Te escribimos por WhatsApp en las próximas 24 horas hábiles.
> 2. Te contamos la disponibilidad en **{BARRIO}** y cómo reservar tu lugar.
> 3. Si querés asegurarte el lugar, se reserva con una seña que se acredita a tu primer mes.
>
> `Escribinos por WhatsApp ahora ↗`
>
> ---
>
> **Una última cosa, y es la que más nos ayuda.**
> Tres minutos de encuesta para entender cómo se mueve la gente en bici en tu barrio.
> `Responder encuesta · 3 min ↗`

🇷🇺 *Готово, место записано. Цена Основателя: {ЦЕНА}. Списочная: {ЦЕНА_ЛИСТА} — как Основатель ты платишь на 20% меньше, гарантированно 24 месяца с квартальной индексацией. Далее: напишем в WhatsApp в течение 24 рабочих часов; расскажем о доступности в {РАЙОН} и как забронировать; при желании место резервируется депозитом, который засчитывается в первый месяц.*

**Правила:**
- `{PRECIO_FUNDADOR}` и `{PRECIO_LISTA}` подставляются **из того же `price_variant`**, что записан в заявку. Расхождение между показанным здесь и присланным во второй волне обнуляет валидность теста.
- Списочная цена показывается **зачёркнутой рядом** с founding-ценой — это единственное разрешённое место публикации списочной цены.
- Упоминание seña — **описательное**, без суммы и без кнопки оплаты. Приём денег — только во второй волне, только после юр. формулировки `botón de arrepentimiento`.
- События: `lead_submit` фиксируется на этой странице, не на кнопке формы.

---

# ЧАСТЬ III · БРИФ НА РЕНДЕРЫ

## §3.1 Общая рамка

**Задача рендеров:** доказать премиальность и продуманность объекта, которого ещё нет, **не создавая ложного впечатления, что он существует**. Это два противоположных требования, и они разрешаются маркировкой (S8) плюс выбором ракурсов: рендер показывает **систему хранения**, а не «наш филиал».

**Дизайн-язык:** бетон, сталь, дерево, матовый чёрный, тёплый LED, минимальная геометрия. Референсы — Apple Store, премиальная промышленная архитектура. Без визуального шума, без людей крупным планом, без брендированных велосипедов реальных производителей.

## §3.2 Геометрическая сверка `[БЛОКЕР]`

Рендеры обязаны быть согласованы с **CLAVERA Storage Architecture v2.1**. Визуализатор получает этот раздел как жёсткие ограничения.

| Параметр | Значение | Источник |
|---|---|---|
| Шаг места (модуль) | **0,60 м** | Código de Edificación 3.8.8.7 |
| Проход двусторонней загрузки | **≥ 2,00 м** в свету | Storage Architecture v2.1, R2 |
| Проход односторонней загрузки | 1,20 м, допустим только при глухой стене или локерах напротив | v2.1, R2 |
| Эвакуационный проход | ≥ 1,80 м, не сужается | v2.1, §6 |
| Основной модуль | поворотная вертикаль, анкерованная в пол | v2.1, R1 / R4 |
| Двухъярус | только в зоне e-bike, только с ассистом подъёма и индивидуальным лотком | v2.1, R4 / §доп. |
| Антресоль / mezzanine | **запрещено изображать** | исключена нормой (лестница не является безопасным доступом) |
| Зарядные станции | **запрещено изображать** | зарядка батарей запрещена |
| Подвижные каретки, скользящие нижние ярусы | **запрещено изображать** | провал Independent Access Rule |
| Велосипеды, опирающиеся друг на друга | **запрещено изображать** | противоречит пилону 06 |

**Правило проверки:** на каждом рендере с рядом мест должно быть визуально считываемо, что **один велосипед извлекается без касания соседних**. Если ракурс этого не показывает — ракурс переснимается.

## §3.3 Шот-лист (6 рендеров, приоритет P0–P2)

| ID | Ракурс | Что должно быть видно | Приоритет | Формат |
|---|---|---|---|---|
| R1 | **Общий вид зала**, взгляд вдоль прохода | ритм вертикальных модулей, ширина прохода, высота, тёплый свет, бетон + сталь | P0 | 16:9 + 4:5 |
| R2 | **Одно место крупно** | закреплённый велосипед на поворотном кронштейне, номерная табличка места, зазор до соседей | P0 | 3:2 |
| R3 | **Тамбур входа** | дверь, панель доступа с QR, камера, единственный вход, ощущение контроля | P0 | 4:5 |
| R4 | **Зона локеров** | ряд индивидуальных локеров для шлема и экипировки, скамья | P1 | 3:2 |
| R5 | **Зона e-bike / cargo** | напольные конструкции для карго, нижний ярус без подъёма, свободный накат | P1 | 16:9 |
| R6 | **Аксонометрия / изометрия зала** | схема зонирования: тамбур, стандарт, e-bike/cargo, локеры, техзона | P2 | 1:1 |

**Не изображать ни на одном рендере:** вывеску с адресом, номер дома, узнаваемый фасад, людей в фокусе, логотипы производителей велосипедов, кофе/лаунж/мастерскую, автомобили, зарядные кабели.

**Опционально и осторожно:** силуэт человека в движении, размытый, спиной, без лица — добавляет масштаб. Не более одного силуэта на кадр, не на P0-рендерах.

## §3.4 Технические требования к поставке

| Параметр | Требование |
|---|---|
| Исходники | 3000 px по длинной стороне, PNG без сжатия, sRGB |
| Продакшн-форматы | AVIF (основной) + WebP (fallback), три ширины: 640 / 1280 / 1920 px |
| Вес одного изображения | ≤ 180 КБ в 1280 px |
| Имена файлов | `clavera-hub-{ru|тема}-{id}.avif`, только латиница, дефисы. **Запрещены Tier-1 слова в имени файла** |
| `loading` | `lazy` для всех, кроме hero-рендера |
| `alt` | обязателен, см. §3.5 |
| `<figcaption>` | обязателен, текст маркировки из S8 |
| Соотношения | поставляются в двух кропах: горизонталь для десктопа, 4:5 для мобилы |
| Тёмная тема | если сайт поддерживает — второй сет с холодной заливкой либо CSS-фильтр не применять к рендерам |

## §3.5 Alt-тексты (SEO + доступность + AEO)

Alt пишется как описание для человека, который не видит изображение, **с ключевым словом, но без Tier-1 лексики**.

| ID | alt ES |
|---|---|
| R1 | `Interior de un hub CLAVERA: hilera de lugares asignados con bicicletas en soportes verticales y pasillo de circulación libre. Imagen de proyecto.` |
| R2 | `Lugar asignado individual en un hub de guarda de bicicletas, con soporte vertical anclado y numeración de lugar. Imagen de proyecto.` |
| R3 | `Ingreso controlado de un hub de guarda de bicicletas con acceso digital por QR y cámara de seguridad. Imagen de proyecto.` |
| R4 | `Lockers individuales para casco y equipo de ciclismo en un hub CLAVERA. Imagen de proyecto.` |
| R5 | `Zona para e-bikes y bicicletas de carga con soportes a nivel de piso. Imagen de proyecto.` |
| R6 | `Esquema de zonificación de un hub CLAVERA: ingreso, guarda estándar, zona e-bike y lockers. Imagen de proyecto.` |

Слова `Imagen de proyecto` в alt — обязательны: они несут маркировку и для скринридеров, и для AI-краулеров, которые читают alt как факт о содержании.

## §3.6 Юридический фильтр рендеров `[БЛОКЕР]`

Перед публикацией каждый рендер проходит три проверки:

1. **Маркировка на месте** — `<figcaption>` + `alt`, видимый текст, не только в изображении.
2. **Нет обещаний оборудования** — ни одна деталь на рендере не является обещанием конкретной модели, бренда или количества (камер, локеров, мест). Если на рендере 40 мест, это не обещание 40 мест.
3. **Нет узнаваемого адреса** — ни фасада, ни номера, ни вида из окна на опознаваемую улицу.

---

# ЧАСТЬ IV · ФОРМА, ДАННЫЕ И ЦЕНОВОЙ ТЕСТ

## §4.1 Почему прежняя схема не работала

Двухволновая схема в прототипе реализована верно: цены на странице нет, раскрытие после заявки. Но **вариант цены негде было зафиксировать** — ни в URL, ни в скрытом поле. Метрика решения — конверсия в **оплаченный депозит на каждом ценовом уровне**; без метки варианта все лиды приходят обезличенными, и вторая волна неизбежно отправляет одну цену всем. Тест цены при этом не «ослаблен», он технически отсутствует.

## §4.2 Механика A/B `[БЛОКЕР B5]`

| Вариант | Founding, ARS/мес | Precio de lista, ARS/мес | Доля трафика |
|---|---|---|---|
| A | **65 000** | 81 000 | 33% |
| B | **72 000** | 90 000 | 34% |
| C | **80 000** | 100 000 | 33% |

**Реализация:**
1. При первом заходе назначается `price_variant` ∈ {A, B, C}: приоритет — URL-параметр `?v=A|B|C` (для ручных кампаний), иначе детерминированный хеш `session_id`.
2. Значение пишется в `localStorage` и в cookie на 90 дней — при возврате пользователь видит тот же вариант.
3. Значение пишется в **скрытое поле заявки** и в событие аналитики.
4. `/gracias` подставляет цены **из того же значения**.
5. Вторая волна (письмо и WhatsApp) отправляет **ту же** цену. Расхождение = потеря лида и потеря наблюдения.

**Ограничение по варианту C (из Pricing v1.0):** цена 80 000 / list 100 000 оптимальна только при пуле ~400 домохозяйств; при воронке ~300 модель даёт загрузку ~53% и payback за 80 месяцев. Практический вывод: **вариант C включается только при бюджете, дающем пропорционально больший охват**. Иначе низкая конверсия C будет означать «мало трафика», а не «цена высока» — то есть тест даст ложноотрицательный результат по самой перспективной гипотезе.

**Минимальный объём наблюдений до вывода:** ≥120 лидов на вариант либо ≥10 депозитов на вариант, что наступит раньше. До этого сравнение вариантов не интерпретируется.

## §4.3 Вторая волна (Wave 2): лид → депозит

| Шаг | Канал | Тайминг | Содержание |
|---|---|---|---|
| W1 | WhatsApp | ≤ 24 рабочих часа | приветствие, цена варианта, доступность в barrio, вопрос об типе транспорта |
| W2 | Email | +24 ч после W1 без ответа | та же цена, сравнение с cochera, ссылка на опрос |
| W3 | WhatsApp | +72 ч | предложение зарезервировать место депозитом, ссылка Mercado Pago |
| W4 | Email | +7 дней | «место ещё держится, осталось N» — только если N реален |
| W5 | — | +21 день | лид переводится в waitlist, из активной воронки выходит |

**На шаге W3 включается приём денег.** До этого обязательны: (а) финальная формулировка seña от юриста, (б) `Botón de arrepentimiento` (Disp. 954/2025), (в) двухшаговое подтверждение оплаты, (г) фиксация в CRM: сумма, вариант, дата, канал.

**Комиссии Mercado Pago** (учитывать при расчёте эффективного депозита): кошелёк 0,8%, дебет 1,24%, кредит 4,29% при зачислении через 10 дней, плюс 21% IVA на комиссию. Продвигать кошелёк/дебет.

## §4.4 Go / No-Go

| Метрика | Порог | Комментарий |
|---|---|---|
| **Оплаченные невозвратные депозиты** | **≥ 30** | Единственный решающий показатель. Не заменяется лидами ни при каком CPL |
| Доля ES-источника среди депозитов | ≥ 70% | Защита от диаспорного смещения, см. Часть V |
| Гео-концентрация | ≥ 50% депозитов в одном кластере ≤ 1,5 км | Размазанный спрос не обслуживается одним хабом |
| Конверсия лид → депозит | ≥ порога по варианту | Считается отдельно по A, B, C |
| CPL | ≤ целевого | Целевое значение задаётся до старта, не подгоняется по факту |
| Срок | 6–8 недель | Не набрано — no-go / pivot |

**Правило пересчёта cargo:** депозиты взвешиваются коэффициентами из S5 при сопоставлении с требованием ~118 мест, но **порог 30 считается по головам**, не по слотам.

---

# ЧАСТЬ V · МНОГОЯЗЫЧНОСТЬ

Многоязычность **сохраняется** (ES / EN / RU), но регламентируется так, чтобы не портить данные валидации.

## §5.1 Структура

| Язык | Код | URL | Роль |
|---|---|---|---|
| Español (Argentina) | `es-AR` | `clavera.ar/` (корень, без префикса) | **Канон.** Весь маркетинг, весь платный трафик |
| English | `en` | `clavera.ar/en/` | Партнёры, девелоперы, инвесторы, экспаты |
| Русский | `ru` | `clavera.ar/ru/` | Органика и сарафан диаспоры |

**Технически:**
- `hreflang` на всех трёх + `x-default` → `es-AR`;
- `<html lang="...">` корректен на каждой версии;
- переключатель языков — **в футере и в конце меню**, не первым элементом навигации; порядок `ES · EN · RU`;
- канонический URL каждой версии указывает на себя, не на корень;
- URL-слаги переводятся: `/privacidad`, `/en/privacy`, `/ru/privacy`;
- контент всех версий — серверно рендеренный HTML.

## §5.2 Правило сегментации лидов `[БЛОКЕР]`

Проблема, которую решаем: опрос на 11 ответов был признан диаспорной выборкой, не репрезентативной для CABA. RU-версия сайта воспроизводит тот же механизм — но заявка от русскоязычного жителя Чакариты **является настоящим спросом** и выбрасывать её неправильно. Решение — не удалять, а маркировать и ограничивать вес.

1. Поле `lang` пишется в каждую заявку автоматически.
2. **Платный трафик на RU и EN версии не закупается** в гео CABA. Их источник — только органика, прямые переходы и сарафан.
3. В зачёте go/no-go доля ES-источника среди депозитов **≥ 70%**. Пул депозитов, где RU-доля выше, не считается валидированным спросом CABA — он считается валидированным спросом диаспоры, и это другая, гораздо более узкая гипотеза.
4. Все дашборды спроса строятся с разбивкой по `lang` **по умолчанию**, не по запросу.

## §5.3 Что переводится, а что нет

| Элемент | ES | EN | RU |
|---|---|---|---|
| Весь копи S1–S15 | ✅ канон | ✅ | ✅ |
| Формулировка `20% de descuento` | ✅ | `20% off the list price` | *«20% скидки от списочной цены»* |
| Маркировка рендеров | ✅ | ✅ обязательно | ✅ обязательно |
| Юридические страницы | ✅ полная версия | ✅ перевод + примат ES | ✅ перевод + примат ES |
| Названия barrios | не переводятся | не переводятся | не переводятся (`Chacarita`, не «Чакарита») |
| Слоганы | канон | адаптация, не дословно | адаптация, не дословно |
| Typeform-опрос | ✅ es-AR | ❌ не делать в v1 | ❌ не делать в v1 |

**Оговорка о примате языка на юр. страницах (обязательна на EN и RU):**
> La versión en español (es-AR) es la única con validez legal. Las traducciones son de cortesía.

**Tier-1 запреты действуют во всех языках.** Английское `bike parking` и русское «велопарковка» запрещены наравне с `estacionamiento`. Полный словарь — Приложение В.

---

# ЧАСТЬ VI · SEO

## §6.1 Стратегическое противоречие и его разрешение

Люди ищут именно теми словами, которые нам запрещено употреблять: `estacionamiento de bicicletas`, `donde dejar la bici`, `guardar bicicleta Palermo`. Разрешение — разделение **опубликованного текста** и **целевых запросов**:

| Канал | Можно ли использовать Tier-1 слова | Почему |
|---|---|---|
| Копи страницы, meta, alt, URL | **Нет** | публикуемый текст характеризует услугу |
| Ключевые слова для закупки (Google Ads / Meta) | **Да, как таргет** | ключевое слово не является публикуемым текстом; тексты объявлений остаются в Tier 3 |
| Тексты объявлений | **Нет** | публикуются |
| Внутренний семантический анализ | Да | не публикуется |

Это единственный законный способ забирать высокочастотный трафик, не характеризуя услугу запрещённой лексикой.

## §6.2 Семантическая карта (es-AR)

**Ядро (Tier 3, публикуемое):**
`guardería de bicicletas Buenos Aires` · `guarda segura de bicicletas` · `guardar bicicleta CABA` · `depósito de bicicletas por membresía` · `lugar para bicicleta Chacarita` · `guarda de e-bike Buenos Aires` · `dónde guardar una bici cargo` · `hub de micromovilidad Buenos Aires`

**Долгий хвост по barrio (по одному на приоритетную зону):**
`guardar bicicleta en {Chacarita|Villa Crespo|Colegiales|Paternal|Almagro}`

**Долгий хвост по проблеме (лучшие для AEO):**
`no tengo lugar para la bici en el departamento` · `cómo guardar una e-bike sin cargarla en el ascensor` · `qué hacer si el consorcio no permite bicis` · `cuánto cuesta guardar una bicicleta en Buenos Aires`

**Только как таргет закупки, не на страницу:** `estacionamiento de bicicletas`, `bicicletero`, `cochera para bicicleta`.

## §6.3 Meta по языкам

| | ES (канон) | EN | RU |
|---|---|---|---|
| **Title** (≤60) | `CLAVERA — Guarda segura de bicicletas en Buenos Aires` | `CLAVERA — Secure bike storage in Buenos Aires` | `CLAVERA — Безопасное хранение велосипедов, Буэнос-Айрес` |
| **Meta description** (≤155) | `Guardería segura de bicicletas y movilidad personal por membresía en Buenos Aires. Lugar asignado, acceso digital y vigilancia, a minutos de tu casa.` | `Membership-based secure storage for bikes and personal mobility in Buenos Aires. Assigned space, digital access, surveillance.` | `Хранение велосипедов и персональной мобильности по подписке в Буэнос-Айресе. Закреплённое место, цифровой доступ, охрана.` |
| **OG title** | `Tu bici merece un lugar seguro en la ciudad.` | `Your bike deserves a safe place in the city.` | `Твой велосипед заслуживает надёжного места в городе.` |
| **OG image** | рендер R1, 1200×630, с маркировкой в тексте изображения | — | — |

## §6.4 Структура заголовков

Ровно один `<h1>` — заголовок hero. `<h2>` — заголовки секций S2–S13. `<h3>` — карточки внутри секций и вопросы FAQ. Никаких заголовков ради стилей: eyebrow-подписи (`GUARDA SEGURA · BUENOS AIRES`) верстаются как `<p>` с классом, не как заголовки.

## §6.5 Техническое SEO

- `robots.txt`: разрешено всё, кроме `/gracias`; ссылка на `sitemap.xml`;
- `sitemap.xml`: все три языковые версии + юр. страницы, с `hreflang`-альтернативами;
- `/gracias` → `noindex, follow`;
- канонические URL абсолютные, https, без слеша в конце (единообразно);
- редиректы: `clavera.com.ar` → `clavera.ar` 301; `www` → без `www`; http → https;
- отсутствующая индексация билдер-домена: `clavera-ar.kazanova-anna-v.chatgpt.site` закрывается `noindex` либо 301 на прод сразу после переезда, чтобы не создавать дубль;
- **весь контент в HTML ответа сервера.** Контент, появляющийся только после исполнения JS, не индексируется частью краулеров и не читается большинством AI-краулеров — это одновременно SEO и AEO требование;
- изображения: `width`/`height` заданы, `srcset` на три ширины, AVIF+WebP;
- структурированные данные — §8.2.

---

# ЧАСТЬ VII · GEO — локальная и географическая оптимизация

## §7.1 Ограничение: Google Business Profile пока недоступен

GBP требует верифицируемого физического адреса. Адреса нет и не будет до подписания аренды. Следствия:
- **Не создавать** GBP-профиль с домашним адресом или адресом-заглушкой: последующая смена адреса и категории обнуляет накопленные сигналы и рискует блокировкой;
- **Не публиковать** разметку `LocalBusiness` без `address` — это генерирует ошибки и слабый сигнал сущности;
- вместо этого — сигналы сущности без адреса, §7.2.

**Задача-триггер:** в день подписания аренды создаётся GBP с категорией `Bicycle storage facility` (либо ближайшей доступной, **не** `Parking garage`), NAP фиксируется единообразно, фото — реальные, не рендеры.

## §7.2 Сигналы сущности до адреса

| Сигнал | Реализация |
|---|---|
| `Organization` JSON-LD | name, url, logo, email, `areaServed: Ciudad Autónoma de Buenos Aires`, `sameAs` → Instagram, Facebook |
| Единый NAP | `CLAVERA` · `Buenos Aires, Argentina` · `hola@clavera.ar` — идентично на сайте, в Instagram, Facebook, в подписях email |
| Гео-контекст в копи | `Buenos Aires`, `CABA`, названия barrios — естественно в тексте S10, S12, футере |
| Атрибуция картографии | Buenos Aires Data, ссылка на датасет barrios |
| Соцсети | Instagram `clavera.ar`, Facebook `clavera.ar` — заполненные профили, ссылка на сайт, единый bio |

## §7.3 Гео-страницы по barrio (фаза 2, после запуска)

Девять страниц, по одной на баррио зон A и B: `/chacarita`, `/villa-crespo`, `/colegiales`, `/paternal`, `/almagro`, `/palermo`, `/palermo-hollywood`, `/belgrano`, `/nunez`.

**Дифференциация по классу зоны (обязательна):**

| Класс | Формулировка на странице | CTA |
|---|---|---|
| Зона A | `Estamos evaluando abrir un hub en {barrio}.` | заявка B2C |
| Зона B | `En {barrio} trabajamos con espacios existentes: sumamos lugares de guarda dentro de edificios y espacios ya en uso.` + двойной CTA | заявка B2C **и** ссылка на `/espacios` |

Зона B — единственное место, где B2C-страница ссылается на B2P: житель Palermo, читающий эту страницу, часто и есть тот, кто знает пустующую кочеру в своём доме. Это самый дешёвый источник B2P-лидов.

**Требования, чтобы это не стало doorway-спамом:**
- ≥ 40% уникального контента на страницу: тип застройки, состояние велосети, реальные наблюдения;
- уникальные title/meta/H1;
- перелинковка из S10;
- **ни одна страница не утверждает, что хаб там уже есть**;
- запуск только после первых 200 лидов на основной странице — иначе распыление трафика и невозможность атрибуции.

## §7.4 Гео-таргетинг платного трафика

- Радиусы 500–1500 м вокруг зон A и B, **не** весь CABA;
- **зона A и зона B — раздельные кампании** с разными `utm_campaign`. Причина: у них разная гипотеза размещения и разная стоимость обслуживания лида, а смешение делает CPL нечитаемым;
- в зоне B креативы допускают формулировку про «espacio en tu edificio» — она собирает одновременно B2C-лиды и наводки на помещения;
- исключить Puerto Madero (нет старого фонда, нет дефицита хранения) и весь GBA (вне операционного радиуса);
- Recoleta, Caballito, Boedo, San Telmo — не закупать, но принимать органику: поле `barrio` их содержит;
- язык объявлений — только ES; RU/EN объявления в гео CABA не запускаются (§5.2);
- B2D и B2P трафик **не закупается вообще** — только адресный аутрич (§1.1, п. 3).

---

# ЧАСТЬ VIII · AEO — оптимизация под ответные системы

Задача: чтобы на вопрос «где в Буэнос-Айресе можно безопасно хранить велосипед по подписке» ответная система назвала CLAVERA и процитировала её корректно.

## §8.1 Контентные требования

1. **Определение сущности в первом экране и в FAQ-01.** Одно предложение, самодостаточное, без местоимений: `CLAVERA es una guardería segura de bicicletas y movilidad personal por membresía en Buenos Aires.` Оно повторяется дословно в hero, FAQ-01, meta description, футере и JSON-LD `description`. Дословное совпадение — не тавтология, а сигнал согласованности сущности.
2. **Answer-first.** Каждый ответ FAQ начинается прямым ответом (`Sí.` / `No.` / `CLAVERA es…`), детали — вторым предложением. Ответные системы извлекают первое предложение.
3. **Атомарность фактов.** Один факт — одно предложение. Не «есть камеры, а также журнал входов и идентификация по DNI», а три отдельных утверждения.
4. **Никаких фактов только в изображениях.** Всё, что должно быть цитируемо, существует как текст.
5. **Стабильные формулировки.** При обновлении сайта определение сущности, цена-формула («20% ниже списочной, 24 месяца») и список barrios не переписываются вольно — расхождение версий ослабляет сущность.
6. **Даты и источники.** Рыночные значения (диапазон cochera) публикуются с месяцем и годом. Ответные системы предпочитают датированные утверждения.

## §8.2 Структурированные данные (JSON-LD)

Обязательный минимум на главной:

| Тип | Назначение | Ключевые поля |
|---|---|---|
| `Organization` | сущность бренда | `name`, `url`, `logo`, `email`, `areaServed`, `sameAs[]`, `description` |
| `WebSite` | сайт + языковые версии | `name`, `url`, `inLanguage` |
| `Service` | сама услуга (вместо `LocalBusiness` до адреса) | `serviceType: Guarda de bicicletas por membresía`, `provider`, `areaServed`, `audience` |
| `FAQPage` | все 10 вопросов S12 | `mainEntity[]` → `Question` / `acceptedAnswer` |
| `BreadcrumbList` | на гео-страницах фазы 2 | — |

**Запрещено:** `LocalBusiness` и `ParkingFacility` без адреса; `Offer` с ценой (цены на странице нет); `AggregateRating` (отзывов нет — ложная разметка).

## §8.3 `llms.txt`

Файл `/llms.txt` в корне, на испанском, ≤ 2000 знаков:

```
# CLAVERA

CLAVERA es una guardería segura de bicicletas y movilidad personal por
membresía en Buenos Aires, Argentina.

## Qué ofrece
- Lugar asignado individual para cada socio.
- Acceso digital personal, no transferible.
- Cámaras y registro de cada ingreso y egreso.
- Espacio cerrado, seco y limpio.
- Retiro sin mover otras bicicletas.
- Membresía mensual, sin garantía ni contrato anual.

## Qué NO es
- No es un taller de reparación.
- No guarda autos ni motos.
- No se cargan baterías dentro del hub.

## Estado del proyecto (agosto 2026)
CLAVERA está construyendo el mapa de demanda antes de definir la
ubicación del primer hub. Zonas prioritarias: Chacarita, Villa Crespo,
Colegiales, Paternal, Almagro.

## Contacto
hola@clavera.ar — https://clavera.ar
```

Файл обновляется при каждом изменении статуса проекта. Устаревший `llms.txt` хуже отсутствующего.

## §8.4 Доступность краулеров

- В `robots.txt` **не блокировать** GPTBot, ClaudeBot, PerplexityBot, Google-Extended: цель — быть цитируемым;
- FAQ и определение сущности отдаются в первом HTML-ответе;
- время до первого байта ≤ 600 мс: часть AI-краулеров имеет жёсткий таймаут и не ждёт медленные страницы.

---

# ЧАСТЬ IX · ТЕХНИЧЕСКОЕ ЗАДАНИЕ

## §9.1 Домен и хостинг `[БЛОКЕР B4]`

| Пункт | Требование |
|---|---|
| Прод-домен | `clavera.ar` |
| Редирект | `clavera.com.ar` → `clavera.ar`, 301 |
| `www` | 301 на без-`www` |
| SSL | обязателен, HSTS |
| Билдер-домен | закрыть `noindex` или 301 сразу после переезда |
| Верификация в Meta Business Manager | обязательна до запуска конверсионных кампаний |
| Почта | `hola@clavera.ar` (Google Workspace), SPF + DKIM + DMARC настроены — иначе письма второй волны попадают в спам |

Поддомен билдера несовместим и с премиальным позиционированием, и с закупкой: домен под конверсионные кампании должен быть верифицируемым, а поддомен чужой платформы верифицировать нельзя.

## §9.2 Производительность

| Метрика | Бюджет |
|---|---|
| LCP (4G, Буэнос-Айрес, мобила) | ≤ 2,0 с |
| INP | ≤ 200 мс |
| CLS | ≤ 0,05 |
| TTFB | ≤ 600 мс |
| Вес страницы | ≤ 1,2 МБ |
| JS (сжатый) | ≤ 100 КБ |
| Шрифты | ≤ 2 файла, `font-display: swap`, self-hosted |
| Изображения | AVIF/WebP, `srcset`, lazy кроме hero |

Обоснование строгости: значительная часть трафика — мобильный 4G; каждые +1 с LCP на лид-форме измеримо снижают конверсию, а конверсия здесь и есть предмет измерения. Медленный сайт искажает сам эксперимент.

## §9.3 Доступность (WCAG 2.2 AA)

- Контраст текста ≥ 4,5:1, крупного ≥ 3:1. Особое внимание: маркировка рендеров и юр. оговорки — их часто верстают серым по серому;
- все поля формы имеют `<label>`, не только placeholder;
- ошибки валидации — текстом, не только цветом;
- фокус видим, порядок табуляции логичен;
- FAQ-аккордеон на `<button>` с `aria-expanded`;
- клавиатурная навигация по всей форме;
- `prefers-reduced-motion` уважается.

## §9.4 Форма: бэкенд

- Приём — серверный эндпоинт, не сторонний виджет со своим доменом (иначе теряются скрытые поля и события);
- защита от спама: honeypot + rate limit по IP + время заполнения < 2 с отбрасывается. **Никакой CAPTCHA** на лид-форме первой волны — стоимость конверсии выше пользы;
- нормализация телефона к формату `+54 9 11 …`;
- дедупликация по контакту: повторная отправка обновляет запись, не создаёт вторую;
- запись в CRM/таблицу + мгновенное уведомление в WhatsApp/почту оператору: обещание «≤ 24 рабочих часа» на `/gracias` должно исполняться;
- хранение данных: только на сервисах с внятной политикой, минимальный набор полей, срок хранения указан в политике конфиденциальности;
- **тестовая заявка перед запуском** обязана содержать все скрытые поля §S11 — это критерий приёмки B5.

## §9.5 Аналитика и cookie-consent

- GA4 + Meta Pixel, загрузка **после** согласия на аналитические cookie;
- баннер cookie: раздельное согласие «необходимые / аналитика / реклама», по умолчанию сняты не-необходимые;
- consent сохраняется, версия пишется в `consent_version` заявки;
- события — Часть X.

## §9.6 Безопасность

HTTPS everywhere · HSTS · CSP с явным whitelist · `X-Content-Type-Options: nosniff` · `Referrer-Policy: strict-origin-when-cross-origin` · отсутствие персональных данных в URL и в query-параметрах (в том числе при редиректе на `/gracias`: `barrio` передаётся через сессию или подписанный токен, **не** через `?barrio=`).

---

# ЧАСТЬ X · АНАЛИТИКА И СОБЫТИЯ

## §10.1 Таксономия событий

| Событие | Триггер | Параметры |
|---|---|---|
| `page_view` | загрузка | `lang`, `price_variant`, `landing_version` |
| `scroll_50` / `scroll_90` | глубина | `lang` |
| `cta_click` | любой CTA | `cta_id`, `section`, `price_variant` |
| `form_start` | фокус в первое поле | `price_variant`, `lang` |
| `form_field_error` | ошибка валидации | `field` — покажет, какое поле теряет людей |
| `lead_submit` | загрузка `/gracias` | `barrio`, `tipo_vehiculo`, `price_variant`, `lang`, UTM |
| `price_reveal` | показ цены на `/gracias` | `price_variant` |
| `whatsapp_click` | клик по WhatsApp | `source: gracias|footer` |
| `survey_click` | клик по опросу | `source: landing|gracias` |
| `render_view` | просмотр секции S8 ≥ 50% | — |
| `faq_open` | раскрытие вопроса | `faq_id` — покажет реальные возражения |
| `deposit_paid` | из CRM, не с сайта | `price_variant`, `barrio`, `amount` |

`faq_open` по вопросам про цену и страховку — самый дешёвый источник данных о том, что действительно блокирует решение.

## §10.2 Конвенция UTM

`utm_source` = `meta|google|instagram|whatsapp|organic`
`utm_medium` = `cpc|social|referral|email`
`utm_campaign` = `{zona}-{objetivo}-{mes}` — например `chacarita-lead-ago26`
`utm_content` = креатив / вариант объявления
`utm_term` = ключевое слово (в том числе Tier-1 — оно не публикуется на странице)

## §10.3 Обязательные срезы дашборда

1. Лиды и депозиты **по `price_variant`** — основной срез.
2. Лиды и депозиты **по `lang`** — контроль правила ≥70% ES.
3. Лиды **по `barrio`** — карта спроса, вход в решение о локации.
4. Лиды по `tipo_vehiculo` со взвешиванием по коэффициентам S5.
5. CPL по кампании и по зоне.
6. Воронка `page_view → form_start → lead_submit → deposit_paid` с конверсией на каждом шаге.

---

# ЧАСТЬ XI · ЮРИДИЧЕСКИЕ СТРАНИЦЫ

## §11.1 `/privacidad` — Política de Privacidad `[БЛОКЕР B3]`

Каркас (наполняет юрист, структура обязательна):

1. **Responsable del tratamiento** — CLAVERA, `hola@clavera.ar`. Razón social и CUIT — `[TBD]`, добавляются после регистрации.
2. **Datos que recolectamos** — контакт (WhatsApp или email), имя (опционально), barrio, тип транспорта, технические данные (IP, UA, UTM, вариант цены).
3. **Finalidad** — связаться по вопросам доступности и цены; агрегированный анализ спроса; выбор локации.
4. **Base legal y consentimiento** — Ley 25.326, явное согласие через чекбокс формы.
5. **Plazo de conservación** — конкретный срок, не «пока необходимо».
6. **Terceros** — перечислить фактически используемые сервисы (хостинг, CRM, email, Typeform, аналитика) и факт возможной передачи за границу.
7. **Derechos del titular** — доступ, исправление, удаление; как реализовать (письмо на `hola@clavera.ar`, срок ответа).
8. **Autoridad de control** — Agencia de Acceso a la Información Pública, право обращения.
9. **Cookies** — ссылка на `/cookies`.
10. **Fecha de última actualización** — обязательна.

**Отдельная задача вне сайта:** регистрация базы персональных данных в реестре AAIP. Не блокирует запуск, но входит в план на первый месяц.

## §11.2 `/terminos` — Términos y Condiciones

Первая волна денег не принимает, поэтому объём минимальный: правила использования сайта, статус информации (не оферта), интеллектуальная собственность, оговорка о рендерах (`imágenes de proyecto`), примат ES-версии, применимое право и юрисдикция CABA.

**Дополняется до приёма депозитов:** условия seña, зачёт в первый месяц, порядок возврата, `Botón de arrepentimiento` (10 дней, Ley 24.240 / Disp. 954/2025), двухшаговое подтверждение платежа, порядок индексации IPC/ICL, срок гарантии 24 месяца, условия расторжения (30 дней).

## §11.3 `/cookies`

Таблица: имя cookie, назначение, срок, категория. Обязательно включить cookie ценового варианта (`price_variant`, 90 дней, категория «аналитика») — иначе A/B работает без раскрытия.

---

# ЧАСТЬ XII · ПРИЁМКА

## §12.1 Definition of Done по блокерам

| # | Проверка | Как проверяется |
|---|---|---|
| B1 | Формулировка скидки | Поиск по всем трём версиям: строки `del 20% sobre` **нет**; строка `20% de descuento sobre el precio de lista` **есть** |
| B2 | Страхование | Поиск `seguro`, `asegur`, `cobertura`, `póliza`: совпадения только в разрешённом тексте FAQ-05 |
| B3 | Политика конфиденциальности | `/privacidad` открывается, ссылка есть в форме и футере, чекбокс по умолчанию снят |
| B4 | Домен | Прод на `clavera.ar`, 301 с `clavera.com.ar`, домен верифицирован в Meta, билдер-домен закрыт |
| B5 | Данные заявки | Тестовая заявка содержит `price_variant`, `lang`, все UTM, `landing_version=1.4`; `lead_submit` пришёл в GA4 и Pixel |

## §12.2 Чек-лист контента

- [ ] Ни одного Tier-1 слова в копи, meta, alt, URL, именах файлов — во всех трёх языках
- [ ] Числа `40 s` и `10 min` отсутствуют
- [ ] Слоган `La mitad de una cochera…` отсутствует
- [ ] `Belgrano` отсутствует; `Paternal` и `Almagro` присутствуют
- [ ] Блок S7 (сравнение) на месте, ячейка цены CLAVERA **без числа**, подпись с датой присутствует
- [ ] Все рендеры имеют `<figcaption>` с маркировкой и `alt` со словами `Imagen de proyecto`
- [ ] 24/7 не встречается в hero; в S3/S6 сопровождается сноской `según el hub`
- [ ] Ровно один `<h1>`
- [ ] Форма: 4 видимых поля, WTP-вопроса нет, поля `Marca y modelo` нет
- [ ] Ссылка на опрос ведёт на **испанскую** версию анкеты
- [ ] FAQ: 10 вопросов, каждый ответ начинается прямым ответом
- [ ] `/gracias`: цена соответствует `price_variant`, списочная цена зачёркнута, `noindex`

## §12.3 Чек-лист техники

- [ ] LCP ≤ 2,0 с на мобиле, 4G
- [ ] Контент виден при отключённом JS
- [ ] `hreflang` × 3 + `x-default`, каноникалы указывают на себя
- [ ] JSON-LD: `Organization`, `WebSite`, `Service`, `FAQPage`; валидируется без ошибок
- [ ] `LocalBusiness` / `Offer` / `AggregateRating` **отсутствуют**
- [ ] `/llms.txt` доступен и актуален
- [ ] `robots.txt` не блокирует AI-краулеров; `/gracias` в `noindex`
- [ ] `sitemap.xml` со всеми языками
- [ ] Cookie-баннер с раздельным согласием, не-необходимые по умолчанию сняты
- [ ] SPF / DKIM / DMARC настроены
- [ ] Персональных данных в URL нет
- [ ] WCAG AA: контраст, labels, фокус, аккордеон на кнопках
- [ ] Тестовая заявка доходит до CRM и до уведомления оператору

## §12.4 Чек-лист B2B-страниц (v1.5)

**Общее:**
- [ ] `/desarrolladores` и `/espacios` в `noindex` (фаза 1)
- [ ] Ни одной ссылки на них в основной навигации; ссылки только в футере
- [ ] Определение CLAVERA идентично определению на главной, дословно
- [ ] Скрытое поле `funnel` = `b2d` / `b2p` присутствует в тестовой заявке
- [ ] UTM-префиксы разделены; B2B-лиды в отдельном пайплайне CRM
- [ ] Юр. страницы упоминают загрузку файлов (планы, фото) и срок их хранения
- [ ] Приём файлов: лимит размера, whitelist типов, антивирус-скан

**`/espacios` — лексический контроль `[БЛОКЕР]`:**
- [ ] Поиск `cochera` / `garaje`: **все** совпадения в притяжательной или перечислительной конструкции об активе собеседника
- [ ] Строк `cochera CLAVERA`, `nuestra cochera`, `cochera para bicicletas`, `estacionamiento` — **нет**
- [ ] Цифр доходности нет нигде, включая FAQ-02
- [ ] Ссылки на Ley 6779 и Ley 4827 корректны, с датой
- [ ] Обещание демонтажа за счёт CLAVERA присутствует минимум дважды
- [ ] Подпись `Estimaciones geométricas…` под таблицей ёмкости

**`/desarrolladores`:**
- [ ] Внутренних адресов кандидатов (Humboldt, Palpa, Paraguay, Zapata) на странице **нет**
- [ ] Обещаний доходности нет
- [ ] Требования по высоте и полу помечены `[verificar en obra]`
- [ ] Формулировка про профессионала-матрикулянта присутствует
- [ ] Шаблон LOI на странице не опубликован

## §12.5 Гейты запуска

| Гейт | Условие |
|---|---|
| **G1 — публикация** | B1, B2, B3 закрыты |
| **G2 — платный трафик** | B4, B5 закрыты + §12.3 пройден |
| **G3 — приём депозитов** | Формулировка seña от юриста + `Botón de arrepentimiento` + двухшаговое подтверждение + Mercado Pago подключён |
| **G4 — подписание флагманской аренды** | ≥30 оплаченных депозитов, ≥70% ES-источник, гео-кластер ≤1,5 км, объект прошёл первичный гейт по сухости |
| **G5 — публикация B2B-страниц** | §12.4 пройден, ОК юриста на лексику `/espacios`, юр. страницы упоминают загрузку файлов |
| **G6 — подписание соглашения по Punto** | 8 гейтов §14.2 пройдены, юр. структура (вариант А или Б) выбрана, позиция страховщика получена, ставка партнёра ≤ порога §14.5 |
| **G7 — индексация B2B-страниц (фаза 2)** | B2C-сущность закреплена в индексе (главная в топе по `guardería de bicicletas Buenos Aires`), лексический контроль пройден повторно |

---

# ЧАСТЬ XIII · СТРАНИЦА `/desarrolladores` (B2D)

## §13.1 Стратегическая рамка

**Почему этот трек существует.** В новостройках CABA часть машиномест не продаётся: колонная сетка, радиусы разворота и остаточные карманы делают их неудобными для автомобиля. **Тот же геометрический дефект делает их идеальными для CLAVERA**: модуль 0,60 м, парковочная глубина 0,35–0,40 м, радиус разворота не нужен вовсе. Девелопер продаёт эти места с дисконтом или не продаёт совсем; для нас это профильная площадь.

**Почему это срочно.** После сдачи объекта гараж дробится на индивидуально титулованные *unidades complementarias*, и каждая уходит своему покупателю. Собрать после этого смежный блок из 15–20 мест — задача с десятками собственников и практически нерешаемая. Окно существует **до сдачи**, и — что важнее — **до регистрации reglamento de copropiedad**, в котором площадь можно закрепить либо как единую *unidad complementaria* с назначением «guarda de bicicletas», либо как общую амьенити под управление. Это одно юридическое действие, совершённое вовремя, определяет, существует ли вообще предложение.

**Асимметрия.** Стоимость входа — письма и встречи. Стоимость промедления — безвозвратная потеря класса объектов на 2027 год.

**Что предлагаем, в порядке предпочтения:**

| # | Структура | Кто владеет | Кто управляет | CAPEX CLAVERA | Комментарий |
|---|---|---|---|---|---|
| 1 | **Долгосрочная аренда** смежного блока (8–10 лет) | девелопер / инвестор | CLAVERA | стойки + доступ | **Предпочтительно.** Asset-light, полный контроль бренда |
| 2 | **Концессия / management agreement** | девелопер / консорцио | CLAVERA, доля владельцу | стойки + доступ | Хорошо, когда девелопер хочет амьенити, а не арендатора |
| 3 | **White-label / лицензия** | консорцио | консорцио | проект + оборудование по счёту | Минимум капитала, минимум контроля. Только если 1 и 2 недоступны |
| ❌ | **Покупка разрозненных машиномест** | — | — | — | **Исключено.** Капиталоёмко, немасштабируемо, несмежно |

## §13.2 Ценностное предложение девелоперу (три аргумента)

1. **Монетизация непродаваемого.** Площадь, которая иначе продаётся с дисконтом или остаётся на балансе, превращается в единый арендуемый/концессионный объект с одним контрагентом вместо двадцати покупателей.
2. **Амьенити, влияющая на продажи квартир.** «Guarda de bicicletas con acceso digital» — конкурентное отличие в сегменте, где покупатель молод, ездит на велосипеде и уже столкнулся с проблемой лифта. Влияет на скорость продаж, а не только на цену.
3. **Ноль обязательств по эксплуатации.** CLAVERA берёт проект, оборудование, доступ, обслуживание и участников. Консорцио не получает ни новой службы, ни новой ответственности.

## §13.3 Контент страницы

**ES:**

> `eyebrow:` PARA DESARROLLADORES
>
> # Los lugares del garaje que no se venden, sí se alquilan.
>
> En casi todos los desarrollos quedan lugares que el auto no aprovecha: columnas mal ubicadas, retazos, rincones sin radio de giro. Para una bicicleta esos mismos lugares son perfectos: 0,60 m de módulo y cero radio de giro.
>
> CLAVERA toma un bloque contiguo del garaje en alquiler a largo plazo o concesión, lo equipa y lo opera. El desarrollo suma una amenity que el comprador entiende, y una renta con un solo contraparte.
>
> `Presentar un proyecto →`

🇷🇺 *Места в гараже, которые не продаются, — сдаются. Почти в каждом проекте остаются места, которые автомобиль не использует: неудачные колонны, обрезки, углы без радиуса разворота. Для велосипеда те же места идеальны: модуль 0,60 м и нулевой радиус разворота. CLAVERA берёт смежный блок гаража в долгосрочную аренду или концессию, оснащает и эксплуатирует его. Проект получает понятную покупателю амьенити и арендный доход с одним контрагентом.*

### Блок «Por qué el timing importa»

> ## Antes de la entrega, no después.
>
> Una vez que el garaje se subdivide en unidades complementarias con título individual, armar un bloque contiguo de 15 o 20 lugares deja de ser posible: son veinte propietarios distintos.
>
> El momento útil es durante el proyecto o antes de la escrituración: el destino del espacio puede quedar previsto en el reglamento de copropiedad, como unidad complementaria destinada a guarda de bicicletas o como amenity de administración común.
>
> Si tu obra entrega en 2027, la conversación es hoy.

🇷🇺 *До сдачи, а не после. Как только гараж дробится на unidades complementarias с индивидуальными титулами, собрать смежный блок из 15–20 мест становится невозможно: это двадцать разных собственников. Полезный момент — на стадии проекта или до оформления: назначение площади может быть заранее прописано в reglamento de copropiedad как unidad complementaria под велохранение либо как амьенити общего управления. Если объект сдаётся в 2027-м, разговор нужен сегодня.*

### Блок «Qué necesitamos» — технические требования

> ## Lo que necesitamos del espacio.

| Parámetro | Requisito |
|---|---|
| Bloque contiguo | desde 25 m² (≈20 lugares); óptimo 60–140 m² |
| Altura libre | ≥ 2,40 m para un nivel; ≥ 3,40 m si se prevé doble nivel `[verificar en obra]` |
| Piso | contrapiso apto para anclaje químico o mecánico de estructuras metálicas |
| Humedad | espacio seco, sin filtraciones ni antecedentes de anegamiento — **condición eliminatoria** |
| Acceso | ingreso peatonal que no obligue a cruzar la rampa vehicular |
| Ancho de puerta | ≥ 1,10 m (bicicletas de carga) |
| Electricidad | un circuito: iluminación, CCTV y panel de acceso |
| Separación | zona delimitada, sin circulación de autos por dentro |

> ## Lo que NO necesitamos.
>
> Sin agua. Sin baño. Sin ventilación especial: no se cargan baterías dentro del hub. Sin vidriera ni frente comercial: el espacio puede estar en subsuelo o al contrafrente.

🇷🇺 *Что не нужно: воды нет, санузла нет, специальной вентиляции нет — батареи внутри не заряжаются; витрины и коммерческого фронта не нужно — площадь может быть в подвале или в контрафренте.*

**Стратегическая функция блока «Lo que NO necesitamos»:** он и есть основной аргумент. Он объясняет девелоперу, почему CLAVERA берёт именно то, что ему некуда девать, и снимает подозрение, что мы претендуем на ликвидную площадь.

### Блок «Cómo trabajamos»

> ## Tres pasos, sin costo para el desarrollo.
>
> 1. **Nos mandás el plano del subsuelo.** Devolvemos un estudio de capacidad: cuántos lugares entran, en qué disposición, con qué circulación.
> 2. **Definimos la estructura.** Alquiler a largo plazo, concesión o licencia. Sin obra a cargo del desarrollo.
> 3. **Firmamos una carta de intención.** No compromete la venta ni el cronograma: reserva el espacio y su destino en el reglamento.

🇷🇺 *Три шага, без затрат для проекта. Присылаете план подвала — возвращаем исследование ёмкости. Определяем структуру: аренда, концессия или лицензия, без строительных работ за счёт проекта. Подписываем письмо о намерениях: оно не связывает ни продажи, ни график, но фиксирует площадь и её назначение в регламенте.*

**Стратегическая функция:** первый шаг — бесплатное исследование ёмкости. Это дешёвый для нас артефакт, который создаёт обязанность ответить и одновременно даёт нам план подвала — актив, недоступный иным способом.

### Форма `/desarrolladores`

| # | Поле | Тип | Обяз. | Label ES |
|---|---|---|---|---|
| 1 | rol | select | ✅ | `Tu rol` → Desarrollador · Arquitecto/Estudio · Inversor · Broker · Administración/Consorcio · Otro |
| 2 | proyecto | text | ✅ | `Nombre o dirección del proyecto` |
| 3 | barrio | select | ✅ | `Barrio` (список §10.2) |
| 4 | entrega | select | ✅ | `Entrega estimada` → En obra, entrega 2026 · 2027 · 2028 o después · Ya entregado |
| 5 | superficie | select | ❌ | `Superficie disponible aproximada` → menos de 25 m² · 25–60 · 60–140 · más de 140 · No sé todavía |
| 6 | contacto | email/tel | ✅ | `Email o WhatsApp` |
| 7 | plano | file | ❌ | `Plano del subsuelo (opcional, PDF o DWG)` |

**CTA:** `Pedir estudio de capacidad →`
**Скрытые поля:** `lang`, `landing_version`, `funnel=b2d`, UTM, `referrer`, `ts_utc`, `consent_version`.
**После отправки:** `/gracias-desarrolladores` — подтверждение, срок ответа (`5 días hábiles`), ссылка на одностраничный PDF `Anexo Técnico CLAVERA` `[TBD — подготовить]`.

**Приём файла `plano`:** до 25 МБ, только PDF/DWG/JPG/PNG, антивирус-скан, хранение отдельно от персональных данных, упоминание в политике конфиденциальности обязательно.

### Юридические ограничения страницы `[БЛОКЕР]`

- **Никаких обещаний доходности** девелоперу: ни % , ни ARS/м², ни сроков окупаемости. Обещание доходности третьему лицу рискует квалификацией как предложение инвестиции. Формулировка — только `renta con un solo contraparte`, без цифр.
- **Никаких утверждений о habilitación.** Пригодность площади под рубро *depósito/guarda* в конкретном объекте подтверждает матрикулированный профессионал по модели Declaración Responsable (Ley 6101). На странице: `La viabilidad regulatoria se confirma por profesional matriculado en cada caso.`
- **Не называть внутренних кандидатов.** Humboldt, Palpa, Paraguay, Zapata и любые другие адреса на странице отсутствуют (реестр — Приложение Е).
- **Не публиковать шаблон LOI.** Только по запросу, после юр. проверки.
- Требования по высоте и полу помечены `[verificar en obra]` — это класс О по §0.6 до проверки на прототипе (тесты T6, T8).

## §13.4 KPI трека B2D

| Метрика | Порог фазы 1 (8 недель) |
|---|---|
| Заявок с планом подвала | ≥ 8 |
| Выданных исследований ёмкости | ≥ 6 |
| Проектов со сдачей 2027 и позже | ≥ 4 |
| Подписанных LOI | ≥ 1 |
| Средняя ёмкость по подтверждённым площадям | ≥ 40 мест |

B2D не участвует в зачёте порога 30 депозитов. Его гейт независимый: **≥1 LOI на объект со сдачей 2027 при подтверждённой смежной ёмкости ≥40 мест.**

---

# ЧАСТЬ XIV · СТРАНИЦА `/espacios` (B2P) — микро-хаб 10–20 мест

## §14.1 Стратегическая рамка: почему это может оказаться главным треком

**Регуляторное окно.** Ley 6779 (январь 2025) убрала из Ley 4827 потолок в 10% на тариф за велосипед. До этого владелец кочеры был обязан принимать велосипеды по символической цене — то есть велохранение было для него убытком. **Теперь оно впервые может стоить рыночных денег.** Владельцы кочер об этом в большинстве не знают. Это и есть содержание нашего первого сообщения.

**Геометрия.** Одно машиноместо ≈ 2,5 × 5,0 м. Вертикальные грани вдоль пятиметровой стены при модуле 0,60 м дают ~8 позиций, занимая 0,40 м глубины парковки + 1,20 м односторонне загруженного прохода = 1,60 м из 2,5 м ширины. Итого:

> **1 машиноместо ≈ 6–8 мест CLAVERA. Микро-хаб на 10–20 мест = эквивалент 2–3 машиномест.**

Класс Н/М по §0.6 — можно публиковать. Это единственная цифра на странице.

**Почему это сильнее флагмана как инструмент валидации.** Флагман валидируется депозитами — то есть обещаниями. Микро-хаб валидируется платящими участниками и фактической загрузкой **в конкретном баррио**, при нулевой фиксированной аренде, на существующей habilitación собственника и при CAPEX, который снимается и переставляется. Платящий участник в Palermo — сигнал более высокого класса, чем депозит в Palermo. Это ровно тот «ручной консьерж-пилот» из плана валидации спроса, но с брендом и цифровым доступом.

**Стратегическая роль в сети.** Защита CLAVERA — не стойки и не UX (копируются), а **плотность сети локаций, договоры и доверие**. Десять «Punto» по 15 мест дают плотность быстрее и дешевле, чем один флагман на 118 мест, и создают именно тот density moat, который работает у Cyclehoop и Bounce. Флагман при этом остаётся нужен — он единственный держит юнит-экономику, полный набор сервисов и стандарт бренда.

**Три риска, которые надо признать до запуска:**

1. **Репутационный риск при частичном контроле.** Безопасность — ядро обещания. В чужом помещении контроль частичный, а удар при краже — полный. Разрешается стандартом §14.2: не прошло гейты — не получает бренд.
2. **Риск каннибализации.** Punto в Palermo может «съесть» спрос, обосновывающий флагман. Контраргумент: ёмкость Punto жёстко ограничена (6–24), поэтому он производит **лист ожидания** — а лист ожидания и есть предусмотренный триггер расширения.
3. **Юридическая рамка custodia.** CC ст. 1374/1375: оговорки об ограничении ответственности для заведений с custodia неисполнимы. В партнёрском помещении надо однозначно определить, кто депозитарий. Две структуры — §14.4, решение за юристом.

## §14.2 Стандарт «Punto» — 8 гейтов бренда `[БЛОКЕР]`

Партнёрское помещение получает бренд CLAVERA **только** при прохождении всех восьми. Не прошло — либо white-label без нашего имени, либо отказ.

| # | Гейт | Проверка |
|---|---|---|
| 1 | **Сухость** | физический осмотр; следы влаги, конденсата, подтоплений — отказ. Precedent: Roseti 530 закрыт по этому гейту |
| 2 | **Физическое отделение от движения автомобилей** | велосипед не стоит на траектории машины. Разграничение конструкцией, не разметкой |
| 3 | **Независимый доступ участника** | вход без зависимости от playero, encargado или чужого расписания. Иначе продукт не наш |
| 4 | **Модуль 0,60 м и извлечение без перемещения соседей** | Código de Edificación 3.8.8.7 + Independent Access Rule |
| 5 | **Письменное разрешение на анкеровку в пол** | без него грани только пристенные и ёмкость падает примерно вдвое |
| 6 | **CCTV на зону CLAVERA с доступом к записи** | письменно: срок хранения и порядок выдачи записи по инциденту |
| 7 | **Договор: ответственность, страхование, срок, порядок выхода** | включая право снять оборудование |
| 8 | **График доступа ≥ 14 ч/сутки** | 24/7 желательно, но для Punto не обязательно — и именно поэтому Punto **не обещает 24/7** |

**Продуктовое следствие гейта 8.** Punto не обязан давать 24/7 → он не может продаваться как полный продукт по полной цене. Отсюда двухуровневая линейка:

| Уровень | Ёмкость | Доступ | Сервисы | Цена |
|---|---|---|---|---|
| **CLAVERA Hub** (флагман) | ≥ 90 мест | расширенный / 24/7 | локеры, зона cargo, зона e-bike, тамбур | полная списочная |
| **Punto CLAVERA** (микро-хаб) | 6–24 места | ≥ 14 ч/сутки | базовое хранение, цифровой доступ, CCTV | −15…−20% от списочной `[TBD — подтвердить моделью]` |

**Название под-бренда — `[TBD]`.** Кандидаты: **Punto CLAVERA** (рекомендуется: короткое, местное, читается как «точка сети»), `CLAVERA Satélite`, `CLAVERA Barrio`. Решение за Anna до публикации страницы; в тексте ниже используется `Punto CLAVERA` как рабочее.

## §14.3 Контент страницы

**ES:**

> `eyebrow:` PARA PROPIETARIOS DE ESPACIOS
>
> # ¿Tenés lugares que hoy no rinden?
>
> Un lugar de auto que no se alquila, un rincón atrás de la rampa, un espacio común que nadie usa. En 2,5 × 5 metros entran seis a ocho lugares de bicicleta.
>
> CLAVERA instala, opera y consigue los socios. Vos aportás el espacio y cobrás una participación de lo que se factura. Sin obra a tu cargo y sin alquiler fijo de por medio.
>
> `Proponer un espacio →`

🇷🇺 *Есть места, которые сегодня не приносят дохода? Незанятое машиноместо, угол за рампой, общее пространство, которым никто не пользуется. В 2,5 × 5 метров входит от шести до восьми велосипедных мест. CLAVERA монтирует, эксплуатирует и приводит участников. Вы предоставляете площадь и получаете долю от выручки. Без работ за ваш счёт и без фиксированной аренды.*

### Блок «Cambió la ley» — регуляторный крючок

> ## Desde 2025 la bicicleta dejó de ser una obligación sin ingreso.
>
> La Ley 4827 fijaba un tope del 10% para la tarifa de bicicletas. La Ley 6779, de enero de 2025, eliminó ese tope. Guardar bicicletas pasó de ser una carga a ser un ingreso posible.
>
> La mayoría de los espacios todavía no lo aprovecha, porque la bicicleta necesita otra estructura: soportes verticales, módulo de 0,60 m y acceso propio. Eso es lo que aportamos nosotros.

🇷🇺 *С 2025 года велосипед перестал быть обязанностью без дохода. Ley 4827 устанавливала потолок 10% на велосипедный тариф. Ley 6779 (январь 2025) этот потолок отменила. Хранение велосипедов из обузы стало возможным источником дохода. Большинство помещений этим ещё не пользуется, потому что велосипеду нужна другая конструкция: вертикальные крепления, модуль 0,60 м и собственный доступ. Это и приносим мы.*

**Функция блока:** он сообщает собеседнику полезный факт, которого тот, скорее всего, не знает, и делает первое письмо ценным само по себе. Это единственный дешёвый способ получить ответ от владельца кочеры, который игнорирует все входящие предложения.

### Блок «Cuánto espacio hace falta»

> ## Con dos o tres lugares alcanza.

| Espacio disponible | Lugares CLAVERA | Formato |
|---|---|---|
| 1 lugar de auto (≈12 m²) | 6–8 | Punto mínimo |
| 2–3 lugares (≈25–37 m²) | 12–20 | **Punto estándar** |
| Rincón o retazo desde 8 m² | 4–6 | Solo si hay pared libre y paso propio |
| Más de 60 m² | 40+ | Conversación distinta: hub completo |

**Обязательная подпись:** `Estimaciones geométricas sobre módulo de 0,60 m. La capacidad final se define con medición en el lugar.`

### Блок «Qué pone cada uno»

> ## Quién hace qué.

| | Vos | CLAVERA |
|---|---|---|
| Espacio | ✅ | |
| Estructuras y montaje | | ✅ |
| Acceso digital y cámaras de la zona | | ✅ |
| Socios, cobranza y atención | | ✅ |
| Mantenimiento del sistema | | ✅ |
| Participación de lo facturado | ✅ cobrás | |
| Retiro del equipamiento al finalizar | | ✅ a nuestro cargo |

🇷🇺 *Кто что делает. Вы — площадь и получение доли выручки. CLAVERA — конструкции и монтаж, цифровой доступ и камеры зоны, участники, платежи и поддержка, обслуживание системы, снятие оборудования по окончании за свой счёт.*

**Последняя строка обязательна:** обещание снять оборудование за свой счёт снимает главное возражение владельца — страх, что после ухода арендатора останется просверленный пол и мусор.

### Блок «Qué pedimos del espacio» — гейты, переведённые в язык собственника

> ## Cinco condiciones, y son todas verificables en una visita.
>
> 1. **Seco.** Sin filtraciones ni antecedentes de anegamiento. Es la única condición que no negociamos.
> 2. **Separado del paso de los autos.** La zona queda delimitada; ninguna bici queda en la trayectoria de un vehículo.
> 3. **Acceso propio del socio.** El socio entra con su código, sin depender de que haya alguien.
> 4. **Permiso escrito para anclar al piso.** Con compromiso de retiro y reparación al finalizar.
> 5. **Horario amplio, todos los días.** Desde 14 horas diarias.

🇷🇺 *Пять условий, все проверяются за один визит: сухость (единственное необсуждаемое), отделение от движения авто, собственный доступ участника, письменное разрешение на анкеровку с обязательством демонтажа и восстановления, расширенный график от 14 часов в сутки.*

### Блок «Para quién es este espacio»

> - Cocheras y garajes comerciales con lugares vacantes
> - Consorcios con espacios comunes sin uso
> - Locales, depósitos y talleres con superficie de sobra
> - Gimnasios, clubes y centros comerciales con demanda de guarda
> - Edificios de oficinas y coworkings

🇷🇺 *Кочеры и коммерческие гаражи с пустующими местами; консорцио с неиспользуемыми общими площадями; локали, депозиты и мастерские с избыточной площадью; спортзалы, клубы и торговые центры со спросом на хранение; офисные здания и коворкинги.*

**Лексический контроль `[БЛОКЕР]`:** `cocheras y garajes comerciales` здесь описывает **актив собеседника**. Проверка при приёмке: на странице не существует ни одной конструкции, где `cochera` или `garaje` относится к CLAVERA (§0.5, правило защиты сущности).

### Блок FAQ `/espacios`

| # | Pregunta | Respuesta ES |
|---|---|---|
| 01 | ¿Tengo que hacer obra? | No. El montaje, el equipamiento y el mantenimiento son a cargo de CLAVERA. Al finalizar, retiramos todo y reparamos los anclajes. |
| 02 | ¿Cuánto voy a cobrar? | Se define caso por caso, según la capacidad real medida en el lugar y el precio de membresía de la zona. No publicamos números: dependen del espacio. |
| 03 | ¿Necesito una habilitación nueva? | Se evalúa en cada caso con profesional matriculado. Muchos espacios ya cuentan con el rubro necesario. |
| 04 | ¿Quién responde si le pasa algo a una bici? | Queda definido por escrito en el acuerdo, junto con las coberturas. No firmamos acuerdos donde eso quede ambiguo. |
| 05 | ¿Se cargan baterías? | No. Nunca se cargan baterías dentro del espacio. |
| 06 | ¿Y si quiero terminar el acuerdo? | El acuerdo prevé plazo y salida. Retiramos el equipamiento a nuestro cargo. |
| 07 | ¿Cuántos lugares entran en mi espacio? | Mandanos las medidas o una foto y te devolvemos una estimación. Con visita, la medición es exacta. |

**FAQ-02 `[БЛОКЕР]`:** формулировка запрещает публиковать любую цифру доходности. Обещание доходности третьему лицу — риск квалификации как предложение инвестиции и прямое обязательство по Ley 24.240 art. 8. Расчёт делается индивидуально, в переписке, на **их** цифрах, и всегда как оценка.

### Форма `/espacios`

| # | Поле | Тип | Обяз. | Label ES |
|---|---|---|---|---|
| 1 | tipo_espacio | select | ✅ | `Tipo de espacio` → Cochera o garaje comercial · Espacio común de consorcio · Local o depósito · Gimnasio o club · Oficina o coworking · Otro |
| 2 | rol | select | ✅ | `Tu rol` → Propietario · Administrador/Encargado · Operador · Inquilino · Broker · Otro |
| 3 | barrio | select | ✅ | `Barrio` (список §10.2) |
| 4 | capacidad | select | ✅ | `Espacio disponible` → 1 lugar de auto · 2–3 lugares · Un rincón chico · Más de 60 m² · No sé |
| 5 | horario | select | ❌ | `Horario en que el espacio está accesible` → Menos de 14 h · 14–20 h · 24 h |
| 6 | contacto | email/tel | ✅ | `WhatsApp o email` |
| 7 | foto | file | ❌ | `Foto del espacio (opcional)` |

**CTA:** `Ver cuántos lugares entran →`
**Скрытые поля:** `lang`, `landing_version`, `funnel=b2p`, UTM, `referrer`, `ts_utc`, `consent_version`.
**После отправки:** `/gracias-espacios` — срок ответа (`2 días hábiles`), предложение визита, повтор пункта про демонтаж за наш счёт.

**Квалификация в CRM — автоматическая:** `horario < 14 h` → флаг «не проходит гейт 8, только white-label»; `tipo_espacio = Espacio común de consorcio` → флаг «требуется решение асамблеи, длинный цикл».

## §14.4 Юридическая структура партнёрства `[решение за юристом]`

Два варианта, взаимоисключающие:

| | **Вариант А — CLAVERA оператор** | **Вариант Б — CLAVERA поставщик** |
|---|---|---|
| Кто депозитарий | CLAVERA | владелец помещения |
| Кто заключает договор с участником | CLAVERA | владелец |
| Habilitación | своя либо суб-операция под чужой | чужая, вопрос не возникает |
| Контроль бренда | полный | слабый |
| Ответственность CC 1374/1375 | на CLAVERA | на владельце |
| Пригодность для бренда CLAVERA | ✅ | только white-label |

**Рекомендация:** вариант А как основной, вариант Б — только для white-label без нашего имени. Обоснование: обещание безопасности нельзя делегировать контрагенту, не отдав ему бренд. Вопрос выносится юристу вместе с вопросом о habilitación (см. Приложение А, п. 11–12).

**Кроме того, обязательно к согласованию:** страховая рамка при размещении в чужом помещении (позиция страховщика по объекту, который мы не контролируем целиком) — это может оказаться сдерживающим фактором всего трека.

## §14.5 Экономические ограничения микро-хаба (внутреннее, не публикуется)

Punto на 6–24 места не выдерживает **никакой** фиксированной издержки. Отсюда жёсткие рамки:

| Параметр | Ограничение |
|---|---|
| Фиксированная аренда | **0.** Только revenue-share. Любая фиксированная ставка отклоняется без расчёта |
| CAPEX на слот | ≤ $150, полностью съёмный и переставляемый |
| Payback на слот | ≤ 6 месяцев при загрузке 60% |
| Доля владельцу | в % от выручки net of IVA, не от gross. IVA 21% — не наша выручка |
| Минимальная загрузка для продолжения | 60% через 90 дней, иначе оборудование снимается и переставляется |
| Операционная модель | без персонала. Одно посещение в неделю максимум |

**Kill-criterion для Punto** отличается от флагманского: там порог `аренда/слот ≤ 0,35 × ARPU`, здесь аренды нет, поэтому порог формулируется как **`доля владельца + эквайринг + обслуживание ≤ 0,45 × ARPU net of IVA`**. При IVA-скорректированном ARPU ~$44,50 это ~$20/слот/мес на все партнёрские и переменные издержки. Порог подлежит подтверждению в BikeHub_Unit_Model_USD.xlsx отдельным листом `Punto` `[задача]`.

## §14.6 KPI трека B2P

| Метрика | Порог фазы 1 (8 недель) |
|---|---|
| Заявок с помещением | ≥ 15 |
| Проведённых визитов | ≥ 8 |
| Прошедших все 8 гейтов | ≥ 3 |
| Подписанных соглашений | ≥ 1 |
| **Первый работающий Punto** | ≥ 1, ёмкость ≥ 10 мест |
| Загрузка первого Punto через 90 дней | ≥ 60% |

**Как этот трек взаимодействует с главным гейтом.** Порог 30 депозитов остаётся условием подписания **флагманской аренды** и не смягчается. Но работающий Punto с загрузкой ≥60% в баррио зоны B — это подтверждённый спрос более высокого класса, чем депозиты, и он даёт основание для флагмана в том же баррио быстрее и дешевле. Логика последовательности: **Punto валидирует баррио → флагман его масштабирует.**

---

# ПРИЛОЖЕНИЕ А · Реестр `[TBD]`

| # | Пункт | Блокирует | Ответственный | Условие снятия |
|---|---|---|---|---|
| 1 | Точный режим доступа по объекту | формулировка 24/7 без сноски | Anna | письменное подтверждение арендодателя + консорцио |
| 2 | Страхование / declared value | FAQ-05 расширение, S6 | Anna | полис на руках |
| 3 | Точный адрес | S10, S12 FAQ-09, GBP | Anna | подписание аренды |
| 4 | Финальная цена founding | S11, S15 | Anna | итоги A/B, ≥120 лидов на вариант |
| 5 | Формулировка seña + `botón de arrepentimiento` | G3, приём денег | юрист | письменное заключение |
| 6 | Razón social + CUIT | футер, `/privacidad` | Anna | регистрация субъекта |
| 7 | ОК юриста на таблицу S7 (Tier-2 `cochera`) | публикация S7 | юрист | письменное ОК |
| 8 | Перевод Typeform на es-AR | S13, `/gracias` | Anna | ссылка на испанскую версию |
| 9 | Мониторинговая компания, число камер | S6 детализация | Anna | договор |
| 10 | Регистрация БД в AAIP | не блокирует запуск | Anna | подтверждение регистрации |
| 11 | Юр. структура партнёрства Punto: вариант А или Б | G6, §14.4 | юрист | письменное заключение |
| 12 | Habilitación микро-хаба внутри уже habilitado помещения | G6 | юрист + матрикулянт | заключение по рубро |
| 13 | Позиция страховщика по объекту в чужом помещении | G6 | Anna | письменная позиция |
| 14 | Название под-бренда микро-хаба (`Punto CLAVERA` / альтернативы) | публикация `/espacios` | Anna | решение |
| 15 | Цена уровня Punto (−15…−20% от списочной) | публикация цен Punto | Anna | лист `Punto` в Unit Model |
| 16 | Лист `Punto` в BikeHub_Unit_Model_USD.xlsx | §14.5 kill-criterion | Anna | порог подтверждён расчётом |
| 17 | `Anexo Técnico CLAVERA` (1 стр. PDF для девелоперов) | `/gracias-desarrolladores` | Anna | документ готов |
| 18 | Шаблон LOI для девелопера | G6 по B2D | юрист | проверен |
| 19 | Высота потолка и требования к полу — подтверждение на прототипе | требования `/desarrolladores` | Anna | тесты T6, T8 |
| 20 | ОК юриста на лексику `cochera` на `/espacios` | G5 | юрист | письменное ОК |

---

# ПРИЛОЖЕНИЕ Б · Финансовые следствия (для Анны, не для разработчика)

## Б.1 Founding-когорта поднимает требование по ёмкости

Требование «~110 продаваемых мест» выводилось при допущении **единой ставки для всей базы**. Founding-оффер это допущение нарушает: 40 мест на 24 месяца идут со скидкой 20%, и эти 24 месяца — ровно окно выхода на окупаемость.

Пересчёт по выручке:

```
Требуется эквивалент 110 мест по полной цене.
40 мест × 0,80 = 32 эквивалента
Нужно добрать: 110 − 32 = 78 мест по полной цене
Итого продаваемая ёмкость: 40 + 78 = 118 мест
```

**Следствие: минимальная продаваемая ёмкость объекта поднимается с ~110 до ~118 мест.** Это ужесточает и без того узкий фильтр по недвижимости примерно на 8 мест — при плотности вертикальной раскладки это дополнительно ~5–7 погонных метров фронта.

Три способа снять давление, в порядке предпочтения:
1. **Сократить founding-когорту с 40 до 25 мест.** Требование падает до ~115. Дефицит мест — актив, а не проблема: 25 мест дают более сильный сигнал редкости при том же объёме валидации, поскольку порог go/no-go всё равно 30 депозитов, а не 40.
2. **Сократить срок гарантии с 24 до 18 месяцев.** Ослабляет оффер сильнее, чем сокращение количества, — применять во вторую очередь.
3. **Заложить требование 118 в фильтр недвижимости.** Самое честное, самое дорогое.

**Рекомендация: вариант 1.** Он одновременно улучшает экономику и усиливает оффер. Требует правки числа `40` в S11, S12 FAQ и во всех языковых версиях — до запуска, не после.

## Б.2 Ценовой коридор

- Варианты A (65 000) и B (72 000) — внутри целевой зоны Premium 65 000–90 000, где конкурентов нет.
- Вариант C (list 100 000) — тест верхней границы. По модели при 100 000 загрузка падает до ~53%, payback уходит за 80 месяцев **при воронке 300 домохозяйств**; оптимум 82 500 достигается только при пуле ~400. Практически: **C включать только при пропорционально большем охвате**, иначе результат нечитаем.
- Метрика решения — конверсия в депозит по каждому уровню, не конверсия в заявку. Порог 30 депозитов не меняется; при ARPU +30% пропорционально растёт допустимый CAC.

## Б.3 Почему слоган про кочеру снят

При list 90 000–100 000 расстояние до кочеры (120 000–150 000 в Palermo) сокращается: CLAVERA становится 60–80% кочеры, а не половиной. Утверждение перестаёт быть арифметически верным, и в премиальном сегменте это дороже, чем потеря красивой фразы. Коммуникация для B/C смещается с цены на **категорию**: транспорт стоимостью мотоцикла требует инфраструктуры, а не замка. Это уже заложено в S9.

## Б.4 Что этот лендинг не измеряет

Фиксируется прямо, чтобы не переоценить результат:
- он измеряет **готовность платить**, а не **удержание**. Churn остаётся неизвестным до открытия;
- он не измеряет WTP за e-bike- и cargo-тарифы (они не публикуются в v1);
- он не проверяет операционную гипотезу извлечения — это тест T6, физический, и он не заменяется никаким объёмом лидов;
- высокий объём лидов при низком CPL **не является** валидацией. Валидация — 30 оплаченных депозитов. Это правило существует именно для того момента, когда придут дешёвые лиды и появится соблазн подписать аренду.

---

# ПРИЛОЖЕНИЕ В · Терминологический словарь (4 языка)

## В.1 Tier 1 — запрещено везде

| ES | EN | RU |
|---|---|---|
| estacionamiento (de bicicletas) | bike parking, parking | велопарковка, парковка |
| parking, playa de estacionamiento | parking lot | стоянка |
| garaje | garage | гараж |
| cochera *(как самоописание)* | car space | кочера, машиноместо |
| tarifa por hora, por hora | hourly rate | почасовая оплата, тариф в час |
| bicicletero municipal | municipal bike rack | муниципальная велостоянка |
| guardacoches | valet | парковщик |

## В.2 Tier 2 — только в сравнении/отрицании, с ОК юриста

| ES | EN | RU | Где разрешено |
|---|---|---|---|
| cochera de auto | car garage | автомобильная кочера | заголовок колонки таблицы S7 |

## В.3 Tier 3 — рекомендуемое ядро

| ES | EN | RU |
|---|---|---|
| guardería segura de bicicletas | secure bike storage | безопасное хранение велосипедов |
| guarda segura | secure storage | безопасное хранилище |
| depósito y custodia por membresía | membership-based storage and custody | хранение по подписке |
| lugar asignado | assigned space | закреплённое место |
| hub de micromovilidad | micromobility hub | хаб микромобильности |
| infraestructura urbana de guarda | urban storage infrastructure | городская инфраструктура хранения |
| socio, membresía | member, membership | участник, членство |

## В.4 Запрещённые обещания (все языки)

`responsabilidad total` · `garantía contra robo` · любые страховые суммы · `climatizado` с параметрами · часы доступа без `según el hub` · сроки открытия · адрес до подписания аренды · сравнение с веломагазинами и бесплатными муниципальными guarderías.

---

# ПРИЛОЖЕНИЕ Г · Трассируемость правок к аудиту прототипа

| # | Замечание по прототипу | Раздел v1.4 | Статус |
|---|---|---|---|
| 1 | `del 20% sobre el precio de lista` — смысл инвертирован | S11 / B1 | исправлено |
| 2 | FAQ про страховку обещает несуществующий продукт | S12 / B2 | исправлено |
| 3 | Нет политики конфиденциальности при сборе ПД | Часть XI / B3 | задача поставлена |
| 4 | Домен билдера | §9.1 / B4 | задача поставлена |
| 5 | A/B цены технически невозможен | Часть IV / B5 | схема заменена |
| 6 | Форма из 7 полей | S11 | сокращено до 4 |
| 7 | WTP-вопрос якорит вниз и дублирует van Westendorp | S11, S13 | перенесено в Typeform |
| 8 | Belgrano и Palermo как зоны размещения | S10, §7.4 | Belgrano убран, Palermo переквалифицирован |
| 9 | RU/EN версии без сегментации лидов | Часть V | введено правило ≥70% ES |
| 10 | Опрос конкурирует с формой за клик | S13, S15 | перенесён на `/gracias` |
| 11 | Нет трекинга, UTM, событий | Часть X | таксономия задана |
| 12 | 24/7 — центральное обещание бренда | S1, S3, S6 | разжижено до 1 из 8 пилонов + сноска |
| 13 | `40 s` опубликовано до теста T6 | §0.6, S2, S4, S9 | удалено, введено правило доказуемости |
| 14 | Таблица сравнения с кочерой отсутствует | S7 | восстановлена без раскрытия цены |
| 15 | 40 founding-мест vs требование ёмкости | Приложение Б.1 | пересчёт: ~118 мест, рекомендация 25 мест |
| 16 | Нет WhatsApp-канала | S15, §10.1 | добавлен |
| 17 | FAQ-02 без срока уведомления | S12 FAQ-04 | 30 дней |
| 18 | Формулировка «зон» на сайте лучше документа | S10 | документ приведён к сайту |
| 19 | Рендеры не предусмотрены | S8, Часть III | полный бриф |
| 20 | SEO / GEO / AEO не заданы | Части VI, VII, VIII | заданы |
| 21 | Palermo/Belgrano исключены как класс | §10.1 | пересмотрено: закрыт канал, не район. Двухклассовая модель зон |
| 22 | Девелоперский трек не имел точки входа | Часть XIII | страница `/desarrolladores` |
| 23 | Кочеры и общественные пространства не имели предложения | Часть XIV | страница `/espacios` + продукт Punto 10–20 мест |

---

# ПРИЛОЖЕНИЕ Д · Открытые расхождения между документами

| # | Расхождение | Документы | Что делать |
|---|---|---|---|
| 1 | Kill-criterion порог: $18,85/слот (до IVA) vs ~$15,58 (после) | Pricing v1.0 vs IVA-коррекция | пересчитать Pricing v1.0 → v1.1 |
| 2 | Требование ёмкости 91 / 110 / 118 мест | Storage Architecture v2.1 / IVA-модель / это ТЗ Б.1 | зафиксировать 118 (или 115 при founding=25) в Site Score v3.0 |
| 3 | «Primer hub: Chacarita» vs «карта спроса до выбора» | Landing v1.1 vs v1.4 | v1.4 выигрывает, снято |
| 4 | Founding 40 мест vs go/no-go 30 депозитов | v1.1 vs Assessment §16 | привести к 25 мест / 30 депозитов |
| 5 | Мезонин в старых визуальных наработках | Architecture 3 | исключён нормой, из рендеров запрещён |
| 6 | **«Palermo Hollywood закрыт как категория» vs зона B открыта** | Site scouting log vs §10.1 | формулировку в логе уточнить: закрыта связка «район × ground-floor local», не район |
| 7 | **Kill-criterion не имеет варианта для revenue-share** | Site Score v2.2 / §14.5 | ввести в Site Score v3.0 отдельную ветку оценки для asset-light объектов |
| 8 | **Site Score не оценивает партнёрские помещения** | Site Score v2.2 vs §14.2 | добавить упрощённый скоринг «Punto» на 8 гейтах + ёмкость |
| 9 | Двухуровневая линейка Hub / Punto не отражена в Pricing | Pricing v1.0 vs §14.2 | ввести уровень Punto при пересчёте на IVA |

---

# ПРИЛОЖЕНИЕ Е · Внутренний реестр девелоперских кандидатов `[НЕ ПУБЛИКУЕТСЯ]`

Требует полевой и брокерской верификации. **Ни один адрес не появляется на `/desarrolladores`.**

| Объект | Сдача | Статус проверки | Следующее действие |
|---|---|---|---|
| Humboldt 1339 / 1345 | апрель–июль 2027 | не верифицирован | найти девелопера, запросить план подвала |
| Palpa 3524 | 2027 | не верифицирован | то же |
| Paraguay 5400 | 2027 | не верифицирован | то же |
| Zapata 200 | 2027 | не верифицирован | то же |

**Последовательность контакта (нейтральное позиционирование, из принятой практики):**
1. Первое сообщение — запрос плана подвала и графика сдачи. Без раскрытия назначения.
2. Второе — исследование ёмкости как бесплатный артефакт.
3. Третье или личная встреча — полное раскрытие модели и структуры сделки.

**Критическая проверка для каждого объекта, до всего остального:** зарегистрирован ли уже *reglamento de copropiedad* и раздроблён ли гараж на *unidades complementarias*. Если да — объект переходит из «девелоперского трека» в «трек B2P по отдельным собственникам» и его приоритет резко падает.

---

**Конец документа. CLAVERA_Site_TZ_v1_5.**
Следующая ревизия — после: (а) закрытия блокеров B1–B5, (б) первых 200 лидов B2C, (в) первого визита по B2P. Предмет пересмотра: S7 (диапазон кочеры), S2 (возврат числа из опроса), Часть VII (запуск гео-страниц), §14.5 (порог Punto по факту первого соглашения), Приложение Б (пересчёт при решении по founding = 25).
