"use server";

import db from "@/lib/db";
import getSession from "@/lib/session/get";
import { revalidateTag } from "next/cache";

export const likePost = async (id: number) => {
  // useOptimistic hook 확인용
  //   await new Promise((r) => setTimeout(r, 10000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        postId: id,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${id}`);
  } catch (e) {
    return {};
  }
};

export const dislikePost = async (id: number) => {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          userId: session.id!,
          postId: id,
        },
      },
    });
    revalidateTag(`like-status-${id}`);
  } catch (e) {
    return {};
  }
};
