"use server";
import db from "@/lib/db";

export async function getMoreProducts(page: number) {
  const products = db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: page,
    take: page,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}
