# Litecart STQA

Стартовая заготовка проекта для UI-автотестов на `Playwright + TypeScript` для сайта [litecart.stqa.ru](https://litecart.stqa.ru).

## Stack

- Playwright
- TypeScript
- dotenv

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
│   ├── test-data         # статические данные для тестовых сценариев
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
4. При необходимости сценарий опирается на конфиг из `src/config`, тестовые данные из `src/test-data`, генераторы из `src/generators` и утилиты из `src/utils`.
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
