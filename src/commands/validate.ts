import { Command, flags } from "@oclif/command";
import {
  getAccounts,
  readAccountKey,
  readAppConfig,
  runCommand,
} from "../common/zapier";

export default class Validate extends Command {
  static description = "Validate your integration.";

  static flags = {
    help: flags.help({ char: "h" }),
    account: flags.string({
      char: "a",
      description:
        "The account name that will be used to store the new integration configuration",
    }),
  };

  async run() {
    const account = await getAccounts(this, Validate);

    const { file: appFile } = await readAppConfig(account);
    const { file: authFile } = await readAccountKey(account);
    const subprocess = runCommand("validate", [], appFile, authFile, {
      stdio: "inherit",
    });
    return subprocess;
  }
}
