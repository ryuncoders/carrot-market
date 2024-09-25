import ReceivedReview from "@/components/profile/received-review";
import db from "@/lib/db";

async function getReview(productId: number, userId: number) {
  const review = await db.review.findUnique({
    where: {
      id: {
        productId,
        userId,
      },
    },
    select: {
      payload: true,
    },
  });
  return review;
}

export default async function Recieved({
  params,
}: {
  params: { id: string; userId: string };
}) {
  const review = await getReview(+params.id, +params.userId);
  return <ReceivedReview payload={review?.payload!} />;
}
