import UpdateUsername from "@/app/(auth)/update/username/page";
import db from "@/lib/db";
import { getAccessToken } from "@/lib/github/getAccessToken";
import { getUserEmail } from "@/lib/github/getUserEmail";
import { getUserProfile } from "@/lib/github/getUserProfile";
import updateSession from "@/lib/session/update";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

// 2. GitHub가 사용자를 사이트로 다시 리디렉션합니다.
export async function GET(request: NextRequest) {
  console.log("in complete route");
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return notFound();
  }
  const { error, access_token } = await getAccessToken(code);
  if (error) {
    return new Response(null, { status: 400 });
  }

  // 3. 앱이 사용자의 액세스 토큰을 사용하여 API에 액세스합니다.
  const { id, avatar_url, login } = await getUserProfile(access_token);
  const { email } = await getUserEmail(access_token);

  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });
  // user가 있는 경우
  if (user) {
    await updateSession(user.id);
    return redirect("/profile");
  }

  // user가 없는경우: username 겹치는지 확인
  const getUsername = await db.user.findUnique({
    where: {
      username: login,
    },
    select: {
      id: true,
    },
  });

  let newUsername = login;
  if (getUsername) {
    // Todo: UpdateUsername(code);
    newUsername = `${login}-gh`;
  }
  const newUser = await db.user.create({
    data: {
      username: newUsername,
      github_id: id + "",
      avatar: avatar_url,
      email,
    },
    select: {
      id: true,
    },
  });
  await updateSession(newUser.id);
  return redirect("/profile");
}
