"use client";

import editHandle from "@/app/products/[id]/edit/action";
import Input from "./input";
import Button from "./button";
import React, { useState } from "react";
import { getUploadURL } from "@/app/products/add/actions";
import { useForm } from "react-hook-form";
import { productSchema, ProductType } from "@/app/products/add/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import NotFound from "@/app/not-found";
import Image from "next/image";

interface ProductProps {
  id: string;
  product: {
    title: string;
    price: number;
    description: string;
    photo: string;
  };
  isOwner: boolean;
}

export default function EditForm({
  id,
  product: { title, price, description, photo },
  isOwner,
}: ProductProps) {
  const [preview, setPreview] = useState(photo);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadURL, setUploadURL] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });
  const onValid = async () => {
    await onSubmit();
  };
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
      setErrorMessage("사진의 크기는 3MB 이하여야 합니다.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);

    const { success, result } = await getUploadURL();
    if (success) {
      const { id, uploadURL } = result;
      setUploadURL(uploadURL);
      setValue(
        "photo",
        `https://imagedelivery.net/XnCI-r_Qme1s5loDFzOTkg/${id}`
      );
    }
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
    return editHandle(id, formData);
  });
  return (
    <>
      {isOwner ? (
        <div className="p-5">
          <form action={onValid} className="flex flex-col gap-5">
            <label
              htmlFor="photo"
              style={{ backgroundImage: `url(${preview})` }}
              className="relative bg-center bg-cover border-2 aspect-square flex justify-center items-center flex-col border-dashed cursor-cursor-pointer rounded-md"
            >
              {photo === preview ? (
                <Image
                  src={`${photo}/shapen=2`}
                  fill
                  alt={title}
                  className="object-cover"
                />
              ) : null}
            </label>
            <input
              onChange={onImageChange}
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              className="hidden"
            />
            <span>{errorMessage}</span>
            <Input
              {...register("title")}
              placeholder="제목"
              type="text"
              required
              defaultValue={title}
            />
            <Input
              {...register("price")}
              placeholder="가격"
              type="text"
              required
              defaultValue={price}
            />
            <Input
              {...register("description")}
              placeholder="자세한 설명"
              type="text"
              defaultValue={description}
            />
            <Button text="수정완료" />
          </form>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}
