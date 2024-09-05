"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getUploadURL, uploadProduct } from "./actions";

import { useForm } from "react-hook-form";
import { productSchema, ProductType } from "./schema";

import { zodResolver } from "@hookform/resolvers/zod";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadURL, setUploadURL] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductType>({ resolver: zodResolver(productSchema) });
  const onValid = async () => {
    await onSubmit();
  };
  console.log("this page is add product");
  // image valid
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
      setErrorMessage("사진의 크기가 3MB이하여야 합니다.");
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

  // image submit
  const onSubmit = handleSubmit(async (data: ProductType) => {
    if (!file) {
      return;
    }
    // upload photo to cloudflare
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadURL, {
      method: "POST",
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      return;
    }
    // send data to zod
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price + "");
    formData.append("description", data.description);
    formData.append("photo", data.photo);
    return uploadProduct(formData);
  });

  return (
    <div>
      <form action={onValid} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="bg-center bg-cover border-2 aspect-square flex justify-center items-center flex-col border-dashed cursor-cursor-pointer rounded-md"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
                {errors.photo?.message}
              </div>
            </>
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
          errors={[errors.title?.message ?? ""]}
          required
          placeholder="제목"
          type="text"
        />
        <Input
          {...register("price")}
          errors={[errors.price?.message ?? ""]}
          required
          placeholder="가격"
          type="number"
        />
        <Input
          {...register("description")}
          errors={[errors.description?.message ?? ""]}
          required
          placeholder="자세한 설명"
          type="text"
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
