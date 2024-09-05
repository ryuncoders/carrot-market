"use client";

import { onDelete } from "@/app/products/[id]/actions";
import { TrashIcon } from "@heroicons/react/24/outline";

interface DeleteBtnProps {
  id: string;
}

export default function DeleteBtn({ id }: DeleteBtnProps) {
  const onClick = async () => {
    const result = confirm("삭제하시겠습니까?");
    if (result) {
      await onDelete(+id);
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
