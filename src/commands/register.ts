import { Command, flags } from "@oclif/command";
import { readAccountKey, readAppConfig, runCommand } from "../common/zapier";

export default class Login extends Command {
  static description = "Register a new integration in your account.";

  static flags = {
    help: flags.help({ char: "h" }),
    account: flags.string({
      required: true,
      char: "a",
      description:
        "The account name that will be used to store the new integration configuration",
    }),
  };

  static args = [
    {
      name: "title",
      required: true,
    },
  ];

  async run() {
    const { flags, args } = this.parse(Login);
    const { file: appFile } = await readAppConfig(flags.account);
    const { file: authFile } = await readAccountKey(flags.account);
    return runCommand("register", [args.title], appFile, authFile);
  }
}
