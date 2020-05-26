import { Command, flags } from "@oclif/command";
import {
  getAccounts,
  readAccountKey,
  readAppConfig,
  runCommand,
} from "../common/zapier";

export default class Login extends Command {
  static description = "Fetch a deploy key.";

  static flags = {
    help: flags.help({ char: "h" }),
    account: flags.string({
      char: "a",
      description:
        "The account name that will be used as a identifier to store the deploy key",
    }),
  };

  async run() {
    const account = await getAccounts(this, Login);

    const { file: appFile } = await readAppConfig(account, true);
    const { file: authFile } = await readAccountKey(account, true);
    const subprocess = runCommand("login", [], appFile, authFile, {
      stdio: "inherit",
    });
    return subprocess;
  }
}
