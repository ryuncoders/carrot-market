"use client";

import Link from "next/link";

interface ReviewButtonProps {
  productId: number;
}

export default function ReviewButton({ productId }: ReviewButtonProps) {
  return <Link href={`/product/review/${productId}`}>후기보내기</Link>;
}
