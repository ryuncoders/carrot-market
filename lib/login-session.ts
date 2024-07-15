import getSession from "./session";

export default async function LoginSession({ id }: { id: number }) {
  const session = await getSession();
  session.id = id;
  await session.save();
}
