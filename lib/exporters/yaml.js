import YAML from "yaml";
import { promises as fs } from "fs";

export default async (path, content) => {
  const filePath = path + ".yml";

  const doc = new YAML.Document();
  doc.contents = content;
  const output = doc.toString();

  await fs.writeFile(filePath, output);

  return filePath;
};
