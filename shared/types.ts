export interface Statement {
  date: string;
  items: StatementItem[];
}

export interface StatementItem {
  id?: string;
  title: string;
  amount: number;
}
