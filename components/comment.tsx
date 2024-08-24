"use client";

import { createCommentHandle } from "@/app/posts/[id]/action";
import { formatToTimeAgo } from "@/lib/utils";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useOptimistic } from "react";
import { useForm } from "react-hook-form";

interface IData {
  payload: string;
}

interface IComment {
  payload: string;
  created_at: Date;
  user: {
    username: string;

    avatar: string | null;
  };
}

interface CommentProps {
  comments: IComment[];
  user: {
    username: string;
    avatar: string | null;
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
      created_at: new Date(),
      user: {
        username: user.username || "You",
        avatar: user.avatar,
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
      <div className="flex flex-col px-3">
        <hr />
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex w-full h-10 gap-1 my-5 px-2 justify-between"
        >
          <input
            className="text-black w-full rounded-full "
            type="text"
            placeholder="댓글을 입력해주세요."
            {...register("payload")}
          />
          <button type="submit">
            <PaperAirplaneIcon className="size-7 hover:text-orange-500 transition-colors" />
          </button>
        </form>
        <div className="py-4 *:text-neutral-300 *:text-xs flex justify-between px-2">
          <span className="text-sm">댓글 {optimisticComments.length}</span>
          <div className="flex gap-3 ">
            <span className="font-bold">등록순</span>
            <span>최신순</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-3">
          {optimisticComments.map((comment: IComment, index: number) => (
            <div className="flex flex-col " key={index}>
              <div className="flex items-center gap-2 *:text-xs">
                <div className="size-7 relative overflow-hidden rounded-full">
                  <Image
                    fill
                    src={comment.user.avatar!}
                    alt={comment.user.username}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">{comment.user.username}</span>
                  <span className="text-neutral-400">
                    {formatToTimeAgo(comment.created_at + "")}
                  </span>
                </div>
              </div>
              <p className="pl-9 ">{comment.payload}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
