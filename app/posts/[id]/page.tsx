import db from "@/lib/db";
import getSession from "@/lib/session/get";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon } from "@heroicons/react/24/solid";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeButton from "@/components/like-button";
import Comment from "@/components/comment";

async function getPost(id: number) {
  try {
    const post = db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      select: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        title: true,
        description: true,
        created_at: true,
        views: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  } catch {
    return null;
  }
}

const getCachedPost = nextCache(getPost, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 60,
});

async function getLikeStatus(postId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });

  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  const userId = session.id!;
  const cachedOperation = nextCache(getLikeStatus, ["post-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId, userId);
}

async function getComments(postId: number, userId: number) {
  const comments = db.comment.findMany({
    where: {
      userId,
      postId,
    },
    select: {
      payload: true,
      postId: true,
      created_at: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return comments;
}

async function getCacheComments(postId: number) {
  const session = await getSession();
  const userId = session.id!;
  const getCacheComments = nextCache(getComments, ["post-comments"], {
    tags: [`post-comments-${postId}`],
  });
  return getCacheComments(postId, userId);
}

async function getUser() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      username: true,
      avatar: true,
    },
  });
  return user;
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }

  const comments = await getCacheComments(id);
  const { isLiked, likeCount } = await getCachedLikeStatus(id);
  const user = await getUser();
  return (
    <>
      <div className="flex flex-col gap-5 py-5 px-4">
        <div className="flex items-center">
          <div className="size-7 rounded-full relative overflow-hidden mr-2">
            <Image fill src={post.user.avatar!} alt={post.user.username} />
          </div>
          <span>{post.user.username}</span>
          <span className="ml-auto text-sm">
            {formatToTimeAgo(post.created_at + "")}
          </span>
        </div>
        <div className="flex flex-col mb-5 min-h-40 p-2 gap-1">
          <h2 className="font-semibold text-xl">{post.title}</h2>
          <p className="text-base">{post.description}</p>
        </div>
        <div className="flex justify-between items-center ">
          <div className="flex items-center text-sm">
            <EyeIcon className="size-5 mr-2" />
            {post.views}명이 봤어요
          </div>
          <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
        </div>
      </div>
      <Comment comments={comments} user={user!} postId={id} />
    </>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPost(+params.id);
  return {
    title: `${post?.title}`,
  };
}
