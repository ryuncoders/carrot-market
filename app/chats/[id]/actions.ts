"use server";

import db from "@/lib/db";
import getSession from "@/lib/session/get";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createMessage(payload: string, chatRoomId: string) {
  const session = await getSession();
  await db.message.create({
    data: {
      userId: session.id!,
      payload,
      chatRoomId,
    },
    select: {
      id: true,
    },
  });
  revalidateTag("messages");
  revalidatePath(`chats/${chatRoomId}`);
  revalidateTag("chats-message");
  console.log("여기까지 얼마나 걸리는지 확인");
}
