"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import smsVerification from "./actions";

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsVerification, null);
  return (
    <div className="w-full py-8 px-6 *:text-lg *:font-medium flex flex-col gap-10 my-auto">
      <div>
        <h1>SMS 로그인</h1>
        <h2>전화번호를 확인합니다.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input name="phone" type="number" placeholder="전화번호" required />
        <Input name="token" type="number" placeholder="인증번호" required />
        <Button text="인증확인" />
      </form>
    </div>
  );
}
