import { Command, flags } from "@oclif/command";
import { readAccountKey, readAppConfig, runCommand } from "../common/zapier";

export default class Validate extends Command {
  static description = "Validate your integration.";

  static flags = {
    help: flags.help({ char: "h" }),
    account: flags.string({
      required: true,
      char: "a",
      description:
        "The account name that will be used to store the new integration configuration",
    }),
  };

  async run() {
    const { flags } = this.parse(Validate);
    const { file: appFile } = await readAppConfig(flags.account);
    const { file: authFile } = await readAccountKey(flags.account);
    const subprocess = runCommand("validate", [], appFile, authFile, {
      stdio: "inherit",
    });
    return subprocess;
  }
}
