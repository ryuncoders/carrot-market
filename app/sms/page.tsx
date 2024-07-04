import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function SMSLogin() {
  return (
    <div className="w-full py-8 px-6 *:text-lg *:font-medium flex flex-col gap-10 my-auto">
      <div>
        <h1>SMS 로그인</h1>
        <h2>전화번호를 확인합니다.</h2>
      </div>
      <form className="flex flex-col gap-1">
        <FormInput
          type="number"
          placeholder="전화번호"
          required
          errors={[""]}
        />
        <FormInput
          type="number"
          placeholder="인증번호"
          required
          errors={[""]}
        />

        <FormBtn loading={false} text="인증확인" />
      </form>
    </div>
  );
}
