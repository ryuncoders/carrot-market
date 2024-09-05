// button test
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Test() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const onValid = () => {
    console.log("submit!");
  };

  return (
    <div className="flex items-center justify-center gap-2 h-screen">
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex gap-2 items-center flex-col"
      >
        <input
          className="text-black"
          {...register("name", {
            required: "Name is required",
            validate: {
              noAInName: (value) =>
                !value.toLowerCase().includes("a") ||
                'Name cannot contain the letter "a"',
            },
          })}
          type="text"
          placeholder="Enter your name"
        />
        {errors.name && <span>{errors.name.message + ""}</span>}
        {isValid && isDirty ? (
          <button
            type="submit"
            disabled={!isDirty || !isValid}
            className="p-3 rounded-lg bg-neutral-600 text-white cursor-pointer"
          >
            Enter
          </button>
        ) : null}
      </form>
    </div>
  );
}
