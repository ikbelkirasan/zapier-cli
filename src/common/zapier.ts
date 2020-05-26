import * as execa from "execa";
import { constants, promises as fs } from "fs";
import * as globby from "globby";
import { prompt } from "inquirer";
import * as _ from "lodash";
import * as path from "path";

async function ensureFile(filePath: string) {
  try {
    await fs.access(filePath, constants.W_OK);
    //tslint:disable-next-line:no-unused
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
    //tslint:disable-next-line:no-unused
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
    //tslint:disable-next-line:no-unused
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

interface Account {
  name: string;
}

export async function listAccounts(): Promise<Account[]> {
  const files = await globby([".zapier/accounts/*.json"]);
  const accounts: Account[] = [];
  files.forEach((file) => {
    const name = file.split(".json")[0].split("/").pop();
    if (name) {
      accounts.push({ name });
    }
  });
  return accounts;
}

export async function getAccounts(command: any, className: any) {
  const { flags } = command.parse(className);

  const isMultiple = className.flags.account.multiple;
  const flagAccounts = isMultiple ? _.uniq(flags.account) : flags.account;

  const { accounts = flagAccounts } = await prompt([
    {
      name: "accounts",
      message: "What accounts would you like to use?",
      type: isMultiple ? "checkbox" : "list",
      choices: await listAccounts(),
      when: () => {
        return isMultiple ? !flagAccounts.length : !flagAccounts;
      },
    },
  ]);

  if (accounts.length === 0) {
    throw new Error("You must select one account at least.");
  }

  return accounts;
}
