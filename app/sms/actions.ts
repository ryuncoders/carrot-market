"use server";

import { z } from "zod";

const smsSchema = z.object({
  phone: z.number().max(11),
  token: z.string(),
});

export default async function smsVerification(
  prevState: any,
  formData: FormData
) {
  const data = {
    phone: formData.get("phone"),
    token: formData.get("token"),
  };
  const results = smsSchema.safeParse(data);
  return results;
}
