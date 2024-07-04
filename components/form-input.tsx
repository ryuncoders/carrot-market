interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: [string];
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className=" bg-transparent focus:outline-none ring-2 ring-neutral-200  
        border-none placeholder:text-neutral-400 rounded-md w-full 
        focus:ring-main-color focus:ring-4 transition "
      />
      {errors.map((error) => (
        <span className="text-red-600 font-normal">{error}</span>
      ))}
    </div>
  );
}
