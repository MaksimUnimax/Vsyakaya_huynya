# B1 — Dependabot for Wildberries/Ozon API Changes

Дата закрытия: 2026-09-16

Статус: `KILL__INITIAL_TAM_TOO_NARROW_AND_GLOBAL_WTP_TOO_LOW`

## Идея

`upstream WB/Ozon API change -> identify affected repositories/call sites -> generate bounded fix -> run tests -> open reviewable PR`.

Не обычный changelog monitor и не OpenAPI diff.

## Что подтвердилось

Боль реальна. WB регулярно публикует изменения, которые требуют адаптации интеграций: отключение deprecated methods, новые token categories, смена доменов, изменения параметров/форматов и семантики полей.

Механика также существует за рубежом:

- Patchbase — https://www.patchbase.space/
- KeelCat — https://keelcat.in/
- Specc — https://www.speccapp.com/

KeelCat уже делает полный workflow watch -> locate -> fix -> verify -> PR для TS/JS/Python/Java/C/C++.

## Причина KILL

Главный отрицательный факт — pricing / category maturity.

На 2026-09-16 KeelCat публично продаёт:

- $15/developer/month monthly;
- $12/developer/month annual;
- unlimited runs and PRs.

Patchbase остаётся invite-only и намеренно покрывает очень узкий набор providers. Specc также выглядит ранней категорией.

Это означает, что даже глобально продуктовая категория пока не демонстрирует высокий ACV / зрелую willingness-to-pay.

Российский стартовый рынок ещё уже: не все WB/Ozon sellers, а только SaaS/integrators/internal teams, которые самостоятельно поддерживают marketplace API integrations.

Дополнительно generic coding agents резко снижают incremental value автоматического patching: после того как change alert известен, Codex/Claude/GitHub agents уже способны выполнить значительную часть migration work. Отдельный продукт должен монетизировать именно continuous monitoring/exposure graph, но глобальная цена показывает, что рынок пока оценивает это сравнительно дёшево.

## Почему owner-fit не спасает

Кандидат отлично проходил owner-verifiability:

- affected call site можно проверить;
- diff можно просмотреть;
- CI/tests дают бинарную проверку.

Но Strategy B требует достаточной коммерческой экономики, не только технически красивой задачи.

## Не возвращаться как

- API changelog monitor;
- OpenAPI diff for WB/Ozon;
- automatic migration PR for marketplace API;
- Dependabot for WB/Ozon;

без нового доказательства существенно большего российского buyer universe или намного более высокого willingness-to-pay.

## Final status

`KILL__INITIAL_TAM_TOO_NARROW_AND_GLOBAL_WTP_TOO_LOW`

Боль существует, но RU-only wedge слишком узок, а глобальная price signal слишком слабая для отдельного приоритетного бизнеса.