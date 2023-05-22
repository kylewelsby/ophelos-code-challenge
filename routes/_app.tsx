import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  const hash = Component().props.params.hash;
  return (
    <>
      <div class="min-h-full">
        <div className="bg-[#FFFDF4] pb-32">
          <nav class="border-b border-black border-opacity-5 bg-[#FFFDF4] lg:border-none">
            <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <div class="relative flex h-16 items-center justify-between lg:border-b lg:border-black lg:border-opacity-5">
                <div class="flex items-center px-2 lg:px-0">
                  <div class="flex-shrink-0 flex flex-row items-center text-lg font-medium">
                    <img
                      src="/logo.svg"
                      class="block w-8 h-8 mr-2"
                      alt="the Ophelos company logo"
                    />
                    Ophelos
                  </div>
                  {hash && (
                    <div class="hidden lg:ml-6 lg:block">
                      <div class="flex space-x-4">
                        <a
                          href={`/${hash}/`}
                          class="rounded-md py-2 px-3 text-sm font-medium"
                          aria-current="page"
                        >
                          All Statements
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div class="hidden lg:ml-4 lg:block">
                  <div class="flex items-center">
                    <a
                      href="https://linkedin.com/in/mekyle/"
                      class="rounded-md py-2 px-3 text-sm font-medium"
                      aria-current="page"
                    >
                      Hire Me
                    </a>
                    {hash && (
                      <a
                        href={`/${hash}/new`}
                        class="bg-yellow-100 hover:bg-yellow-200 rounded-md py-2 px-3 text-sm font-medium ml-4"
                        aria-current="page"
                      >
                        + New Statement
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <header class="py-10">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 class="text-3xl font-bold tracking-tight">
                Budget Calculator
              </h1>
            </div>
          </header>
        </div>
        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow p-5 sm:px-6">
              <Component />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
