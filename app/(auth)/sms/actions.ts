"use server";
import crypto from "crypto";
import twilio from "twilio";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import validator from "validator";
import { z } from "zod";
import updateSession from "@/lib/session/update";

export interface ActionState {
  token: boolean;
  phone?: string;
}

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "전화번호를 입력하세요."
  );
async function tokenExists(token: number) {
  const exists = await db.sMSToken.findUnique({
    where: {
      token: token.toString(),
    },
    select: {
      id: true,
    },
  });
  return Boolean(exists);
}
const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(tokenExists, "This token does not exist.");

async function getToken() {
  const token = crypto.randomInt(100000, 999999).toString();
  const exists = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });
  if (exists) {
    return getToken();
  } else {
    return token;
  }
}

export default async function smsLogin(
  prevState: ActionState,
  formData: FormData
) {
  const phone = formData.get("phone");
  const token = formData.get("token");
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      // delete previous token
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data,
          },
        },
      });
      // create token
      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                username: crypto.randomBytes(10).toString("hex"),
                phone: result.data,
              },
            },
          },
        },
      });
      // send the token suing twilio
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      await client.messages.create({
        body: `당근마켓 인증번호: ${token}`,
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: process.env.MY_PHONE_NUMBER!,
        // to: result.data
      });
      return {
        token: true,
        phone,
      };
    }
  } else {
    const result = await tokenSchema.spa(token);
    if (!result.success) {
      return {
        ...prevState,
        error: result.error.flatten(),
      };
    } else {
      // get the userId of Token
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data.toString(),
        },
        select: {
          id: true,
          userId: true,
          user: true,
        },
      });

      // log the user in
      if (prevState.phone !== token?.user.phone) {
        return {
          ...prevState,
          error: { formErrors: ["인증번호를 확인하세요."] },
        };
      }

      if (token) {
        updateSession(token.userId);
        await db.sMSToken.delete({
          where: {
            id: token!.id,
          },
        });
      }
      redirect("/profile");
    }
  }
}
