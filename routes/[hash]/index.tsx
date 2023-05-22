import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Statement } from "@/shared/types.ts";
import { StatementRow } from "@/components/StatementRow.tsx";
import { reform } from "$reform";
import { StatementItem, StatementItemInput } from "@/shared/types.ts";
import { listStatements, writeItem } from "@/services/database.ts";

interface RowItem {
  title: string;
  amount: number;
}

interface Data {
  statements: Statement[];
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const user = ctx.params.hash;
    const statements = await listStatements(user);
    return ctx.render({
      statements,
    });
  },
  async POST(req, ctx) {
    const user = ctx.params.hash;
    const data = await req.formData();
    const input = reform(data) as unknown as StatementItemInput;

    input.expense.forEach((item) => {
      const amount = parseInt(item.amount.toString(), 10);
      if (amount && !isNaN(amount) && amount !== 0) {
        writeItem({
          user: user,
          date: input.date,
          title: item.title,
          amount: -amount,
        });
      }
    });

    input.income.forEach((item) => {
      const amount = parseInt(item.amount.toString(), 10);
      if (amount && !isNaN(amount) && amount !== 0) {
        writeItem({
          user: user,
          date: input.date,
          title: item.title,
          amount: amount,
        });
      }
    });
    const items: StatementItem[] = [];

    const url = new URL(req.url);
    url.pathname = `/${ctx.params.hash}/${input.date}`;
    return Response.redirect(url.href);
  },
};

export default function Statements({ params, data }: PageProps) {
  const statements = data.statements;

  return (
    <>
      <Head>
        <title>Ophelos Budget Assessment - Statements</title>
      </Head>

      {statements.length === 0
        ? (
          <div class="text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vector-effect="non-scaling-stroke"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 class="mt-2 text-sm font-semibold text-gray-900">
              No statements
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Get started by creating a new statement.
            </p>
            <div class="mt-6">
              <a
                href={`${params.hash}/new`}
                class="inline-flex items-center rounded-md bg-yellow-100 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                <svg
                  class="-ml-0.5 mr-1.5 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                New Statement
              </a>
            </div>
          </div>
        )
        : (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Statements
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all your statements in your account including their
                  date, income, expenses and grade.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <a
                  href={`${params.hash}/new`}
                  className="block rounded-md bg-yellow-100 px-3 py-2 text-center text-sm font-semibold shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200"
                >
                  Add statement
                </a>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                        >
                          Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {statements.map((statement: Statement) => (
                        <StatementRow statement={statement} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
