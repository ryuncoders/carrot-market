// 1. 사용자는 GitHub ID를 요청하도록 리디렉션됩니다.

export function GET() {
  const baseURL = "https://github.com/login/oauth/authorize";
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user, user:email",
    allow_signup: "true",
  };
  const formatterParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formatterParams}`;
  return Response.redirect(finalUrl);
}
