"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "숫자 x, 글자 작성",
        required_error: "이름 작성",
      })
      .trim()
      .toLowerCase()
      .transform((username) => `✔️${username}`)
      .refine((username) => !username.includes("potato"), "potato 사용 금지"),
    email: z.string().email(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "4글자 이상")
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
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
  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }
}
