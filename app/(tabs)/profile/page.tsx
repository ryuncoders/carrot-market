import Review from "@/components/review";
import db from "@/lib/db";
import getSession from "@/lib/session/get";
import { ChevronRightIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        product: true,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}
const logOut = async () => {
  "use server";
  const session = await getSession();
  session.destroy();
  redirect("/");
};

async function Username() {
  const user = await getUser();
  return (
    <div className="flex gap-3 items-center">
      <div className="relative rounded-full size-16 border border-neutral-600 overflow-hidden">
        <Image
          fill
          alt={user.username}
          src={user.avatar ? user.avatar : "/user.png"}
        />
      </div>
      <div className="flex gap-2 items-center">
        <h1 className="font-semibold text-xg">{user?.username}</h1>
        <span className="text-xs text-neutral-500">#{user.id}</span>
      </div>
    </div>
  );
}

export default async function Profile() {
  const user = await getUser();
  return (
    <>
      <div className="flex  flex-col gap-3">
        <div className="flex px-5 py-3 border-b border-neutral-600 justify-between items-center">
          <span className="font-bold text-lg">프로필</span>
          <Cog6ToothIcon className="size-7" />
        </div>
        <div className="p-5 flex flex-col gap-3">
          <Suspense fallback={"user"}>
            <Username />
          </Suspense>
          <Link
            href={`/profile/${user.id}`}
            className="max-w-full bg-orange-500 rounded-md flex items-center justify-center text-white py-2 text-sm"
          >
            <span>프로필 수정</span>
          </Link>
        </div>
        <div className="flex flex-col *:w-full *:text-white *:border-b *:border-neutral-600 *:p-3">
          <Link className="flex items-center justify-between" href={"/"}>
            <span>판매물품 {user.product.length}개</span>

            <ChevronRightIcon className="size-6 font-bold" />
          </Link>
          <Link className="" href={"/"}>
            <div className="flex items-center justify-between">
              <span>받은 거래 후기 {2}</span>
              <ChevronRightIcon className="size-6 font-bold" />
            </div>
            <Review />
          </Link>
        </div>

        <form action={logOut} className="px-3">
          <button className="w-full rounded-md bg-neutral-600 text-white py-3">
            Log out
          </button>
        </form>
      </div>
    </>
  );
}
