"use server";

import db from "@/lib/db";

export async function stateChangHandle(
  productId: number,
  newState: "ON_SALE" | "COMPLETED" | "HIDDEN"
) {
  const state = await db.product.update({
    where: {
      id: productId,
    },
    data: {
      state: newState,
    },
    select: {
      id: true,
    },
  });
  // console.log(state);
  if (state.id) {
    console.log("ok");
  }
}
