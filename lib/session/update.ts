import getSession from "./get";

export default async function updateSession({ id }: { id: number }) {
  const session = await getSession();
  session.id = id;
  await session.save();
}
