import { Command, flags } from "@oclif/command";
import {
  getAccounts,
  readAccountKey,
  readAppConfig,
  runCommand,
} from "../common/zapier";

export default class Run extends Command {
  static description = "Run a command using the original Zapier CLI.";

  static flags = {
    help: flags.help({ char: "h" }),
    account: flags.string({
      char: "a",
      description:
        "The account name that will be used to store the new integration configuration",
    }),
  };

  static strict = false;

  async run() {
    const { argv } = this.parse(Run);
    const account = await getAccounts(this, Run);

    const { file: appFile } = await readAppConfig(account);
    const { file: authFile } = await readAccountKey(account);

    const subprocess = runCommand(argv[0], argv.slice(1), appFile, authFile, {
      stdio: "inherit",
    });
    return subprocess;
  }
}
