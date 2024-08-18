import InitialProduct from "@/components/initial-product";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import Link from "next/link";

const getCachedProducts = nextCache(getInitialProducts, ["home-products"], {
  tags: ["home-products"],
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
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}
export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;
export const metadata = {
  title: "Home",
};

export const dynamic = "force-dynamic";

export default async function Products() {
  const initialProducts = await getCachedProducts();

  const revalidate = async () => {
    "use server";
    revalidateTag("home-products");
  };
  return (
    <div className="py-5 px-4">
      <InitialProduct initialProducts={initialProducts} />
      <form action={revalidate}>
        <button className="bg-blue-500 px-5 py-2.5 rounded-md text-white font-semibold">
          Click!
        </button>
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
