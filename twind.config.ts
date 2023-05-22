import { Options } from "$fresh/plugins/twind.ts";
import { apply } from "twind";

export default {
  selfURL: import.meta.url,
  theme: {},
  preflight: {
    "[type='text'],[type='email'],[type='url'],[type='password'],[type='number'],[type='date'],[type='datetime-local'],[type='month'],[type='search'],[type='tel'],[type='time'],[type='week'],[multiple],textarea,select":
      apply`appearance-none
    bg-white
    border-color-gray-300
    border-solid
    p-2`,
  },
  plugins: {
    "bg-ophelos-bg-yellow": apply`bg-[#FFFDF4]`,
    "border-ophelos-bg-darkYellow": apply`border-color-[#F2E9D9]`,
  },
} as Options;
