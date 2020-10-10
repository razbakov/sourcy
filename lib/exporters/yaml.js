import YAML from "json2yaml";
import { promises as fs } from "fs";

export default async (path, content) => {
  const filePath = path + ".yml";
  await fs.writeFile(filePath, YAML.stringify(content));

  return filePath;
};
