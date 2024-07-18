"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import updateUsernameHandle from "./actions";

export default function UpdateUsername(code: string) {
  const [state, dispatch] = useFormState(updateUsernameHandle, null);
  return (
    <div className="w-full py-8 px-6 *:text-lg *:font-medium flex flex-col gap-10 my-auto">
      <div>
        <h1>이름을 변경하세요!</h1>
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
        <Input value={code} name="code" type="text" className="hidden "></Input>
        <Button text="변경하기" />
      </form>
    </div>
  );
}
