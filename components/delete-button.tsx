"use client";

import { onDelete } from "@/app/products/[id]/actions";
import { TrashIcon } from "@heroicons/react/24/outline";

interface DeleteBtnProps {
  id: string;
  isOwner: boolean;
}

export default function DeleteBtn({ id, isOwner }: DeleteBtnProps) {
  const onClick = () => {
    const result = confirm("삭제하시겠습니까?");
    if (result) {
      onDelete(+id, isOwner);
    } else {
      return;
    }
  };
  return (
    <div onClick={onClick} className="cursor-pointer">
      <TrashIcon className="size-8" />
    </div>
  );
}
