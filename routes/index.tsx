import { FormInput } from "@/components/Form/Input.tsx";
import { Button } from "@/components/Form/Button.tsx";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { reform } from "$reform";

import { createHash } from "https://deno.land/std@0.71.0/hash/mod.ts";

export const handler: Handlers<{ error: boolean }> = {
  async POST(req) {
    const data = await req.formData();
    const input = reform(data) as unknown as { email: string };
    const url = new URL(req.url);
    if (input.email === "") {
      url.searchParams.append("error", "true");
    } else {
      const md5 = createHash("md5").update(input.email);
      url.pathname = `/${md5}/`;
    }
    return Response.redirect(url.href);
  },
};

export default function SignIn(props: PageProps<{ error: boolean }>) {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="flex justify-center mb-8 sm:mx-auto sm:w-full sm:max-w-md">
          <img
            src="/logo.svg"
            alt="Ophelos"
            class="w-auto h-36"
          />
        </div>
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form action="/" method="POST">
              <FormInput title="Email" type="email" id="email" />
              <div class="mt-4">
                <Button>Sign in</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
