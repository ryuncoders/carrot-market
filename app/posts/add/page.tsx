"use client";

import { useFormState } from "react-dom";
import { createPosts } from "./actions";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function AddPosts() {
  const [state, dispatch] = useFormState(createPosts, null);
  return (
    <div className="p-5">
      <form action={dispatch} className="flex flex-col gap-2 ">
        <div className="flex items-center justify-between ">
          <Link href={"/life"}>
            <ArrowLeftIcon className="size-6 text-white" />
          </Link>
          <span className="flex justify-center font-semibold text-lg">
            동네생활 글쓰기
          </span>
          <button type="submit" className="font-medium text-lg">
            완료
          </button>
        </div>

        <p className="bg-orange-200 p-3 rounded-lg text-black m-3">
          <strong className="mr-3">안내</strong>중고거래 관련, 명예훼손,
          광고/홍보 목적의 글은 올리실 수 없어요.{" "}
        </p>

        <input
          type="text"
          placeholder="제목을 입력하세요"
          name="title"
          className="text-black"
          required
        />
        <input
          type="text"
          placeholder="이야기를 나눠보세요"
          name="description"
          className="text-black"
        />
      </form>
    </div>
  );
}
