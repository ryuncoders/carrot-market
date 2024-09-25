import ReceivedReview from "@/components/profile/received-review";
import Link from "next/link";

interface ReviewProps {
  seller: number;
  productId: number;
  chatRoomId: string;
  payload: string;
}

export default function Review({
  seller,
  productId,
  chatRoomId,
  payload,
}: ReviewProps) {
  return (
    <div className="p-5 flex flex-col gap-3">
      <h1 className="text-lg font-semibold">거래가 완료된 방입니다.</h1>
      <ReceivedReview payload={payload} />
      <Link
        href={`/product/review/${productId}/${seller}`}
        className=" bg-main-color rounded-md w-full flex justify-center text-white py-3"
      >
        <span>리뷰를 작성하시려면 눌러주세요.</span>
      </Link>
      <div className="flex gap-4 *:text-neutral-500 *:text-xs justify-center">
        <Link href={`/chat/${chatRoomId}`}>채팅 방으로 돌아가기</Link>
        <span>|</span>
        <Link href={"/home"}>홈으로 돌아가기</Link>
      </div>
    </div>
  );
}
