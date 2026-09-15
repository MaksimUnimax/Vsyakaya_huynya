# B1 Candidate — Self-Service Returns / Exchanges Portal for Russian E-commerce

Статус: `PROMISING__DEEP_RESEARCH_REQUIRED`

Дата первого прохода: 2026-09-15.

## Короткая формулировка

Коробочный слой возвратов/обменов для независимых интернет-магазинов:

`покупатель открывает branded return portal -> находит заказ -> выбирает товар/причину -> система применяет return-policy -> предлагает refund / exchange / store credit -> создаёт обратную доставку -> магазин видит статус -> возврат денег/обмен доводится до конца`.

Не новый CMS, не новая служба доставки и не фулфилмент. Задача — склеить customer-facing процесс возврата между магазином, платёжкой, CMS/учётом и обратной логистикой.

## Почему кандидат найден через Strategy B

На западном рынке это зрелая отдельная категория.

Loop Returns продаёт returns-management SaaS с self-service portal, автоматическими политиками возврата, обменами, store credit, instant exchanges, fraud rules, return routing и carrier integration. Публичный pricing начинается примерно с $155/месяц для Essential и $340/месяц для Advanced.

Loop заявляет работу с тысячами брендов и позиционирует обмен/store-credit не просто как поддержку возврата, а как способ удержать выручку вместо refund.

Категория не сводится к генерации return label: ценность — automated policy + customer self-service + exchange-first workflow + reverse logistics + analytics.

## Что найдено в России

Российский рынок **не пуст по отдельным кускам**:

### inSales

inSales Доставка умеет оформить клиентский возврат после доставки через СДЭК: магазин в админке выбирает возвращаемые товары, создаёт возврат и получает трек-номер. Это полезная merchant-side логистика, но в найденной документации процесс запускается из панели магазина, а не как полноценный покупательский self-service portal с exchange/store-credit/rules workflow.

### СДЭК Фулфилмент

СДЭК предлагает автономную физическую обработку возвратов: принять товар, сверить штрихкод, проверить состояние/брак, сформировать документы и вернуть товар в оборот. Это downstream fulfillment, а не software-layer покупательского возврата.

### ApiShip

ApiShip имеет API `POST /orders/return` и поддерживает клиентский возврат для СДЭК, Почты России, E-Bulky и 5Post. Это хороший building block для multi-carrier return logistics.

### 1С-Битрикс / custom stores

Есть отдельные кастомные кабинеты/формы возврата, но текущий поиск не выявил очевидного российского горизонтального SaaS, который продаётся интернет-магазинам как самостоятельная end-to-end returns/exchanges platform уровня узкого Loop Returns.

`NOT_FOUND_IN_SEARCH` не означает `DOES_NOT_EXIST`. Следующий pass должен агрессивно искать 1С-Битрикс modules, InSales apps, retail CRM, OMS, фулфилменты, платёжные сервисы и custom agencies.

## Почему подходит под OWNER_VERIFIABILITY_GATE

Качество можно проверить обычным end-to-end тестом без узкой отраслевой экспертизы:

1. есть заказ;
2. покупатель создал запрос;
3. policy разрешила/запретила нужный outcome;
4. возвратная накладная/код реально создан;
5. carrier status меняется;
6. обменный заказ создан или refund реально отправлен;
7. склад/остаток обновлён;
8. клиент получает правильный статус.

Ошибки видны в конкретном workflow, логах и деньгах.

## Возможный узкий MVP

Не начинать с универсальной платформы.

Вариант MVP:

`InSales или 1С-Битрикс + CDEK/ApiShip + одна платёжка`.

Покупателю:

- ссылка `/return`;
- номер заказа + телефон/email;
- товары заказа;
- причина возврата;
- фото при браке;
- refund или обмен размера/варианта;
- автоматически созданный return shipment;
- страница статуса.

Магазину:

- очередь возвратов;
- правила eligibility/window;
- approve/deny exceptions;
- status from carrier;
- trigger refund/exchange;
- basic analytics reasons/return rate.

