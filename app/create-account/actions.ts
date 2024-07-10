"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "숫자 x, 글자 작성",
        required_error: "이름 작성",
      })
      .trim()
      .toLowerCase()
      .refine(checkUniqueUsername, "이미 사용중인 이름입니다."),
    // .transform((username) => `✔️${username}`)
    email: z
      .string()
      .email()
      .refine(checkUniqueEmail, "이미 존재하는 이메일 입니다."),
    password: z.string().min(PASSWORD_MIN_LENGTH, "4글자 이상"),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string(),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm_password"],
  });

export default async function createAccountHandle(
  prevState: any,
  formData: FormData
) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // check if the username is already used
    // check if the email is already used
    // hash password
    // log the user in
    // redirect "/home"
  }
}
