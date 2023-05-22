import * as postgres from "$postgres";
const databaseUrl = Deno.env.get("DATABASE_URL")!;
export const pool = new postgres.Pool(databaseUrl, 3, true);

import { Statement, StatementItem } from "@/shared/types.ts";

export async function createDatabase() {
  const conn = await pool.connect();
  await conn.queryArray(`CREATE TABLE IF NOT EXISTS items (
    id serial PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    date timestamp with time zone NOT NULL,
    title VARCHAR NOT NULL,
    amount integer NOT NULL
  );`);
  await conn.release();
  await conn.end();
}

export async function writeItem(item: StatementItem): Promise<void> {
  const conn = await pool.connect();
  await conn.queryArray(
    "INSERT INTO items (user_id, date, title, amount) VALUES ($user_id, $date, $title, $amount)",
    {
      user_id: item.user_id,
      date: item.date,
      title: item.title,
      amount: item.amount,
    },
  );
  await conn.release();
  await conn.end();
}

export async function readItems(
  { date, user_id }: { date: Date; user_id: string },
): Promise<StatementItem[]> {
  const startOfMonth =
    new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split(
      "T",
    )[0];
  const endOfMonth =
    new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split(
      "T",
    )[0];

  const conn = await pool.connect();
  const attr = { start: startOfMonth, end: endOfMonth, user_id: user_id };
  const result = await conn.queryObject<StatementItem>(
    "SELECT * FROM items WHERE user_id = $user_id AND amount != 0 AND date BETWEEN $start AND $end",
    attr,
  );
  await conn.release();
  await conn.end();

  return result.rows;
}

export async function updateItem(
  item: StatementItem,
): Promise<void> {
  const conn = await pool.connect();
  await conn.queryArray(
    "UPDATE items SET amount = $amount, title = $title WHERE id = $id",
    {
      id: item.id,
      title: item.title,
      amount: item.amount,
    },
  );
  await conn.release();
  await conn.end();
}

export async function listStatements(
  user_id: string,
): Promise<Statement[]> {
  const conn = await pool.connect();
  const result = await conn.queryObject<Statement>(
    `WITH cte AS (SELECT user_id, TO_CHAR(items.date, 'YYYY-MM-01') as _alt_date, count(*), sum(amount) AS balance FROM items WHERE user_id = $user_id GROUP BY _alt_date, user_id ORDER BY _alt_date) SELECT user_id, count, balance, _alt_date AS date from cte ORDER BY date DESC;`,
    {
      user_id: user_id,
    },
  );

  await conn.release();
  await conn.end();
  return result.rows;
}
