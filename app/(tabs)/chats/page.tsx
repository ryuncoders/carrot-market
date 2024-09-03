import InitialChat from "@/components/initial-chat";
import ListMessage from "@/components/listChat";
import db from "@/lib/db";
import getSession from "@/lib/session/get";
import { Prisma } from "@prisma/client";

async function getChatRooms(sessionId: number) {
  const chatRooms = await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: sessionId,
        },
      },
    },
    select: {
      id: true,
      product: {
        select: {
          title: true,
          photo: true,
        },
      },
      users: {
        where: {
          id: {
            not: sessionId,
          },
        },
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return chatRooms;
}

export type InitialChats = Prisma.PromiseReturnType<typeof getChatRooms>;

export default async function Chats() {
  const session = await getSession();
  const chatRooms = await getChatRooms(session.id!);
  return (
    <div>
      <InitialChat initialChats={chatRooms} />
    </div>
  );
}
