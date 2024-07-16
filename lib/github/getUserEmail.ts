export async function getUserEmail(access_token: string) {
  const userEmailResponse = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });
  const data = await userEmailResponse.json();
  return data[0];
}
