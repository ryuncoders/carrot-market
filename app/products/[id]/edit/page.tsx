import db from "@/lib/db";
import ProductEditForm from "@/components/product-edit-form";
import { notFound } from "next/navigation";
import getSession from "@/lib/session/get";

async function getProduct(id: number) {
  const product = db.product.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
      title: true,
      price: true,
      description: true,
      photo: true,
    },
  });
  return product;
}

export default async function ProductEdit({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct(+id);
  const session = await getSession();
  if (session.id !== product?.userId) {
    return notFound();
  }
  if (!product) {
    return notFound();
  }
  return (
    <>
      {product ? (
        <div>
          <ProductEditForm initialProduct={product} productId={id} />
        </div>
      ) : (
        notFound
      )}
    </>
  );
}
