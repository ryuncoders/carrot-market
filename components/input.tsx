import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface InputProps {
  errors?: string[];
  name: string;
}

const _Input = (
  {
    errors = [],
    name,
    ...rest
  }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        ref={ref}
        {...rest}
        name={name}
        className=" bg-transparent focus:outline-none ring-2 ring-neutral-200  
        border-none placeholder:text-neutral-400 rounded-md w-full 
        focus:ring-main-color focus:ring-4 transition "
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-600 font-normal">
          {error}
        </span>
      ))}
    </div>
  );
};

export default forwardRef(_Input);
