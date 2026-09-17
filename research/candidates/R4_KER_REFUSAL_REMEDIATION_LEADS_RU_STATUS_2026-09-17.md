# R4 KER Refusal Remediation Leads RU — Current Status Override

Дата: 2026-09-17

Связанная исходная карточка:

`research/candidates/R4_KER_REFUSAL_REMEDIATION_LEADS_RU.md`

## CURRENT STATUS

`HOLD_HIGH__HIGH_VALUE_FAILURE_SIGNAL_EXISTS__NATIVE_POST_REFORM_REFUSAL_VOLUME_NOT_DEMONSTRATED__SOURCE_COMPLETENESS_FRAGMENTED`

Этот файл является текущим status override для исходной карточки от 2026-09-16.

Старый header status в исходной карточке:

`PROMISING_R4__PUBLIC_FAILED_MANDATORY_KER_EVENTS__HIGH_TICKET_REMEDIATION_LEADS__STEADY_STATE_VOLUME_AND_CONVERSION_OPEN`

считать устаревшим после strict post-01.03.2026 re-audit.

## Почему статус понижен

После отделения `LEGACY_GISP_CARRYOVER` от реального `NATIVE_EPGU` выяснилось:

1. значительная часть видимых отказов марта–мая 2026 относится к заявкам, поданным до 01.03.2026;
2. в Коми/НАО есть 22 post-reform application rows и несколько последующих выдач, но current 2026 refusal table содержит только январь–февраль;
3. Сибирское управление прямо подтверждает native EPGU applications в апреле–июне, но нормализованные visible refusal examples в проверенной channel-labelled выборке относятся к ГИСП/legacy;
4. Самара/Ульяновск: минимум 4 из 5 entries в разделе отказов 2026 имеют pre-reform application history;
5. Забайкалье: апрельский отказ КУЛТУМИНСКОГО доказан как carry-over заявки 25.02.2026;
6. несколько территорий после миграции публикуют только XLS/XLSX decision registries либо неполные application surfaces;
7. центральный current KND register технически не доступен в текущем research environment для надежного lifecycle close-out.

## Что остается сильным

- официальный failed mandatory event существует;
- refusal reason/document может быть публичным;
- remediation window в реальных кейсах длится недели/месяцы;
- экологическое сопровождение КЭР — high-ticket service;
- vendor switch после провала реально встречается;
- residual population без КЭР в 2026 остается существенной.

## Что не доказано

Главное:

`достаточное число новых уникальных native post-reform refusal companies в месяц`.

Без этого нельзя переходить к buyer test или product build.

## Reopen conditions

Reopen / promote только если появится одно из двух:

1. row-level доступ к свежим региональным decision registries / central KND позволяет посчитать широкий native post-reform corpus и показывает экономически полезную частоту отказов;
2. официальный национальный источник публикует post-01.03.2026 application/refusal statistics, достаточные для K1.

## Authority evidence

Текущую оценку задают в первую очередь:

- `research/evidence/ker_refusal_remediation_native_epgu_corpus_pass_1_2026-09-17.md`;
- `research/evidence/ker_refusal_remediation_native_epgu_corpus_pass_2_2026-09-17.md`;
- `research/evidence/ker_refusal_remediation_post2026_pass2_correction_2026-09-17.md`.

До выполнения reopen conditions кандидат не является active #1.