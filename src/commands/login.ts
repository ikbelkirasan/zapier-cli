import { Command, flags } from "@oclif/command";
import { readAccountKey, readAppConfig, runCommand } from "../common/zapier";

export default class Login extends Command {
  static description = "Fetch a deploy key.";

  static flags = {
    help: flags.help({ char: "h" }),
    account: flags.string({
      required: true,
      char: "a",
      description:
        "The account name that will be used as a identifier to store the deploy key",
    }),
  };

  async run() {
    const { flags } = this.parse(Login);
    const { file: appFile } = await readAppConfig(flags.account, true);
    const { file: authFile } = await readAccountKey(flags.account, true);
    const subprocess = runCommand("login", [], appFile, authFile, {
      stdio: "inherit",
    });
    return subprocess;
  }
}
