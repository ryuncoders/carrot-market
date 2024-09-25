import { InitialProducts } from "@/app/(tabs)/profile/products/page";

interface InitialProductProps {
  initialProduct: InitialProducts;
}

export default function PersonalInitialProduct({
  initialProduct,
}: InitialProductProps) {
  return (
    <div>
      <div>
        <span>판매중</span>
      </div>
      <div>
        <span>거래완료</span>
      </div>
      <div>
        <span>숨김</span>
      </div>
    </div>
  );
}
