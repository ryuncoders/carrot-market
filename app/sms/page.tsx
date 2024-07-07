"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import smsLogin from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);
  return (
    <div className="w-full py-8 px-6 *:text-lg *:font-medium flex flex-col gap-10 my-auto">
      <div>
        <h1>SMS 로그인</h1>
        <h2>전화번호를 확인합니다.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            key="token"
            name="token"
            type="number"
            placeholder="인증번호"
            required
            min={100000}
            max={999999}
          />
        ) : (
          <Input
            key="phone"
            name="phone"
            type="number"
            placeholder="전화번호"
            required
            errors={state.error?.formErrors}
          />
        )}

        <Button text={state.token ? "인증확인" : "인증번호 보내기"} />
      </form>
    </div>
  );
}
