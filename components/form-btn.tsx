"use client";
import { useFormStatus } from "react-dom";

interface FormBtnProps {
  text: string;
}
export default function FormBtn({ text }: FormBtnProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="primary-btn text-base p-2 disabled:bg-neutral-500 disabled:cursor-not-allowed"
    >
      {pending ? "로딩 중..." : text}
    </button>
  );
}
