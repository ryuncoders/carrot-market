import db from "@/lib/db";
import getSession from "@/lib/session/get";

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
}

export default async function ProductList() {
  const session = await getSession();
  const products = await getProducts(session.id!);
  return <div>product list</div>;
}