Только после proof-of-value добавлять store credit, instant exchanges, fraud scoring, multi-carrier routing и другие сложные функции.

## Почему это может быть нужно

Российские источники подтверждают, что возврат остаётся многошаговым процессом между сайтом, складом и платёжной системой; отдельные интеграторы в 2026 году всё ещё продают проекты по автоматизации возвратов как custom work.

СДЭК Фулфилмент отдельно пишет, что без выстроенной системы возвраты увеличивают нагрузку на склад, сотрудников и операционные расходы, и предлагает автономную физическую обработку для магазинов от ~300 заказов/месяц.

То есть боль реальна; вопрос не в наличии проблемы, а в том, достаточно ли большой gap между существующими CMS/logistics features и полноценным коробочным returns portal.

## Главные риски

### A. Incumbents могут быстро закрыть gap

inSales уже имеет client return logistics; CDEK уже имеет fulfillment; ApiShip уже имеет return API. Любой из них теоретически может добавить customer-facing portal. Значит «мы первые сделали форму возврата» — слабый moat.

### B. 1С-Битрикс/custom рынок может быть скрыто заполнен

Крупные магазины часто имеют свой личный кабинет возврата. Нужно понять, сколько mid-market магазинов действительно нуждаются в отдельном SaaS, а сколько просто заказывают доработку интегратору.

### C. Экономика зависит от vertical

Fashion/обувь имеют высокий return rate и сильную ценность обмена размера вместо возврата денег. В других категориях возвратов может быть слишком мало для отдельной подписки.

### D. Российское право/кассовые чеки/возвраты платежей

Правила eligibility должны быть корректными, но MVP не должен автоматически решать спор о качестве товара. Система автоматизирует clear-policy cases, спорные отправляет человеку.

### E. Copyability

Moat должен строиться не на форме, а на integrations/workflow/history: CMS + OMS + payment + carriers + exchange logic + return analytics. Иначе incumbent скопирует за несколько недель.

## Kill-test до разработки

1. Найти 15–20 независимых магазинов fashion/обувь/товары с заметными возвратами.
2. Узнать фактический текущий flow от сообщения клиента до refund/exchange.
3. Посчитать tickets/returns per month и minutes per return.
4. Проверить, есть ли self-service portal уже сейчас и на чём он сделан.
5. Проверить willingness-to-pay за уменьшение ручной работы и увеличение exchange rate.
6. Отдельно спросить, сколько refund можно сохранить как exchange/store credit.

`KILL`, если:

- большинство целевых магазинов уже имеют нормальный self-service flow из коробки;
- возвратов слишком мало;
- весь value фактически уже даёт InSales/CDEK/fulfillment;
- merchant не готов платить отдельно за returns software;
- integration support превращает продукт в custom-development agency.

## Предварительный verdict

`PROMISING__DEEP_RESEARCH_REQUIRED`

Предварительный score: ~6.5/10.

Плюсы:

- западный willingness-to-pay доказан;
- российская боль объективно существует;
- user result легко QA;
- нет дорогого data API;
- MVP можно ограничить одной CMS + одной логистикой;
- продукт близок к e-commerce, где владелец способен контролировать workflow.

Минусы:

- российские incumbents уже владеют важными building blocks;
- moat слабее, чем у recovery-audit модели;
- нужно доказать, что это самостоятельная SaaS-категория, а не просто feature CMS/fulfillment.

## Evidence URLs

Western:
- https://www.loopreturns.com/pricing/
- https://www.loopreturns.com/solutions/returns-management-solutions/
- https://help.loopreturns.com/en/articles/1913025

Russia / adjacent:
- https://www.insales.ru/collection/klientskiy-vozvrat
- https://www.insales.ru/page/delivery
- https://www.ff.cdek.ru/uslugi/obrabotka-vozvratov
- https://docs.apiship.ru/docs/api/order-service/return-order/
- https://process-buro.com/zhurnal/avtomatizatsiya-vozvratov-v-magazine
