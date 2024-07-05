"use server";
import { z } from "zod";

const usernameSchema = z.string().min(5).max(10);

export default async function createAccountHandle(
  prevState: any,
  formData: FormData
) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    conform_password: formData.get("conform_password"),
  };
  usernameSchema.parse(data.username);
}
