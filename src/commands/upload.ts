import { Command, flags } from "@oclif/command";
import * as Listr from "listr";
import {
  getAccounts,
  readAccountKey,
  readAppConfig,
  runCommand,
} from "../common/zapier";

export default class Upload extends Command {
  static description = "Upload to Zapier.";

  static flags = {
    help: flags.help({ char: "h" }),
    account: flags.string({
      char: "a",
      description:
        "The account name that will be used to store the new integration configuration",
      multiple: true,
    }),
  };

  async run() {
    const accounts = await getAccounts(this, Upload);

    const definitions = accounts.map((account: string) => {
      return {
        title: `Uploading to Zapier Account: ${account}`,
        task: async () => {
          const { file: appFile } = await readAppConfig(account);
          const { file: authFile } = await readAccountKey(account);
          const subprocess = runCommand("upload", [], appFile, authFile);
          const response = await subprocess;
          return response;
        },
      };
    });
    const tasks = new Listr(definitions);
    return tasks.run();
  }
}
