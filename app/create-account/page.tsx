import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function CreateAccount() {
  return (
    <div className="w-full py-8 px-6 *:text-lg *:font-medium flex flex-col gap-10 my-auto">
      <div>
        <h1>안녕하세요!</h1>
        <h2>아래 양식을 작성하여 가입하세요!</h2>
      </div>
      <form className="flex flex-col gap-1">
        <FormInput
          type="text"
          placeholder="사용자 이름"
          required
          errors={[""]}
        />
        <FormInput type="email" placeholder="이메일" required errors={[""]} />
        <FormInput
          type="password"
          placeholder="비밀번호"
          required
          errors={[""]}
        />
        <FormInput
          type="password"
          placeholder="비밀번호 확인"
          required
          errors={[""]}
        />
        <FormBtn loading={false} text="회원가입" />
      </form>
      <SocialLogin text="회원가입" />
    </div>
  );
}
