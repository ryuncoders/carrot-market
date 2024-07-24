"use client";

import { InitialProducts } from "@/app/(tabs)/products/page";
import ListProduct from "./list-product";
import { useState } from "react";
import { getMoreProducts } from "@/app/(tabs)/products/actions";

interface ProductListProps {
  initialProducts: InitialProducts;
}

export default function InitialProduct({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(1);
    setProducts((prev) => [...prev, ...newProducts]);
    setIsLoading(false);
  };
  return (
    <div className="grid gap-3">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      <button
        onClick={onLoadMoreClick}
        className="mx-auto w-full border-t-white border-t-1 mt-4"
      >
        {isLoading ? "로딩 중" : "더 보기"}
      </button>
    </div>
  );
}
