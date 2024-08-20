import EditForm from "@/components/edit-form";
import { getIsOwner, getProduct } from "../page";
import NotFound from "@/app/not-found";
import { unstable_cache as nextCache } from "next/cache";

const getCahcedProduct = nextCache(getProduct, ["product-detail"], {
  tags: ["product-details"],
});

export default async function ProductEdit({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getCahcedProduct(+id);
  const isOwner = Boolean(getIsOwner(product?.userId!));

  return (
    <>
      {product ? (
        <>
          <EditForm id={id} product={product} isOwner={isOwner} />
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
}
