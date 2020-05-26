import { Command, flags } from "@oclif/command";
import * as Listr from "listr";
import {
  getAccounts,
  readAccountKey,
  readAppConfig,
  runCommand,
} from "../common/zapier";

export default class Push extends Command {
  static description = "Build and upload the current app.";

  static flags = {
    help: flags.help({ char: "h" }),
    account: flags.string({
      char: "a",
      description: "The account to which the app should be uploaded",
      multiple: true,
    }),
  };

  async run() {
    const accounts = await getAccounts(this, Push);

    const definitions = accounts.map((account: string) => {
      return {
        title: `Uploading to Zapier Account: ${account}`,
        task: async () => {
          const { file: appFile } = await readAppConfig(account);
          const { file: authFile } = await readAccountKey(account);
          const subprocess = runCommand("push", [], appFile, authFile);
          const response = await subprocess;
          return response;
        },
      };
    });
    const tasks = new Listr(definitions);
    return tasks.run();
  }
}
