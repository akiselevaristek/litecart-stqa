# Litecart STQA

Стартовая заготовка проекта для UI-автотестов на `Playwright + TypeScript` для сайта [litecart.stqa.ru](https://litecart.stqa.ru).

## Stack

- Playwright
- TypeScript
- dotenv

## Project Structure

```text
.
├── .env.dist
├── playwright.config.ts
├── src
│   ├── components
│   ├── config
│   ├── fixtures
│   ├── pages
│   └── utils
└── tests
```

`src/config` является единой точкой входа для runtime-конфига. Тесты и вспомогательный код не должны читать `process.env` напрямую.

## Setup

1. Установить зависимости:

```bash
npm install
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

Открыть HTML-отчёт Playwright:

```bash
npm run report
```

## Notes

- В `playwright.config.ts` включен `ignoreHTTPSErrors: true`, потому что у тестового стенда просроченный SSL сертификат.
- Пока добавлена только инфраструктура без тест-кейсов.
- Папки `pages`, `components`, `fixtures`, `utils`, `constants` созданы как задел под следующую итерацию.

## GitHub

Когда проект будет готов к публикации, можно добавить или обновить remote и отправить код в публичный репозиторий GitHub обычным `git push`.
