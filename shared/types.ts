export interface Statement {
  date: string;
  user: string;
  balance: number;
  items?: StatementItem[];
}

export interface StatementItem {
  id?: string;
  user: string;
  date: string;
  title: string;
  amount: number;
}

export interface RowItem {
  title: string;
  amount: number;
}

export interface StatementItemInput {
  income: [RowItem];
  expense: [RowItem];
  date: string;
}
