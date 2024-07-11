import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";
import { redirect } from "next/navigation";
import { url } from "inspector";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  console.log("session", session);
  console.log("request.url", request.url);

  return NextResponse.redirect(new URL("/", request.url));
}
