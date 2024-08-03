"use server";

import fs from "fs/promises";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import getSession from "@/lib/session/get";

const productSchema = z.object({
  photo: z.string({ required_error: "사진을 등록해주세요" }),
  title: z.string({ required_error: "제목을 입력해주세요" }),
  description: z.string({ required_error: "10자 이상 작성" }),
  price: z.coerce.number({
    required_error: "금액을 입력하세요",
  }),
});

export async function uploadProduct(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };
  console.log(data);
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    const product = await db.product.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        price: result.data.price,
        photo: result.data.photo,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    redirect(`/products/${product.id}`);
  }
}
