import { calculateGrade, sumItems } from "@/utils/calculator.ts";
import { assertEquals } from "@/tests/deps.ts";

Deno.test("sumItems", async (t) => {
  await t.step("calulates sum of income and expense", () => {
    const items = [
      { title: "item1", amount: 100, date: new Date(), user_id: "user1" },
      { title: "item2", amount: 100, date: new Date(), user_id: "user1" },
      { title: "item3", amount: -100, date: new Date(), user_id: "user1" },
      { title: "item4", amount: -100, date: new Date(), user_id: "user1" },
    ];
    const [income, expense] = sumItems(items);
    assertEquals(income, 200);
    assertEquals(expense, 200);
  });
});

Deno.test("calculateGrade", async (t) => {
  await t.step("returns A when ratio is less than 10", () => {
    const items = [
      { title: "item1", amount: 1000, date: new Date(), user_id: "user1" },
      { title: "item2", amount: -99, date: new Date(), user_id: "user1" },
    ];
    const grade = calculateGrade(items);
    assertEquals(grade, "A");
  });
  await t.step(
    "returns B when ratio is greater than 10 and less than 30",
    () => {
      const items = [
        { title: "item1", amount: 1000, date: new Date(), user_id: "user1" },
        { title: "item2", amount: -100, date: new Date(), user_id: "user1" },
      ];
      let grade = calculateGrade(items);
      assertEquals(grade, "B");

      items.push({
        title: "item2",
        amount: -200,
        date: new Date(),
        user_id: "user1",
      });
      grade = calculateGrade(items);
      assertEquals(grade, "B");
    },
  );
  await t.step(
    "returns C when ratio is greater than 30 and less than 50",
    () => {
      const items = [
        { title: "item1", amount: 1000, date: new Date(), user_id: "user1" },
        { title: "item2", amount: -500, date: new Date(), user_id: "user1" },
      ];
      const grade = calculateGrade(items);
      assertEquals(grade, "C");
    },
  );

  await t.step("returns D when ratio is greater than 50", () => {
    const items = [
      { title: "item1", amount: 1000, date: new Date(), user_id: "user1" },
      { title: "item2", amount: -501, date: new Date(), user_id: "user1" },
    ];
    const grade = calculateGrade(items);
    assertEquals(grade, "D");
  });
});
