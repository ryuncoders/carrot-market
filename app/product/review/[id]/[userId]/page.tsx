"use client";

import { useFormState } from "react-dom";
import { createReview } from "./action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/button";

export default function WriteReview({
  params,
}: {
  params: { id: string; userId: string };
}) {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const createReviewMiddle = async (prevState: any, formData: FormData) => {
    const result = await createReview(formData, +params.userId, +params.id);

    if (result === "success") {
      alert("리뷰가 등록되었습니다.");
      router.push("/home");
    } else if (result === "error") {
      alert("리뷰 등록에 실패하였습니다.");
      return;
    } else {
      setErrorMsg(result + "");
    }
  };

  const [state, dispatch] = useFormState(createReviewMiddle, null);
  return (
    <div className="p-5">
      <form action={dispatch} className="flex flex-col gap-2">
        <input
          name="payload"
          className="text-black"
          type="text"
          placeholder="내용을 작성해주세요."
        />
        <span>{errorMsg}</span>
        <Button text="등록하기" />
      </form>
    </div>
  );
}
