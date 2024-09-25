"use client";

import { stateChangHandle } from "@/app/product/review/[id]/action";
import React from "react";

interface IState {
  value: "COMPLETED" | "ON_SALE" | "HIDDEN";
}

export default function SelectState({
  state,
  productId,
}: {
  state: string;
  productId: number;
}) {
  const onChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = event;
    const typedValue: IState["value"] = value as IState["value"];
    await stateChangHandle(productId, typedValue);
  };
  return (
    <select
      name="state"
      className="text-black *:text-black "
      onChange={onChange}
    >
      <option value="ON_SALE" selected={state === "ON_SALE"}>
        판매중
      </option>
      <option value="COMPLETED" selected={state === "COMPLETED"}>
        거래완료
      </option>
      <option value="HIDDEN" selected={state === "HIDDEN"}>
        숨김
      </option>
    </select>
  );
}
