import render from "preact-render-to-string";

import { assertEquals, assertStringIncludes } from "../deps.ts";

import { StatementRow } from "@/components/StatementRow.tsx";

Deno.test("StatementRow", async (t) => {
  await t.step("should render a row with a statement", () => {
    const statement = {
      date: "2023-05-01",
      balance: 1000n,
      user_id: "user1",
    };
    const output = render(<StatementRow statement={statement} />);
    assertStringIncludes(output, "May 2023");
    assertStringIncludes(output, "£1,000");
  });
});
