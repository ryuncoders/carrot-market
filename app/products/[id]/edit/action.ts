"use server";

import { productSchema } from "../../../product/add/schema";
import db from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function editHandle(id: string, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const product = await db.product.update({
      where: { id: +id },
      data: {
        title: result.data.title,
        description: result.data.description,
        price: result.data.price,
        photo: result.data.photo,
      },
      select: {
        id: true,
      },
    });
    revalidatePath("/home");
    revalidateTag("product-detail");
    redirect(`/products/${product.id}`);
  }
}
