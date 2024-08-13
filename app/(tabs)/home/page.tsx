import InitialProduct from "@/components/initial-product";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";

// 만료시간에 따라 갱신
const getCachedProducts = nextCache(getInitialProducts, ["home-products"], {
  revalidate: 60,
});

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function Products() {
  const initialProducts = await getCachedProducts();
  // 요청형 새로고침 (모든 캐시 새로고침)
  const revalidate = async () => {
    "use server";
    revalidatePath("/home");
  };
  return (
    <div className="py-5 px-4">
      <InitialProduct initialProducts={initialProducts} />
      <form action={revalidate}>
        <button>revalidate</button>
      </form>
      <Link
        href="/products/add"
        className="size-16 bg-main-color text-white flex justify-center items-center rounded-full fixed bottom-24 right-8 transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
