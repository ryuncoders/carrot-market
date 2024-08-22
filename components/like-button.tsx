"use client";

import { dislikePost, likePost } from "@/app/posts/[id]/action";
import { HandThumbUpIcon as HandThumbUpIconOutLine } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumUpIconSolid } from "@heroicons/react/24/solid";
import { useOptimistic } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  postId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  const onClick = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };
  return (
    <button
      onClick={onClick}
      className="flex items-center text-sm border border-neutral-400 rounded-full p-2 hover:bg-neutral-700 transition-colors"
    >
      {state.isLiked ? (
        <HandThumUpIconSolid className="size-5 mr-2" />
      ) : (
        <HandThumbUpIconOutLine className="size-5 mr-2" />
      )}
      <span>{state.likeCount}</span>
    </button>
  );
}
