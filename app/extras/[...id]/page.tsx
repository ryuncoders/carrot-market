export default function Extras({ params }: { params: { id: string[] } }) {
  console.log("params", params);
  // id: ['1', '2', '3']

  return (
    <div className="flex flex-col gap-3 py-10 px-5">
      <h1 className="text-6xl font-protest">Extras!</h1>
      <h2 className="font-roboto">So much more to learn!</h2>
    </div>
  );
}
