import { assertEquals } from "@/tests/deps.ts";
import {
  createDatabase,
  listStatements,
  pool,
  readItems,
  writeItem,
} from "@/services/database.ts";
import { StatementItem } from "../../shared/types.ts";

async function resetDatabase() {
  const conn = await pool.connect();
  await conn.queryArray("TRUNCATE TABLE items");
  await conn.release();
  await conn.end();
}

Deno.test("database", async (t) => {
  await createDatabase();
  await t.step("writeItem", async () => {
    await resetDatabase();
    const item = {
      user_id: "user1",
      date: new Date(2023, 0, 10),
      title: "title",
      amount: 1000,
    };
    await writeItem(item);

    const conn = await pool.connect();
    const result = await conn.queryObject<StatementItem>(
      "SELECT * FROM items ORDER BY id DESC LIMIT 1",
    );
    assertEquals(result.rowCount, 1);
    const row = result.rows[0];
    assertEquals(row.user_id, "user1");
    assertEquals(
      row.date.toISOString(),
      new Date(2023, 0, 10).toISOString(),
      "date",
    );
    assertEquals(row.title, item.title);
    assertEquals(row.amount, item.amount);
    await conn.end();
  });

  await t.step("readStatement", async () => {
    await resetDatabase();
    const conn = await pool.connect();
    await conn.queryArray(
      "INSERT INTO items (user_id, date, title, amount) VALUES ($user_id, $date, $title, $amount)",
      {
        user_id: "user1",
        date: "2023-05-01",
        title: "Salary",
        amount: 3000,
      },
    );
    await conn.queryArray(
      "INSERT INTO items (user_id, date, title, amount) VALUES ($user_id, $date, $title, $amount)",
      {
        user_id: "user1",
        date: "2023-05-02",
        title: "Rent",
        amount: 500,
      },
    );
    await conn.queryArray(
      "INSERT INTO items (user_id, date, title, amount) VALUES ($user_id, $date, $title, $amount)",
      {
        user_id: "user1",
        date: "2023-06-01",
        title: "Salary",
        amount: 3000,
      },
    );
    await conn.release();
    await conn.end();

    const items = await readItems({
      date: new Date("2023-05-01"),
      user_id: "user1",
    });

    assertEquals(items.length, 2);
    assertEquals(items[0].user_id, "user1");
    assertEquals(items[0].date.toISOString(), "2023-05-01T00:00:00.000Z");
    assertEquals(items[0].title, "Salary");
    assertEquals(items[0].amount, 3000);

    const items2 = await readItems({
      date: new Date("2023-06-05"),
      user_id: "user1",
    });
    assertEquals(items2.length, 1);
  });

  await t.step("listStatements", async () => {
    await resetDatabase();
    const conn = await pool.connect();
    await conn.queryArray(
      "INSERT INTO items (user_id, date, title, amount) VALUES ($user_id, $date, $title, $amount)",
      {
        user_id: "user1",
        date: "2023-05-01",
        title: "Salary",
        amount: 3000,
      },
    );
    await conn.queryArray(
      "INSERT INTO items (user_id, date, title, amount) VALUES ($user_id, $date, $title, $amount)",
      {
        user_id: "user1",
        date: "2023-05-02",
        title: "Rent",
        amount: -500,
      },
    );
    await conn.queryArray(
      "INSERT INTO items (user_id, date, title, amount) VALUES ($user_id, $date, $title, $amount)",
      {
        user_id: "user1",
        date: "2023-06-01",
        title: "Salary",
        amount: 3000,
      },
    );
    await conn.release();
    await conn.end();

    const result = await listStatements("user1");
    assertEquals(result.length, 2);
    assertEquals(result[0].date, "2023-06-01");
    assertEquals(result[0].balance, 3000n);
    assertEquals(result[1].date, "2023-05-01");
    assertEquals(result[1].balance, 2500n);
  });
});
