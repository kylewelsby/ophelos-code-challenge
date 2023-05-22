import { Statement } from "@/shared/types.ts";
import { calculateGrade, sumItems } from "@/utils/calculator.ts";

interface Props {
  statement: Statement;
}

function formattedAmount(amount: number) {
  return amount.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });
}

function formattedDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
  });
}

export function StatementRow({ statement }: Props) {
  const income = sumItems(statement.items)[0];
  const expenses = sumItems(statement.items)[1];

  return (
    <tr key={statement.date}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
        {formattedDate(statement.date)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {formattedAmount(income)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {formattedAmount(expenses)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {calculateGrade(statement.items)}
      </td>
    </tr>
  );
}
