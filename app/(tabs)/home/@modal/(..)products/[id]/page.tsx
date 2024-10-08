import { createChatRoom, getIsOwner } from "@/app/products/[id]/actions";
import DeleteBtn from "@/components/delete-button";
import BackPreview from "@/components/preview-back";
import { formatToDate, formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "./actions";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(Number(params.id));
  return {
    title: product?.title,
  };
}

export default async function InterceptRoutes({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(+params.id);
  const isOwner = await getIsOwner(+product?.user.id!);
  const onClickChatHandle = async () => {
    "use server";
    await createChatRoom(+params.id, product!.userId);
  };
  return (
    <>
      {product ? (
        <div className="fixed  top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="max-w-screen-sm h-1/2 bg-white z-50 flex flex-col sm:flex-row w-full ">
            <div className="relative sm:w-1/2 w-full h-full bg-neutral-900 flex items-center justify-center overflow-hidden">
              <Image
                src={`${product?.photo}/w=600`}
                alt={product?.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col gap-3 w-full sm:w-1/2 p-3 bg-neutral-800 ">
              <div className="flex gap-2 items-center">
                <div className="size-6 relative overflow-hidden rounded-full">
                  {product.user.avatar ? (
                    <Image
                      fill
                      alt={product.user.username}
                      src={product.user.avatar}
                    />
                  ) : (
                    <UserIcon />
                  )}
                </div>
                <div>{product.user.username}</div>
              </div>
              <div className="h-1px bg-neutral-600 w-full"></div>
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold">{product.title}</div>
                <div className="text-sm">
                  {formatToDate(product.created_at)}
                </div>
              </div>

              <div className="pb-10">{product.description}</div>
              <div className="mt-auto">
                <hr className="pb-3" />
                <div className="flex gap-2 items-center justify-between h-10">
                  <div className="font-semibold text-lg">
                    {formatToWon(product.price)}원
                  </div>
                  <div className="flex gap-2 items-center">
                    {isOwner ? (
                      <>
                        <DeleteBtn id={params.id} />
                        <Link
                          href={`/products/${params.id}/edit`}
                          className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold"
                        >
                          수정
                        </Link>
                      </>
                    ) : (
                      <form action={onClickChatHandle}>
                        <button className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold">
                          채팅
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BackPreview />
        </div>
      ) : null}
    </>
  );
}
