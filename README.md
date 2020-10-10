# @razbakov/sourcy

> Synchronise data from Google Sheets

## Installation

```bash
yarn add @razbakov/sourcy -D
```

Add to package.json:

```json
{
  "scripts": {
    "sourcy": "sourcy"
  }
}
```

Create **sourcy.config.js** in project root:

```js
module.exports = {
  sources: [
    {
      spreadsheetId: "spreadsheet id",
      range: "sheet name",
      output: "./locales/",
      transformer: "i18n",
      format: "yaml", // or json
    },
  ],
};
```

Execute and follow instructions:

```bash
yarn sourcy
```

## Transformer: i18n

**Input:**

| key        | en   | de         | es             | ru      |
| ---------- | ---- | ---------- | -------------- | ------- |
| home.title | Home | Startseite | Página inicial | Главная |

**Output:**

```
en.yml
    home.title: Home

de.yml
    home.title: Startseite

es.yml
    home.title: Página inicial

ru.yml
    home.title: Главная
```
