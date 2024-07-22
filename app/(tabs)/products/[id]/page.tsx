async function getProduct() {
  await new Promise((resolve) => setTimeout(resolve, 1000000));
}

export default function productDeail({
  params: { id },
}: {
  params: { id: string };
}) {
  const products = getProduct();
  return <span>product Detail {id}</span>;
}
