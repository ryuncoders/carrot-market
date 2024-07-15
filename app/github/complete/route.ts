import db from "@/lib/db";
import LoginSession from "@/lib/login-session";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

// 2. GitHub가 사용자를 사이트로 다시 리디렉션합니다.
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return notFound();
  }
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  });
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, { status: 400 });
  }

  // 3. 앱이 사용자의 액세스 토큰을 사용하여 API에 액세스합니다.
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });

  const { id, avatar_url, login } = await userProfileResponse.json();

  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await LoginSession(user);
    return redirect("/profile");
  }
  const newUser = await db.user.create({
    data: {
      username: `${login}_gh`,
      github_id: id + "",
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });
  await LoginSession(newUser);
  return redirect("/profile");
}
