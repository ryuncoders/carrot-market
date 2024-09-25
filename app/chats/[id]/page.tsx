import ChatMessagesList from "@/components/chat-messages-list";
import db from "@/lib/db";
import getSession from "@/lib/session/get";
import { Prisma } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { formatToWon } from "@/lib/utils";
import SelectState from "@/components/select-state";
import ReviewButton from "@/components/review-button";
import { Suspense } from "react";
import Review from "@/app/product/review/page";

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
          userId: true,
          price: true,
          title: true,
          photo: true,
          state: true,
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

const getCachedMessages = nextCache(getMessages, ["messages"], {
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

const stateKo = {
  ON_SALE: "판매중",
  COMPLETED: "거래완료",
  HIDDEN: "숨김",
};

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>;
type RoomType = {
  product: {
    title: string;
    price: number;
    photo: string;
    state: "ON_SALE" | "HIDDEN" | "COMPLETED";
    userId: number;
  };
  users: {
    id: number;
  }[];
  id: string;
  created_at: Date;
  updated_at: Date;
  productId: number;
};

async function getReviewUser(productId: number, userId: number) {
  const review = await db.review.findUnique({
    where: {
      id: {
        productId,
        userId,
      },
    },
    select: {
      userId: true,
      payload: true,
    },
  });
  return review;
}

export default async function Chat({ params }: { params: { id: string } }) {
  const session = await getSession();
  const room = (await getRoom(params.id)) as RoomType;

  const receivedReview = await getReviewUser(room.productId, session.id!);

  const other = room.users.filter((user) => user.id !== session.id);
  const writeReveiw = await getReviewUser(room.productId, other[0].id);

  if (room.product.state == "COMPLETED" && receivedReview?.userId) {
    // review 썼는지 확인하기
    if (!writeReveiw?.userId) {
      return (
        <Review
          seller={other[0].id}
          payload={receivedReview.payload}
          productId={room.productId}
          chatRoomId={params.id}
        />
      );
    }
  }
  if (!room) {
    return notFound();
  }

  const user = await getCachedUserProfile(session.id!);

  if (!user) {
    return notFound();
  }

  const initialMessages = await getCachedMessages(params.id);
  const otherUser = await getUserProfile(other[0].id);
  return (
    <div className="w-full">
      <div className=" p-4  fixed top-0 left-0 w-full border-neutral-700 border-b bg-neutral-900">
        <div className="flex justify-between items-center ">
          <Link href={"/chats"}>
            <ChevronLeftIcon className="size-6 text-white" />
          </Link>
          <Suspense>
            <span className="font-semibold text-lg">{otherUser?.username}</span>
          </Suspense>
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
                {session.id === room.product.userId ? (
                  <>
                    <SelectState
                      state={room.product.state}
                      productId={room.productId}
                    />
                  </>
                ) : (
                  <span>{stateKo[room.product.state]}</span>
                )}
              </span>
              <span className="text-neutral-400 font-semibold">
                {room.product.title}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">
                {formatToWon(room.product.price)}원
              </span>
              {writeReveiw?.userId ? (
                <Link
                  href={`/product/review/${room.productId}/${session.id}/received`}
                >
                  받은 후기 보기
                </Link>
              ) : (
                <></>
              )}
              {session.id === room.product.userId ? (
                <ReviewButton productId={room.productId} />
              ) : (
                <></>
              )}
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
