"use server";

import db from "@/lib/db";

export async function createReview(
  formData: FormData,
  userId: number,
  productId: number
) {
  const payload = formData.get("payload")?.toString();

  if (payload === "") {
    return "리뷰를 입력해주세요";
  }
  console.log("userId", userId, "productId:", productId);

  const review = await db.review.create({
    data: {
      userId,
      productId,
      payload: payload!,
    },
    select: {
      userId: true,
    },
  });

  if (review.userId) {
    return "success";
  } else {
    return "error";
  }
}
