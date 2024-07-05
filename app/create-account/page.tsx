"use client";

import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
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
        <FormInput
          name="username"
          type="text"
          placeholder="사용자 이름"
          required
        />
        <FormInput name="email" type="email" placeholder="이메일" required />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호"
          required
        />
        <FormInput
          name="conform_password"
          type="password"
          placeholder="비밀번호 확인"
          required
        />
        <FormBtn text="회원가입" />
      </form>
      <SocialLogin text="회원가입" />
    </div>
  );
}
