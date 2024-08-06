"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getUploadURL, uploadProduct } from "./actions";
import { useFormState } from "react-dom";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadURL, setUploadURL] = useState("");
  const [photoId, setPhotoId] = useState("");
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

    const { success, result } = await getUploadURL();
    if (success) {
      const { id, uploadURL } = result;
      setUploadURL(uploadURL);
      setPhotoId(id);
    }
  };

  const interceptAction = async (_: any, formData: FormData) => {
    // upload전 URL로 변경
    const file = formData.get("photo");
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
    const photoURL = `https://imagedelivery.net/XnCI-r_Qme1s5loDFzOTkg/${photoId}`;
    formData.set("photo", photoURL);
    return uploadProduct(_, formData);
  };
  const [state, action] = useFormState(interceptAction, null);
  return (
    <div>
      <form action={action} className="p-5 flex flex-col gap-5">
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
                {state?.fieldErrors.photo}
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
          name="title"
          errors={state?.fieldErrors.title}
          required
          placeholder="제목"
          type="text"
        />
        <Input
          name="price"
          errors={state?.fieldErrors.price}
          required
          placeholder="가격"
          type="number"
        />
        <Input
          errors={state?.fieldErrors.description}
          name="description"
          required
          placeholder="자세한 설명"
          type="text"
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
