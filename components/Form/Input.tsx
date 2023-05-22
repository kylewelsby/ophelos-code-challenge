interface FormInputProps {
  title: string;
  id: string;
  type: string;
  placeholder?: string;
  autocomplete?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string | number | string[] | undefined;
  pattern?: string;
}
export function FormInput(
  {
    title,
    id,
    type,
    placeholder,
    autocomplete,
    required,
    disabled,
    value,
    pattern,
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
        <input
          type={type}
          name={id}
          id={id}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          autoComplete={autocomplete}
          required={required}
          disabled={disabled}
          value={value}
          pattern={pattern}
        />
      </div>
    </>
  );
}
