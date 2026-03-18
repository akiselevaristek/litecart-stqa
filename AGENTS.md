# AGENTS

## Locator Rules

- Для поиска ссылок по части `href` не писать локатор вручную через `.//a[contains(@href, "...")]`.
- В таких случаях обязательно использовать helper [`src/utils/getLocator.ts`](/Users/akiselev/VSCodeProject/litecart-stqa/src/utils/getLocator.ts), а именно `byHrefPart(root, part)`.
- Не использовать для этого CSS-селекторы вида `a[href*="..."]`.
- Не создавать спек файлы для проверок
