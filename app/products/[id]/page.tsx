import db from "@/lib/db";
import { formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteBtn from "@/components/delete-button";
import { createChatRoom, getIsOwner, getProduct } from "./actions";

// 보통 api를 fetch해서 사용함 db에서 데이터를 직접가져오지 않/음
// async function getProduct(id: number) {
//   fetch("https://api.com", {
//     next: {
//       revalidate: 60,
//       tags: ["hello"],
//     },
//   });
// }

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(Number(params.id));
  return {
    title: product?.title,
  };
}

export default async function productDeail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = Boolean(await getIsOwner(product.userId));
  const onClickChatHandle = async () => {
    "use server";
    await createChatRoom(id, product.userId);
  };
  return (
    <div>
      <div className="relative aspect-square">
        <Image
          fill
          className="object-cover"
          src={`${product.photo}/shapen=2`}
          alt={product.title}
        />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 rounded-full overflow-hidden">
          {product.user.avatar !== null ? (
            <Image
              src={product.user.avatar}
              width={40}
              height={40}
              alt={product.user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-xl">
          {formatToWon(product.price)}원
        </span>
        <div className="flex gap-2 items-center">
          {isOwner ? (
            <>
              <DeleteBtn id={params.id} />
              <Link
                href={`/products/${params.id}/edit`}
                className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold"
              >
                수정하기
              </Link>
            </>
          ) : (
            <form action={onClickChatHandle}>
              <button className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold">
                채팅하기
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: {
      id: true,
    },
  });
  return products.map((product) => ({ id: product.id + "" }));
}
