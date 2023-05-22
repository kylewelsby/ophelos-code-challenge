import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { FormInput } from "@/components/Form/Input.tsx";
import { FormInputWithPrefix } from "@/components/Form/InputWithPrefix.tsx";

export default function StatementNew({ params }: PageProps) {
  const income = ["Salary", "Other"];
  const expense = [
    "Mortgage",
    "Rent",
    "Utilties",
    "Travel",
    "Food",
    "Loans",
    "Credit cards",
    "Other",
  ];
  return (
    <>
      <Head>
        <title>Ophelos Budget Assessment - New Statement</title>
      </Head>
      <form action={`/${params.hash}/`} method="POST">
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Income
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                How much do you make each month?
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-y-8 sm:grid-cols-6 md:col-span-2">
              {income.map((title, index) => (
                <div className="col-span-full">
                  <input
                    type="hidden"
                    name={`income[${index}][title]`}
                    value={title}
                  />
                  <FormInputWithPrefix
                    title={title}
                    type="number"
                    id={`income[${index}][amount]`}
                    placeholder="0"
                    prefix="£"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Expenses
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                How much do you spend each month?
              </p>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-y-8 sm:grid-cols-6 md:col-span-2">
              {expense.map((title, index) => (
                <div className="col-span-full">
                  <input
                    type="hidden"
                    name={`expense[${index}][title]`}
                    value={title}
                  />
                  <FormInputWithPrefix
                    title={title}
                    type="number"
                    id={`expense[${index}][amount]`}
                    placeholder="0"
                    prefix="£"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base front-semibold leading-7 text-gray-900">
                Month
              </h2>
              <p className="ml-1 text-sm leading-6 text-gray-600">
                What date is this statement for?
              </p>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-4">
                <FormInput
                  title="Date"
                  type="date"
                  id="date"
                  value={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-yellow-100 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
            >
              Save & Calculate
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
