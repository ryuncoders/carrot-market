"use server";

import db from "@/lib/db";

export async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },

    select: {
      title: true,
      created_at: true,
      description: true,
      photo: true,
      price: true,
      userId: true,
      user: {
        select: {
          username: true,
          id: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}
