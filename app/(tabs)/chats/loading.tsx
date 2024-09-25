export default function Loading() {
  return (
    <div className="p-2 animate-pulse">
      <div className="flex flex-col gap-10 p-5">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex gap-5">
            <div className="size-14 relative">
              <div className="bg-neutral-700 object-cover size-10 overflow-hidden rounded-full top-0 left-0 absolute border-2 border-neutral-400" />
              <div className="bg-neutral-600 object-cover size-10 overflow-hidden rounded-md   bottom-0 right-0 absolute border-2" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex gap-2 *:rounded-full">
                <div className="h-3 w-11 bg-neutral-500" />
                <span className=" text-neutral-500">·</span>
                <div className="bg-neutral-500 h-3 w-8" />
              </div>
              <div className="flex gap-2 *:rounded-full">
                <div className="bg-neutral-600 h-4 w-24" />
                <div className="bg-neutral-600 h-4 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
