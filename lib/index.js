#!/usr/bin/env node

import { google } from "googleapis";
import loadConfig from "./config";
import auth from "./auth";
import tI18n from "./transformers/i18n";
import tRows from "./transformers/rows";
import tMap from "./transformers/map";
import json from "./exporters/json";
import yaml from "./exporters/yaml";
import mkdirp from "mkdirp";
import path from "path";

function transform(rows, transformer) {
  switch (transformer) {
    case "i18n":
      return tI18n(rows);
    case "rows":
      return tRows(rows);
    case "map":
    default:
      return tMap(rows);
  }
}

async function save(filePath, content, format) {
  switch (format) {
    case "yaml":
      return await yaml(filePath, content);
    case "json":
    default:
      return await json(filePath, content);
  }
}

async function main() {
  const config = loadConfig();

  await auth(config);

  const sheets = google.sheets({ version: "v4" });

  for (let source of config.sources) {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: source.spreadsheetId,
      range: source.range,
    });

    const content = transform(res.data.values, source.transformer);

    await mkdirp(source.output);

    const files = Object.keys(content.files);

    for (let file of files) {
      const filePath = path.join(source.output, file);
      try {
        const savedFile = await save(
          filePath,
          content.files[file],
          source.format
        );

        console.log("Saved ", savedFile);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

(async function () {
  await main();
})();
