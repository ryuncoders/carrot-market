"use client";

import { createCommentHandle } from "@/app/posts/[id]/action";
import { useOptimistic, useState } from "react";
import { useForm } from "react-hook-form";

interface IData {
  payload: string;
}

interface IComment {
  payload: string;

  user: {
    username: string;
    created_at: Date;
    avatar: string | null;
  };
}

interface CommentProps {
  comments: IComment[];
  user: {
    username: string;
  };
  postId: number;
}

export default function Comment({ comments, user, postId }: CommentProps) {
  const { register, handleSubmit, reset } = useForm<IData>();
  const [optimisticComments, setOptimisticComments] = useOptimistic(
    comments,
    (previousState, newComment: IComment) => [...previousState, newComment]
  );
  const onValid = async (data: IData) => {
    if (data.payload === "") {
      return;
    }
    const newComment: IComment = {
      payload: data.payload,
      user: {
        username: user.username || "You",
        created_at: new Date(),
        avatar: null,
      },
    };
    setOptimisticComments(newComment);

    try {
      await createCommentHandle(postId, data.payload);
    } catch (e) {
      console.log("Failed to create comment:", e);
    } finally {
      reset();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)} className="flex w-full">
        <input
          className="text-black"
          type="text"
          placeholder="댓글"
          {...register("payload")}
        />
        <button type="submit" className="p-3 bg-red-600 hover:bg-neutral-600">
          등록
        </button>
      </form>
      <div className="flex flex-col gap-2 ">
        {optimisticComments.map((comment: IComment, index: number) => (
          <div className="flex justify-between border px-2 py-3" key={index}>
            <p>{comment.payload}</p>
            <span>{comment.user.username}</span>
          </div>
        ))}
      </div>
    </>
  );
}
