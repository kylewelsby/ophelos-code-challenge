import { DB } from "$sqlite";

import { Statement, StatementItem } from "@/shared/types.ts";

const databaseFile = "database.db";
export async function createDatabase() {
  const db = new DB(databaseFile, { mode: "create" });
  await db.execute(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT,
    date TEXT,
    title TEXT,
    amount REAL
  )`);
  await db.close();
}

export async function writeItem(item: StatementItem): Promise<void> {
  const db = new DB(databaseFile, { mode: "write" });
  await db.query(
    "INSERT INTO items (user, date, title, amount) VALUES (:user, :date, :title, :amount)",
    {
      user: item.user,
      date: item.date,
      title: item.title,
      amount: item.amount,
    },
  );
  await db.close();
}

export async function readItems(
  { date }: { date: Date },
): Promise<StatementItem[]> {
  const startOfMonth =
    new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split(
      "T",
    )[0];
  const endOfMonth =
    new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split(
      "T",
    )[0];

  const db = new DB(databaseFile, { mode: "read" });
  const result = await db.queryEntries(
    "SELECT * FROM items WHERE amount IS NOT '' AND amount != 0 AND date BETWEEN :start AND :end",
    { start: startOfMonth, end: endOfMonth },
  );
  await db.close();

  return result as unknown as StatementItem[];
}

export async function updateItem(
  item: StatementItem,
): Promise<void> {
  const db = new DB(databaseFile, { mode: "write" });
  await db.query(
    "UPDATE items SET amount = :amount, title = :title WHERE id = :id",
    {
      id: item.id,
      title: item.title,
      amount: item.amount,
    },
  );
  await db.close();
}

export async function listStatements(
  user: string,
): Promise<Statement[]> {
  const db = new DB(databaseFile, { mode: "read" });
  const result = await db.queryEntries(
    `SELECT user, strftime('%Y-%m-01', date) AS date, COUNT(id) AS count, SUM(amount) AS balance FROM items WHERE user = :user GROUP BY strftime('%Y-%m', date) ORDER BY date DESC`,
    {
      user: user,
    },
  );

  await db.close();
  return result as unknown as Statement[];
}
