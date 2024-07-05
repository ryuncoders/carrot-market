"use client";

import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function LogIn() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <div className="w-full py-8 px-6 *:text-lg *:font-medium flex flex-col gap-10 my-auto">
      <div>
        <h1>안녕하세요!</h1>
        <h2>이메일과 비밀번호로 로그인합니다.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput name="email" type="email" placeholder="이메일" required />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호"
          required
        />
        <FormBtn text="로그인" />
      </form>

      <SocialLogin text="로그인" />
    </div>
  );
}
