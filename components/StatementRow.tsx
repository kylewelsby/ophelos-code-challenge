import { Statement } from "@/shared/types.ts";
import { formattedAmount, formattedDate } from "@/utils/helpers.ts";

interface Props {
  statement: Statement;
}

export function StatementRow({ statement }: Props) {
  return (
    <tr key={statement.date}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
        <a href={`/${statement.user}/${statement.date}`}>
          {formattedDate(statement.date)}
        </a>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">
        {formattedAmount(statement.balance)}
      </td>
    </tr>
  );
}
