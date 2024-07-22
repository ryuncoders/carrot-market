export default function Loading() {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-5">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="flex gap-5">
          <div className="size-28 bg-neutral-700 rounded-md" />
          <div className=" flex flex-col gap-2 *:rounded-md">
            <div className="w-40 h-5 bg-neutral-700" />
            <div className="w-20 h-5 bg-neutral-700" />
            <div className="w-10 h-5 bg-neutral-700" />
          </div>
        </div>
      ))}
    </div>
  );
}
