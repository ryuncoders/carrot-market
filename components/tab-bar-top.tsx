"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function TabBarTop() {
  const router = useRouter();
  const onClickBack = () => {
    router.push("/home");
  };
  return (
    <div className="fixed top-0 left-0 h-10 z-10 w-full flex items-center pl-2 bg-transparent">
      <ArrowLeftIcon className="size-6" onClick={onClickBack} />
    </div>
  );
}
