import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { unstable_cache as nextCache } from "next/cache";

interface MessageProps {
  chatRoomId: string;
  product: {
    title: string;
    photo: string;
  };
  user: {
    username: string;
    avatar: string | null;
  };
}

async function getMessage(chatRoomId: string) {
  const message = await db.message.findFirst({
    where: {
      chatRoomId,
    },
    orderBy: {
      created_at: "desc",
    },
    select: {
      payload: true,
      created_at: true,
    },
  });
  return message;
}

const getCachedMessage = nextCache(getMessage, ["chats-message"], {
  tags: ["chats-message"],
});

export default async function ListChat({
  product,
  user,
  chatRoomId,
}: MessageProps) {
  const message = await getCachedMessage(chatRoomId);
  return (
    <Link href={`/chats/${chatRoomId}`} className="flex gap-5 p-5">
      <div className="size-14 relative">
        <Image
          height={50}
          width={50}
          className="object-cover size-10 overflow-hidden rounded-full top-0 left-0 absolute border-2 border-neutral-400"
          alt={user.username}
          src={user.avatar!}
        />

        <Image
          height={50}
          width={50}
          className="object-cover size-10 overflow-hidden rounded-md   bottom-0 right-0 absolute border-2"
          alt={product.title}
          src={`${product.photo}/shapen=2`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 items-center">
          <span className="text-base text-white">{user.username}</span>
          <Suspense>
            {message?.created_at == undefined ? (
              ""
            ) : (
              <span className="text-neutral-500 text-xs">
                · {formatToTimeAgo(message?.created_at + "")}
              </span>
            )}
          </Suspense>
        </div>
        <Suspense>
          <span className="text-neutral-400 text-sm">
            {message?.payload == undefined ? "" : message?.payload}
          </span>
        </Suspense>
      </div>
    </Link>
  );
}
