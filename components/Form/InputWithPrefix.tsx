interface FormInputProps {
  title: string;
  id: string;
  type: string;
  placeholder?: string;
  autocomplete?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string | number | string[] | undefined;
  prefix: string;
}
export function FormInputWithPrefix(
  {
    title,
    id,
    type,
    placeholder,
    autocomplete,
    required,
    disabled,
    value,
    prefix,
  }: FormInputProps,
) {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {title}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
            {prefix}
          </span>
          <input
            type={type}
            name={id}
            id={id}
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder={placeholder}
            autoComplete={autocomplete}
            required={required}
            disabled={disabled}
            value={value}
          />
        </div>
      </div>
    </>
  );
}
