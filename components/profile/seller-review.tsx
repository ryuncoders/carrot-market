"use client";

import { formatToWon } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface SellerProps {
  buyers:
    | {
        id: number;
        username: string;
        avatar: string | null;
      }[]
    | undefined;

  productPrice: number;
  productPhoto: string;
  productTitle: string;
  productId: string;
}

export default function SellerReview({
  buyers,
  productPrice,
  productPhoto,
  productTitle,
  productId,
}: SellerProps) {
  console.log(productId);
  const router = useRouter();

  const [selectUserId, setSelectUserId] = useState("");

  const onChange = (event: any) => {
    const { id, checked } = event.target;
    const currentCheckBox = document.getElementById(
      selectUserId
    ) as HTMLInputElement;
    if (currentCheckBox) {
      currentCheckBox.checked = false;
    }
    if (checked) {
      setSelectUserId(id);
    }
  };

  const onSelectUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("?");
    router.push(`/product/review/${productId}/${selectUserId}`);
    event.preventDefault();
  };
  const onNotSelectUser = () => {
    router.push("/home");
  };
  return (
    <div className="flex flex-col">
      <header className="flex py-4  justify-center font-bold text-lg items-center">
        <span>구매자 선택</span>
      </header>
      <div className="flex gap-2 p-5 bg-neutral-700">
        <div className="relative overflow-hidden size-14 rounded-md">
          <Image
            fill
            className="object-cover"
            alt={productTitle}
            src={`${productPhoto}/width=100,height=100`}
          />
        </div>
        <div className="flex flex-col justify-center ">
          <span>{productTitle}</span>
          <span>{formatToWon(productPrice)}원</span>
        </div>
      </div>
      <form className="flex flex-col gap-3 py-3">
        {buyers?.map((user) => (
          <div className="px-6 flex gap-3 items-center" key={user.id}>
            <input onChange={onChange} type="checkbox" id={user.id + ""} />
            <label htmlFor={user.id + ""}>{user.username}</label>
          </div>
        ))}
        <button
          className="max-w-screen-md mx-3 bg-orange-500 rounded-md py-3"
          onClick={onSelectUser}
        >
          구매자 선택
        </button>
        <button onClick={onNotSelectUser}>선택하지 않을래요</button>
      </form>
    </div>
  );
}
