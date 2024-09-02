"use server";

import db from "@/lib/db";
import getSession from "@/lib/session/get";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createChatRoom(productId: number, productUserId: number) {
  const session = await getSession();

  // 사용자 id, product id가 존재하면
  const findRoom = await db.product.findUnique({
    where: {
      id: productId,
      chatRoom: {
        some: {
          users: {
            some: {
              id: session.id,
            },
          },
        },
      },
    },
    select: {
      chatRoom: {
        select: {
          id: true,
        },
      },
    },
  });
  if (findRoom) {
    redirect(`/chats/${findRoom.chatRoom[0].id}`);
  }

  const room = await db.chatRoom.create({
    data: {
      users: {
        connect: [
          {
            id: productUserId,
          },
          {
            id: session.id,
          },
        ],
      },
      productId,
    },
    select: {
      id: true,
    },
  });
  redirect(`/chats/${room.id}`);
}

export const onDelete = async (id: number) => {
  const product = await db.product.delete({
    where: {
      id,
    },
    select: {
      photo: true,
    },
  });
  const photoId = product.photo.split(
    "https://imagedelivery.net/WsRbszCcxsT0fi684EYNNQ/"
  )[1];
  await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1/${photoId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  revalidatePath("/home");
  revalidateTag("product-detail");
  redirect("/home");
};

export async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

export async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}
