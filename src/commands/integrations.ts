import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import {
  getAccounts,
  readAccountKey,
  readAppConfig,
  runCommand,
} from "../common/zapier";

export default class Integrations extends Command {
  static description = "List any integrations that you have admin access to.";

  static flags = {
    help: flags.help({ char: "h" }),
    account: flags.string({
      char: "a",
      description: "The account to which the app should be uploaded",
    }),
  };

  async run() {
    try {
      const account = await getAccounts(this, Integrations);

      const { file: appFile } = await readAppConfig(account);
      const { file: authFile } = await readAccountKey(account);
      cli.action.start("Fetching your integrations list");
      const subprocess = runCommand("integrations", [], appFile, authFile);
      const response = await subprocess;
      this.log(response.stdout);
    } finally {
      cli.action.stop();
    }
  }
}
