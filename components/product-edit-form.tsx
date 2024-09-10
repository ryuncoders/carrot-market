"use client";

import { getUploadURL } from "@/app/product/add/actions";
import { productSchema, ProductType } from "@/app/product/add/schema";
import { updateHandle } from "@/app/products/[id]/edit/action";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Product {
  title: string;
  price: number;
  description: string;
  photo: string;
}

export default function ProductEditForm({
  initialProduct,
  productId,
}: {
  initialProduct: Product;
  productId: string;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState<File | null>();
  const [uploadURL, setUploadURL] = useState("");

  const [preview, setPreview] = useState(initialProduct.photo);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductType>({ resolver: zodResolver(productSchema) });

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const fileType = file.type;
    if (!fileType.startsWith("image/")) {
      setErrorMessage("사진이 아닙니다. 다시 선택해주세요.");
      return;
    }

    const fileSize = file.size;
    const MB = 1024 * 1024;
    if (fileSize > MB * 3) {
      setErrorMessage("사진의 크기가 3MB 이하여야 합니다.");
      return;
    }

    const url = URL.createObjectURL(file);
    setFile(file);
    setPreview(url);

    const { success, result } = await getUploadURL();

    if (success) {
      const { id, uploadURL } = result;
      console.log("result", result);
      setValue(
        "photo",
        `https://imagedelivery.net/XnCI-r_Qme1s5loDFzOTkg/${id}`
      );
      setUploadURL(uploadURL);
    }
  };

  const onValid = async () => {
    await onSubmit();
  };

  const onSubmit = handleSubmit(async (data: ProductType) => {
    if (!file) {
      return;
    }

    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadURL, {
      method: "POST",
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price + "");
    formData.append("description", data.description);
    formData.append("photo", data.photo);
    return updateHandle(formData, +productId);
  });

  // const [state, formAction] = useFormState(onSubmit, null);

  return (
    <div className="py-10 px-3">
      <form
        action={onValid}
        className="flex flex-col gap-2 w-full *:text-black"
      >
        <label
          htmlFor="photo"
          className="relative rounded-md border-dashed cursor-pointer aspect-square  border-2 flex justify-center items-center "
        >
          <Image
            fill
            className="object-cover"
            src={
              preview.includes("imagedelivery")
                ? `${preview}/public`
                : `${preview}`
            }
            alt={initialProduct.title}
          />
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
        />
        <span>{errorMessage}</span>
        <input
          {...register("title")}
          type="text"
          placeholder="제목"
          defaultValue={initialProduct.title}
        />
        <input
          type="number"
          placeholder="가격"
          {...register("price")}
          defaultValue={initialProduct.price}
        />
        <input
          {...register("description")}
          type="text"
          placeholder="상세내용"
          defaultValue={initialProduct.description}
        />
        <button type="submit" className="bg-orange-500 p-3 rounded-lg">
          수정 완료
        </button>
      </form>
    </div>
  );
}
