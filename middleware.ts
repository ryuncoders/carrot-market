import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session/get";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/create-account": true,
  "/sms": true,
  "/update": true,
  "/github/start": true,
  "/github/complete": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exits = publicOnlyUrls[request.nextUrl.pathname];
  // session 없는 경우
  if (!session.id) {
    // 접근가능한 주소가 아닌경우
    if (!exits) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (exits) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
}

export const config = {
  //   matcher: ["/", "/profile", "/create-account"],
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
