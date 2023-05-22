export interface Statement {
  date: string;
  user_id: string;
  balance: bigint;
  items?: StatementItem[];
}

export type StatementItem = {
  id?: number;
  user_id: string;
  date: Date;
  title: string;
  amount: number;
};

export interface RowItem {
  title: string;
  amount: number;
}

export interface StatementItemInput {
  income: [RowItem];
  expense: [RowItem];
  date: Date;
}
