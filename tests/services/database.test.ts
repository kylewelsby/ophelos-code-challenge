import { DB } from "$sqlite";
import { assertEquals } from "@/tests/deps.ts";
import {
  createDatabase,
  listStatements,
  readItems,
  writeItem,
} from "@/services/database.ts";

async function resetDatabase() {
  const db = new DB("database.db", { mode: "write" });
  await db.execute(`DELETE FROM items`);
  await db.close();
}

Deno.test("database", async (t) => {
  await createDatabase();
  await t.step("writeItem", async () => {
    await resetDatabase();
    const item = {
      user: "user1",
      date: "2020-01-01",
      title: "title",
      amount: 1.23,
    };
    await writeItem(item);

    const db = new DB("database.db", { mode: "read" });
    const result = await db.queryEntries(
      "SELECT id, user, date, title, amount FROM items ORDER BY id DESC LIMIT 1",
    );
    assertEquals(result.length, 1);
    assertEquals(result[0].user, "user1");
    assertEquals(result[0].date, item.date);
    assertEquals(result[0].title, item.title);
    assertEquals(result[0].amount, item.amount);
    await db.close();
  });

  await t.step("readStatement", async () => {
    await resetDatabase();
    const db = new DB("database.db", { mode: "write" });
    await db.query(
      "INSERT INTO items (user, date, title, amount) VALUES (:user, :date, :title, :amount)",
      {
        user: "user1",
        date: "2023-05-01",
        title: "Salary",
        amount: 3000,
      },
    );
    await db.query(
      "INSERT INTO items (user, date, title, amount) VALUES (:user, :date, :title, :amount)",
      {
        user: "user1",
        date: "2023-05-02",
        title: "Rent",
        amount: 500,
      },
    );
    await db.query(
      "INSERT INTO items (user, date, title, amount) VALUES (:user, :date, :title, :amount)",
      {
        user: "user1",
        date: "2023-06-01",
        title: "Salary",
        amount: 3000,
      },
    );
    await db.close();

    const items = await readItems({ date: new Date("2023-05-01") });

    assertEquals(items.length, 2);
    assertEquals(items[0].user, "user1");
    assertEquals(items[0].date, "2023-05-01");
    assertEquals(items[0].title, "Salary");
    assertEquals(items[0].amount, 3000);

    const items2 = await readItems({ date: new Date("2023-06-05") });
    assertEquals(items2.length, 1);
  });

  await t.step("listStatements", async () => {
    await resetDatabase();
    const db = new DB("database.db", { mode: "write" });
    await db.query(
      "INSERT INTO items (user, date, title, amount) VALUES (:user, :date, :title, :amount)",
      {
        user: "user1",
        date: "2023-05-01",
        title: "Salary",
        amount: 3000,
      },
    );
    await db.query(
      "INSERT INTO items (user, date, title, amount) VALUES (:user, :date, :title, :amount)",
      {
        user: "user1",
        date: "2023-05-02",
        title: "Rent",
        amount: -500,
      },
    );
    await db.query(
      "INSERT INTO items (user, date, title, amount) VALUES (:user, :date, :title, :amount)",
      {
        user: "user1",
        date: "2023-06-01",
        title: "Salary",
        amount: 3000,
      },
    );
    await db.close();

    const result = await listStatements("user1");
    assertEquals(result.length, 2);
    assertEquals(result[0].date, "2023-06-01");
    assertEquals(result[0].balance, 3000);
    assertEquals(result[1].date, "2023-05-01");
    assertEquals(result[1].balance, 2500);
  });
});
