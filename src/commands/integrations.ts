import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import { readAccountKey, readAppConfig, runCommand } from "../common/zapier";

export default class Integrations extends Command {
  static description = "List any integrations that you have admin access to.";

  static flags = {
    help: flags.help({ char: "h" }),
    account: flags.string({
      required: true,
      char: "a",
      description: "The account to which the app should be uploaded",
    }),
  };

  async run() {
    try {
      const { flags } = this.parse(Integrations);
      const { file: appFile } = await readAppConfig(flags.account);
      const { file: authFile } = await readAccountKey(flags.account);
      cli.action.start("Fetching your integrations list");
      const subprocess = runCommand("integrations", [], appFile, authFile);
      const response = await subprocess;
      this.log(response.stdout);
    } finally {
      cli.action.stop();
    }
  }
}
