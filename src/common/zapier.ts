import * as execa from "execa";
import { constants, promises as fs } from "fs";
import * as path from "path";

async function ensureFile(filePath: string) {
  try {
    await fs.access(filePath, constants.W_OK);
  } catch (error) {
    await fs.writeFile(filePath, "{}");
  }
  return true;
}

export default function getAppFile(accountName: string): string {
  const file = path.resolve(
    process.cwd(),
    ".zapier",
    "accounts",
    `${accountName}.json`
  );
  return file;
}

export function getAuthFile(accountName: string): string {
  const file = path.resolve(
    process.cwd(),
    ".zapier",
    "keys",
    `${accountName}.json`
  );
  return file;
}

export async function readAppConfig(accountName: string, ensure?: boolean) {
  const file = getAppFile(accountName);
  if (ensure) {
    await ensureFile(file);
  }
  const json = await fs.readFile(file, "utf8");
  let account: { [key: string]: any };
  try {
    account = JSON.parse(json);
  } catch (error) {
    account = {};
  }
  return {
    account,
    file,
  };
}

export async function readAccountKey(accountName: string, ensure?: boolean) {
  const file = getAuthFile(accountName);
  if (ensure) {
    await ensureFile(file);
  }
  const json = await fs.readFile(file, "utf8");
  let account: { [key: string]: any };
  try {
    account = JSON.parse(json);
  } catch (error) {
    account = {};
  }
  return { account, file };
}

export function runCommand(
  commandName: string,
  args: string[],
  appFile: string,
  authFile: string,
  options: any = {}
) {
  const p = execa("zapier", [commandName, ...args], {
    ...options,
    env: {
      ZAPIER_CURRENT_APP_FILE: appFile,
      ZAPIER_AUTH_LOCATION: authFile,
    },
  });

  return p;
}
