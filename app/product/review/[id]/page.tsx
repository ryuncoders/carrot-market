import BuyerReview from "@/components/profile/buyer-review";
import SellerReview from "@/components/profile/seller-review";
import db from "@/lib/db";
import getSession from "@/lib/session/get";

import React from "react";

async function getProduct(productId: number) {
  const product = db.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      title: true,
      photo: true,
      price: true,
      userId: true,
      user: {
        select: {
          username: true,
        },
      },
      chatRoom: {
        select: {
          id: true,
          users: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
      },
    },
  });
  return product;
}

export default async function ProductReview({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const product = await getProduct(+params.id);

  const buyers = product?.chatRoom.flatMap((room) =>
    room.users.filter((user) => user.username !== product.user.username)
  );
  return (
    <div>
      {session.id === product?.userId ? (
        <>
          <SellerReview
            buyers={buyers}
            productPrice={product?.price!}
            productPhoto={product?.photo!}
            productTitle={product?.title!}
            productId={params.id}
          />
        </>
      ) : (
        <>
          <BuyerReview />
        </>
      )}
    </div>
  );
}
