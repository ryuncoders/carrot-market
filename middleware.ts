import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("hello middleware");
}

export const config = {
  //   matcher: ["/", "/profile", "/create-account"],
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
