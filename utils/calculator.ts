import { StatementItem } from "@/shared/types.ts";

export function sumItems(items: StatementItem[]): [number, number] {
  let totalIncome = 0;
  let totalExpense = 0;
  items.forEach((item) => {
    if (item.amount >= 0) {
      totalIncome += Math.abs(item.amount);
    } else {
      totalExpense += Math.abs(item.amount);
    }
  });
  return [totalIncome, totalExpense];
}

export function calculateRatio(items: StatementItem[]): number {
  const [totalIncome, totalExpense] = sumItems(items);

  let ratio: number;

  if (totalIncome === 0) {
    if (totalExpense === 0) {
      ratio = 0;
    } else {
      ratio = -1;
    }
  } else {
    ratio = totalExpense / totalIncome;
  }
  const ratioPercentage = ratio * 100;
  return ratioPercentage;
}

export function calculateGrade(items: StatementItem[]): string {
  const ratio = calculateRatio(items);
  if (ratio < 10) return "A";
  if (ratio <= 30) return "B";
  if (ratio <= 50) return "C";
  return "D";
}
