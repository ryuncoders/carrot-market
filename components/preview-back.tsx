"use client";
import { useRouter } from "next/navigation";

export default function BackPreview() {
  const router = useRouter();
  const onBackClick = () => {
    router.back();
  };
  return (
    <div
      onClick={onBackClick}
      className="fixed top-0 left-0 bg-black opacity-60 w-full h-full"
    />
  );
}
