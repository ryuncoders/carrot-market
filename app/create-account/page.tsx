"use client";

import Btn from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import createAccountHandle from "./actions";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccountHandle, null);
  return (
    <div className="w-full py-8 px-6 *:text-lg *:font-medium flex flex-col gap-10 my-auto">
      <div>
        <h1>안녕하세요!</h1>
        <h2>아래 양식을 작성하여 가입하세요!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="사용자 이름"
          required
          minLength={3}
          maxLength={10}
          errors={state?.fieldErrors.username}
        />
        <Input
          errors={state?.fieldErrors.email}
          name="email"
          type="email"
          placeholder="이메일"
          required
        />
        <Input
          name="password"
          type="password"
          minLength={4}
          placeholder="비밀번호"
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="비밀번호 확인"
          minLength={4}
          required
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text="회원가입" />
      </form>
      <SocialLogin text="회원가입" />
    </div>
  );
}
