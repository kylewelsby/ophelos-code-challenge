import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { readItems, updateItem } from "@/services/database.ts";
import { formattedAmount, formattedDate } from "@/utils/helpers.ts";
import { RowItem, StatementItem, StatementItemInput } from "@/shared/types.ts";
import { reform } from "$reform";

import { calculateGrade, sumItems } from "@/utils/calculator.ts";

import { FormInput } from "@/components/Form/Input.tsx";
import { FormInputWithPrefix } from "@/components/Form/InputWithPrefix.tsx";

interface Data {
  items: StatementItem[];
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const { date, user } = ctx.params;
    const items = await readItems({ date: new Date(date), user_id: user });
    return ctx.render({
      items,
    });
  },
  async POST(req, ctx) {
    const { date, user } = ctx.params;

    const data = await req.formData();
    const input = reform(data) as unknown as StatementItemInput;

    for (const item of (input.expense || [])) {
      if (!item) continue;
      await updateItem({
        id: input.expense.indexOf(item),
        user_id: user,
        date: new Date(date),
        title: item.title,
        amount: -item.amount,
      });
    }
    for (const item of (input.income || [])) {
      if (!item) continue;
      await updateItem({
        id: input.income.indexOf(item),
        user_id: user,
        date: new Date(date),
        title: item.title,
        amount: item.amount,
      });
    }

    return Response.redirect(req.url);
  },
};

export default function Statement({ data, params }: PageProps<Data>) {
  const items = data.items;
  const income = items.filter((item) => item.amount > 0);
  const expense = items.filter((item) => item.amount < 0);
  const balance = items.reduce((acc, item) => {
    if (isNaN(item.amount) || !item.amount) {
      return acc;
    }
    return acc + item.amount;
  }, 0);
  const grade = calculateGrade(items);

  return (
    <>
      <Head>
        <title>
          Ophelos Budget Assessment - Statement {formattedDate(params.date)}
        </title>
      </Head>
      <div class="mb-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          {formattedDate(params.date)}
        </h3>

        <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">
              Transactions
            </dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-yellow-600">
                {items.length}
              </div>
            </dd>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">Grade</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-yellow-600">
                {grade}
              </div>
            </dd>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">Balance</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-yellow-600">
                {formattedAmount(balance)}
              </div>
            </dd>
          </div>
        </dl>
      </div>
      <form method="POST">
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
              {income.map((item) => (
                <div className="col-span-full">
                  <input
                    type="hidden"
                    name={`income[${item.id}][title]`}
                    value={item.title}
                  />
                  <FormInputWithPrefix
                    title={item.title}
                    type="number"
                    id={`income[${item.id}][amount]`}
                    value={item.amount.toString()}
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
              {expense.map((item) => (
                <div className="col-span-full">
                  <input
                    type="hidden"
                    name={`expense[${item.id}][title]`}
                    value={item.title}
                  />
                  <FormInputWithPrefix
                    title={item.title}
                    type="number"
                    id={`expense[${item.id}][amount]`}
                    value={Math.abs(item.amount).toString()}
                    prefix="£"
                  />
                </div>
              ))}
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
