"use server";

import db from "@/lib/db";
import getSession from "@/lib/session/get";
import { revalidateTag } from "next/cache";

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
  revalidateTag("chats-message");
}
