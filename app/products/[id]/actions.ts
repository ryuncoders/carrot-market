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

  //https://imagedelivery.net/XnCI-r_Qme1s5loDFzOTkg/0f4b9424-c0ea-4276-dd9a-127d9952f700
  const photoId = product.photo.split(
    `https://imagedelivery.net/${process.env.CLOUDFLARE_ACCOUNT_HASH}/`
  )[1];

  console.log("photoId", photoId);
  // await fetch(
  //   `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1/${photoId}`,
  //   {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v2/${photoId}/direct_delete`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  const { success, result } = data;
  console.log(success);

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
