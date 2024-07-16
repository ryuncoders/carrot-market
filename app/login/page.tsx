"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function LogIn() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <div className="w-full py-8 px-6 *:text-lg *:font-medium flex flex-col gap-10 my-auto">
      <div>
        <h1>안녕하세요!</h1>
        <h2>이메일과 비밀번호로 로그인합니다.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="이메일"
          errors={state?.fieldErrors.email}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={state?.fieldErrors.password}
        />
        <Button text="로그인" />
      </form>

      <SocialLogin />
    </div>
  );
}
