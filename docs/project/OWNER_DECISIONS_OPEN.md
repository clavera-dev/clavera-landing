# CLAVERA — открытые решения владельца/дизайнера (сводка)

Дата: 2026-09-29. Статус: **справочник, ничего не одобряет и не меняет.**

## 1. Все открытые пункты

| ID | Вопрос | Варианты | Значение по умолчанию, если есть | Что нужно для решения | Что блокирует | Источник |
|---|---|---|---|---|---|---|
| D1 | Достаточно ли текстового ресёрча (без браузера), чтобы называть строки композиционной матрицы «reference-driven»? | принять текстовый ресёрч как достаточный / держать P1,P2,P5–P8,P11 как content-order-only до сессии с рендерингом | Спека остаётся `[proposal]` для layout/visual; 4 из 11 строк (P3,P4,P9,P10) имеют content-order support | ничего срочно; полное закрытие нужно browser/screenshot run | «reference-driven» статус спеки; п.1 approval-чеклиста | `M4_REFERENCE_COMPOSITION_SPEC.md` §15 D1, §1; `M4_REFERENCE_FOLLOWUP.md` §2 |
| D2 | Масштаб statement в S2: 72px (default) / 56px (иерархическая альтернатива) / 84px (exception) | 72 / 56 / 84 | 72 (уже реализовано) | ничего — уже на дефолте | ничего срочно | `M4_REFERENCE_COMPOSITION_SPEC.md` §15 D2, §14 O-11; `M4_CURRENT_HANDOFF.md` §3 |
| D3 | Подтверждает ли дизайнер сужение uppercase-mono (T2) до коротких лейблов, вместо нынешнего `.mono` как построено? | подтвердить сужение / оставить как построено | оставить как построено (deferred в M5.1) | designer sign-off, без браузера | закрытие M5.1 по T2 | `M4_REFERENCE_COMPOSITION_SPEC.md` §15 D3, §14 O-14; `M4_CURRENT_HANDOFF.md` §3 |
| D4 | Короткий телефон hero: вариант A (backdrop) или B (band)? | A / B / решение Кирилла после прототипа | нет дефолта — «prototype both; no default choice» | browser run: 375×667 ES/EN/RU скриншоты + контраст disclosure/eyebrow/H1 | закрытие M5.2; условный мобильный мастер R1 зависит от исхода | `M4_REFERENCE_COMPOSITION_SPEC.md` §15 D4; `M4_CURRENT_HANDOFF.md` §3 O-01/H-1; `M5_2_RESULT.md` §2,§5; `M5_IMAGE_PRODUCTION_BRIEF_HF.md` §5; `M4_REFERENCE_FOLLOWUP.md` §2 |
| D5 | Хостинг шрифтов (self-hosted ≤2 файла vs CDN-linked) + проверка кириллицы | self-hosted / CDN | Type-dependent суждения помечаются invalid без решения | designer/owner решение + browser run для Cyrillic check | M5.6 | `M4_REFERENCE_COMPOSITION_SPEC.md` §15 D5, §14 O-12 |
| D6 | Мобильный layout S7 (C-1) и юридический статус S7 | подтвердить C-1 / изменить; юр. статус — отдельно | Scroll region остаётся | designer решение по C-1 + отдельное юридическое одобрение S7 (вне этой задачи) | M5.7; O-09 gated on S7 legal sign-off | `M4_REFERENCE_COMPOSITION_SPEC.md` §15 D6, §14 O-09; `M4_CURRENT_HANDOFF.md` §3, §4 |
| D7 | Копия ES/EN/RU для empty-state зонового селектора (нет совпадений при поиске) | любая формулировка (сейчас — только структура) | нет — «Structure only» | owner copy, без браузера (добавить `empty:` в три locale-файла) | рендер empty-state сообщения (сейчас слот пуст) | `M4_REFERENCE_COMPOSITION_SPEC.md` §15 D7; `M4_CURRENT_HANDOFF.md` §3 O-04/SEL-1; `M5_2_RESULT.md` §1, §5 п.4 |
| D8 | Может ли M4.1 evidence run быть выполнен в этом харнессе (deps не установлены) или должен запускаться Кириллом/Codex? | в харнессе / Кирилл/Codex локально | Run locally by Kirill/Codex | shell/browser сессия от Кирилла или Codex | M5.0 | `M4_REFERENCE_COMPOSITION_SPEC.md` §15 D8 |
| P8-legend | Пересмотреть якорь P8 (index-numeral legend рядом с R6) в сторону «dimensions/caption labelled in place» (паттерн найден 3 раза) или оставить оригинальной конструкцией CLAVERA? | revise toward caption-in-place / оставить как есть | нет — designer call | designer решение, без браузера (визуальный acceptance test для самого якоря — отдельно, остаётся OPEN) | ничего срочно в M5 (content-order-only pass code change не разблокирует) | `M4_REFERENCE_FOLLOWUP.md` §2, §1 (P8) |
| R-6b | Если шаг поверхности R-6(a) (raised/base alternation, S10–S13) читается too faint — переход на R-6(b) (`--bg-elevated`) или revert? | R-6(b) / revert | нет — «Needs Kirill/designer — not a default» | browser run: full-page captures ES/EN/RU 375/768/1440, S9–footer, до/после | подтверждение или откат текущего R-6(a); по тексту источника прогоняется вместе с D4 | `M5_NEXT_RESULT.md` §5 |
| S13-coda | Если S13 (Encuesta) «coda» детачится визуально на новой поверхности (base после S12 raised) — двигать S13 на raised (ломает строгую альтернацию) или принять как есть? | move to raised / accept as-is | нет — designer call | тот же browser run, что R-6b | тот же browser session | `M5_NEXT_RESULT.md` §5 |
| S6-repl | Одобряет ли владелец заказ замены рендера S6 (entrance) — единственный слот, где вообще предлагается новая генерация? | одобрить генерацию / оставить legacy-актив как есть | нет; статус «genuinely useful, но не срочный блокер» | owner approval; если да — также новый alt/caption ES/EN/RU (отдельное копирайт-решение) и юр./владельческое подтверждение, что prompt без камеры не противоречит будущему VSaaS-решению | заказ HF-генерации для S6 | `M5_IMAGE_PRODUCTION_BRIEF_HF.md` §12 пп.2,3,5; §8 |
| R1-mobile-master | Заказывать ли отдельный портретный (≈3:4/4:5) мобильный мастер R1 (стеллаж+логотип в нижней трети) для короткого телефона? | заказать conditional master / не заказывать | не заказывать сейчас — «До этой развилки — не заказывать» | сначала D4 (CSS-прототипы A/Б); только если Кирилл забракует обе CSS-опции, вопрос становится предметным | полностью зависит от исхода D4 | `M5_IMAGE_PRODUCTION_BRIEF_HF.md` §5 |
| r3-orphan | Рендер `r3` (Zona de autolavado, `src/data/media.ts` + `src/i18n/*.ts`) не рендерится ни одним компонентом под `src/components/sections/` — wire up в секцию, удалить как dead config, или оставить? | wire up / remove / оставить как есть | нет — «Not verified as a bug — flagging for a human decision» | product/content решение, без браузера | ничего срочно; вне scope M8 preflight. Осторожно: не путать с легаси-активом «entrance», который в старой job-ID таблице тоже исторически подписан «r3» (`M5_IMAGE_PRODUCTION_BRIEF_HF.md` §3) — это другой файл | `M8_PREFLIGHT.md` §3 |
| Escape | Escape в `ZoneSelector` не должен очищать поле, даже если список уже закрыт (иначе `input`-событие переоткрывает список) | оставить как реализовано / owner может отменить | решение уже принято worker'ом, не владельцем | ничего, если Кирилл согласен; иначе — указать другое поведение | ничего; уже implemented | `M5_2_INTERACTION_FIX.md` §1 («Decision: Escape never clears the field…») |

Расхождений между источниками по одному и тому же ID не найдено — там, где документ встречается несколько раз (D1, D4, D7), формулировки друг друга не противоречат, только добавляют детали.

## 2. Можно решить прямо сейчас без браузера

D2 · D3 · D6 (дизайнерская часть C-1; юр. часть S7 — отдельный гейт) · D7 · D8 · P8-legend · S6-repl · r3-orphan · Escape (подтвердить или отменить)

## 3. Требует скриншотов или прогона

D1 (для полного визуального статуса) · D4 · D5 (Cyrillic check) · R-6b · S13-coda · R1-mobile-master (косвенно, через D4)

## 4. Гейты релиза — отложены намеренно, не вопросы для этой сессии

- Подпись юриста на легальных текстах — `M4_M10_LIVE_ROADMAP.md` строка 6, 111.
- Номер RNBD (или письменное решение о запуске без него) — `M4_M10_LIVE_ROADMAP.md` строка 6, 111.
- Реальная дата публикации — `M4_M10_LIVE_ROADMAP.md` строка 111.
- URL формы Avisame (пилотный интерес) — `M4_M10_LIVE_ROADMAP.md` строка 109, 111.
