"use server";

import { productSchema } from "../../../product/add/schema";
import db from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function updateHandle(formData: FormData, id: number) {
  const data = {
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
    photo: formData.get("photo"),
  };
  const result = productSchema.safeParse(data);
  if (!result.success) {
    console.log("실패");
  }
  console.log(result.data);
  const product = await db.product.update({
    where: {
      id,
    },
    data: {
      title: result.data?.title,
      price: result.data?.price,
      description: result.data?.description,
      photo: result.data?.photo,
    },
    select: {
      id: true,
    },
  });
  if (product) {
    redirect(`/products/${product.id}`);
  }
}
