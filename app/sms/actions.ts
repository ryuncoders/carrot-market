"use server";

import validator from "validator";
import { z } from "zod";

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

const tokenSchema = z.coerce.number().min(100000).max(999999);

export default async function smsLogin(prevState: any, formData: FormData) {
  const data = {
    phone: formData.get("phone"),
    token: formData.get("token"),
  };
  return;
}
