import { Command, flags } from "@oclif/command";
import {
  getAccounts,
  readAccountKey,
  readAppConfig,
  runCommand,
} from "../common/zapier";

export default class Register extends Command {
  static description = "Register a new integration in your account.";

  static flags = {
    help: flags.help({ char: "h" }),
    account: flags.string({
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
    const { args } = this.parse(Register);
    const account = await getAccounts(this, Register);

    const { file: appFile } = await readAppConfig(account);
    const { file: authFile } = await readAccountKey(account);

    return runCommand("register", [args.title], appFile, authFile);
  }
}
