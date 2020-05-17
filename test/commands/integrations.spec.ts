import { test } from "@oclif/test";

describe("integrations", () => {
  test
    .stdout()
    .command(["integrations"])
    .it("runs integrations", (ctx) => {
      expect(ctx.stdout).toContain("");
    });
});
