"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { z } from "zod";

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "숫자 x, 글자 작성",
        required_error: "이름 작성",
      })
      .trim()
      .toLowerCase(),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용중인 이름입니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export default async function updateUsernameHandle(
  prevState: any,
  formData: FormData
) {
  const username = formData.get("username");
  const code = formData.get("code");
  // object 사용시 {} 필요
  // object 없이는 {} 필요 X
  const result = await formSchema.safeParseAsync({ username });

  if (!result.success) {
    return result.error.flatten();
  } else {
    redirect(`github/complete/${code}`);
  }
}
