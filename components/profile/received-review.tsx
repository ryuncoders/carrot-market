"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ReceivedReview({ payload }: { payload: string }) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div className="p-3">
      <div className="relative flex items-center justify-center py-6">
        <ChevronLeftIcon
          className="w-6 h-6 cursor-pointer absolute left-0"
          onClick={onClick}
        />
        <h1 className="font-semibold text-lg absolute left-1/2 transform -translate-x-1/2">
          받은 리뷰
        </h1>
      </div>

      <div className="rounded-md bg-neutral-600 p-3">
        <p className="py-3">{payload}</p>
      </div>
    </div>
  );
}
