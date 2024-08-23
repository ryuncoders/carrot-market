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

export async function createCommentHandle(postId: number, payload: string) {
  const session = await getSession();
  const userId = session.id!;
  const comment = await db.comment.create({
    data: {
      payload,
      postId,
      userId,
    },
    select: { userId: true },
  });
  if (comment.userId) {
    revalidateTag(`post-comments-${postId}`);
    return;
  } else {
    alert("오류: 댓글이 등록되지 않음.");
    return;
  }
}
