import ChatMessagesList from "@/components/chat-messages-list";
import db from "@/lib/db";
import getSession from "@/lib/session/get";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: {
          id: true,
        },
      },
    },
  });
  if (room) {
    const session = await getSession();
    const canSee = room.users.find((user) => user.id === session.id!);
    if (!canSee) {
      return notFound;
    }
  }
  return room;
}

async function getMessages(chatRoomId: string) {
  const messages = db.message.findMany({
    where: {
      chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return messages;
}

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>;

export default async function Chat({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id);
  if (!room) {
    return notFound();
  }
  const initialMessages = await getMessages(params.id);
  const session = await getSession();
  return (
    <div>
      <ChatMessagesList
        chatRoomId={params.id}
        initialMessages={initialMessages}
        userId={session.id!}
      />
    </div>
  );
}
