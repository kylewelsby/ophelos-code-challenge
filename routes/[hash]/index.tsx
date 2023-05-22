import { Head } from "$fresh/runtime.ts";
import { Statement } from "@/shared/types.ts";
import { StatementRow } from "@/components/StatementRow.tsx";

export default function Statements() {
  const statements: Statement[] = [
    {
      date: "2023-05-01",
      items: [
        {
          id: "0",
          title: "Salary",
          amount: 2800,
        },
        {
          id: "1",
          title: "Loan",
          amount: -840,
        },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Ophelos Budget Assessment - Statements</title>
      </Head>

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
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add statement
            </button>
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
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Income
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Expenses
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Grade
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
    </>
  );
}
