import { Command, flags } from "@oclif/command";
import * as _ from "lodash";
import * as execa from "execa";
import { prompt } from "inquirer";

export default class Scaffold extends Command {
  static description = "Scaffolds a new app or a part of it.";

  static flags = {
    help: flags.help({ char: "h" }),
    account: flags.string({
      char: "a",
      description: "The account to which the app should be uploaded",
      multiple: true,
    }),
  };

  async run() {
    const generators = {
      "zapier-app": "Full app",
      "zapier-app:create": "Create Action",
      "zapier-app:search": "Search Action",
      "zapier-app:trigger": "Trigger Step",
    };

    const { generator } = await prompt([
      {
        name: "generator",
        message: "What do you want to create?",
        type: "list",
        choices: _.values(generators),
      },
    ]);

    const generatorName = _.findKey(generators, (value) => value === generator);
    if (!generatorName) {
      throw new Error("Generator name is required");
    }

    // 2. Run yo zapier-app generator
    execa("yo", [generatorName], {
      stdio: "inherit",
    });
    // 3. Cleanup
  }
}
