import { test } from "@oclif/test";

describe("push", () => {
  test
    .stdout()
    .command(["push"])
    .it("runs push", (ctx) => {
      expect(ctx.stdout).toContain("");
    });
});
