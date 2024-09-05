import ChatMessagesList from "@/components/chat-messages-list";
import db from "@/lib/db";
import getSession from "@/lib/session/get";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { formatToWon } from "@/lib/utils";

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
      product: {
        select: {
          price: true,
          title: true,
          photo: true,
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
type RoomType = {
  product: {
    title: string;
    price: number;
    photo: string;
  };
  users: {
    id: number;
  }[];
  id: string;
  created_at: Date;
  updated_at: Date;
  productId: number;
};

export default async function Chat({ params }: { params: { id: string } }) {
  const session = await getSession();
  const room = (await getRoom(params.id)) as RoomType;
  if (!room) {
    return notFound();
  }
  const user = await getCachedUserProfile(session.id!);
  if (!user) {
    return notFound();
  }
  const initialMessages = await getCachedMessages(params.id);
  return (
    <div className="w-full">
      <div className=" p-4  fixed top-0 left-0 w-full border-neutral-700 border-b">
        <div className="flex justify-between items-center ">
          <Link href={"/chats"}>
            <ChevronLeftIcon className="size-6 text-white" />
          </Link>
          <span className="font-semibold text-lg">{user.username}</span>
          <EllipsisVerticalIcon className="size-6" />
        </div>
        <div className="flex pt-3 gap-4">
          <div className="size-10 relative rounded-md overflow-hidden">
            <Image
              src={`${room.product.photo}/w=100,h=100`}
              alt={room.product.title}
              fill
              className=" object-cover"
            />
          </div>
          <div className="flex flex-col *:text-sm">
            <div className="flex gap-2">
              <span className="font-semibold flex items-center">
                거래완료{" "}
                <ChevronDownIcon className="size-4 font-bold text-white" />
              </span>
              <span className="text-neutral-400 font-semibold">
                {room.product.title}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">
                {formatToWon(room.product.price)}원
              </span>
              <span className="text-neutral-500">{"(가격제안불가)"}</span>
            </div>
          </div>
        </div>
      </div>
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
