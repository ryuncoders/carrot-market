"use server";

import db from "@/lib/db";
import getSession from "@/lib/session/get";
import { redirect } from "next/navigation";

import { z } from "zod";

const formSchema = z.object({
  title: z
    .string({
      required_error: "제목을 작성해주세요.",
    })
    .min(3, "3글자 이상 작성해주세요."),
  description: z.string({}),
});

export async function createPosts(preState: any, formData: FormData) {
  const session = await getSession();
  console.log("session", session);
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
  };
  const result = await formSchema.spa(data);
  const post = await db.post.create({
    data: {
      title: result.data?.title!,
      description: result.data?.description,
      userId: session.id!,
    },
    select: {
      id: true,
    },
  });
  if (post.id) {
    redirect(`/posts/${post.id}`);
  }
}
