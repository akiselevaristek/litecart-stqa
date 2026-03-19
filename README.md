# Litecart STQA

Тестовй проект UI-автотестов на `Playwright + TypeScript` для сайта [litecart.stqa.ru](https://litecart.stqa.ru).

## Stack

- Node.js / npm
- Playwright Test
- TypeScript
- dotenv
- Faker
- Cheerio

## Project Structure

```text
.
├── .env.dist             # шаблон локальных переменных окружения
├── playwright.config.ts  # общая конфигурация Playwright
├── src                   # исходный код тестового фреймворка
│   ├── api               # API-хелперы и вспомогательные функции для технических шагов вне UI
│   ├── components        # переиспользуемые UI-компоненты и виджеты страниц
│   ├── config            # runtime-конфиг, env parsing, URL-ы и auth-настройки
│   ├── fixtures          # кастомные Playwright fixtures и единая точка входа `test`
│   ├── generators        # генераторы тестовых данных
│   ├── pages             # page objects для страниц и крупных секций
│   └── utils             # общие утилиты, локаторные helper-ы, логирование, работа с сессией
└── tests                 # пользовательские e2e-сценарии
    ├── auth              # сценарии авторизации
    └── order             # сценарии оформления заказа
```

`src/config` является единой точкой входа для runtime-конфига. Тесты и вспомогательный код не должны читать `process.env` напрямую.

### Как устроен тест

Типичный поток выглядит так:

1. Спек из `tests` импортирует `test` из `@fixtures`.
2. Fixture поднимает нужные page objects и зависимости.
3. Page object из `src/pages` использует компоненты из `src/components`.
4. При необходимости сценарий опирается на конфиг из `src/config`, генераторы из `src/generators` и утилиты из `src/utils`.
5. Для отдельных технических действий без UI могут использоваться helper-методы из `src/api`.

## Setup

1. Установить зависимости:

```bash
npm ci
```

2. Создать локальный `.env` на основе шаблона:

```bash
cp .env.dist .env
```

3. Заполнить `.env`:

```dotenv
EMAIL=your-email
PASSWORD=your-password
```

4. Установить браузер Chromium для Playwright:

```bash
npx playwright install chromium
```

## Run

Запуск тестов:

```bash
npm test
```

Запуск в UI режиме:

```bash
npm run test:ui
```

Запуск в headed режиме:

```bash
npm run test:headed
```

## CI

В репозитории настроен минимальный GitHub Actions workflow для `push` в `main` и для `pull_request`.

Для успешного прогона в настройках репозитория должны быть добавлены secrets:

- `EMAIL`
- `PASSWORD`

Workflow использует `npm ci`, устанавливает `chromium` для Playwright и запускает `npm test`.
При любом результате в artifacts выгружаются `playwright-report` и `test-results`, поэтому при падении можно скачать HTML-отчёт, trace, screenshots и другие артефакты прогона.

## Notes

- В `playwright.config.ts` включен `ignoreHTTPSErrors: true`, потому что у тестового стенда просроченный SSL сертификат.
