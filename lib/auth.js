import { google } from "googleapis";
import { promises as fs } from "fs";
import inquirer from "inquirer";
import mkdirp from "mkdirp";
import { dirname } from "path";

async function loadJson(path) {
  let result = false;

  try {
    const json = await fs.readFile(path);
    result = JSON.parse(json);
  } catch (err) {}

  return result;
}

async function getNewCredentials(config) {
  console.log(
    `Download credentials.json from https://developers.google.com/sheets/api/quickstart/nodejs`
  );

  const { filePath } = await inquirer.prompt([
    {
      type: "input",
      name: "filePath",
      message: "Enter full path to downloaded file",
    },
  ]);

  const credentials = await loadJson(filePath);

  if (!credentials) {
    throw Error("Unable to load credentials");
  }

  return credentials;
}

async function getNewToken(oAuth2Client, scope) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope,
  });

  console.log("Authorize this app by visiting this url: ", authUrl);

  const { code } = await inquirer.prompt([
    {
      type: "input",
      name: "code",
      message: "Enter the code from that page here: ",
    },
  ]);

  return await oAuth2Client.getToken(code);
}

async function auth(config) {
  let credentials = await loadJson(config.credentialsPath);

  if (!credentials) {
    credentials = await getNewCredentials(config);
    await mkdirp(dirname(config.credentialsPath));
    await fs.writeFile(config.credentialsPath, JSON.stringify(credentials));
  }

  const { client_secret, client_id, redirect_uris } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  let token = await loadJson(config.tokenPath);

  if (!token) {
    token = await getNewToken(oAuth2Client, config.scope);
    await fs.writeFile(config.tokenPath, JSON.stringify(token));
  }

  oAuth2Client.setCredentials(token);

  google.options({
    auth: oAuth2Client,
  });
}

export default auth;
