import PersonalInitialProduct from "@/components/personal-initial-product";
import db from "@/lib/db";
import getSession from "@/lib/session/get";
import { Prisma } from "@prisma/client";

async function getProducts(userId: number) {
  const products = db.product.findMany({
    where: {
      userId,
    },
    select: {
      title: true,
      created_at: true,
      price: true,
      photo: true,
      state: true,
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getProducts>;

export default async function ProductList() {
  const session = await getSession();
  const initialProduct = await getProducts(session.id!);
  return (
    <div>
      <PersonalInitialProduct initialProduct={initialProduct} />
    </div>
  );
}
