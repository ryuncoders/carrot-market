import ChatMessagesList from "@/components/chat-messages-list";
import db from "@/lib/db";
import getSession from "@/lib/session/get";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";

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

const getCachedMessages = nextCache(getMessages, ["chat-messages"], {
  tags: ["messages"],
});

async function getUserProfile(sessionId: number) {
  const user = await db.user.findUnique({
    where: {
      id: sessionId,
    },
    select: {
      username: true,
      avatar: true,
    },
  });
  return user;
}

const getCachedUserProfile = nextCache(getUserProfile, ["userProfile"], {
  tags: ["userProfile"],
});

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>;

export default async function Chat({ params }: { params: { id: string } }) {
  const session = await getSession();
  const room = await getRoom(params.id);
  if (!room) {
    return notFound();
  }
  const user = await getCachedUserProfile(session.id!);
  if (!user) {
    return notFound();
  }
  const initialMessages = await getCachedMessages(params.id);
  return (
    <div>
      <ChatMessagesList
        chatRoomId={params.id}
        username={user.username}
        avatar={user.avatar!}
        initialMessages={initialMessages}
        userId={session.id!}
      />
    </div>
  );
}
