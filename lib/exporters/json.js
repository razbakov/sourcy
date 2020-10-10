import { promises as fs } from "fs";

export default async (path, content) => {
  const filePath = path + ".json";
  await fs.writeFile(filePath, JSON.stringify(content));

  return filePath;
};
