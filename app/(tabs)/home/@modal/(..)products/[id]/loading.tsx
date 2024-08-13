import Button from "@/components/button";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Layout() {
  return (
    <div className="fixed  top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="max-w-screen-sm h-1/2 bg-white z-50 flex flex-col sm:flex-row w-full ">
        <div className="sm:w-1/2 w-full h-full bg-neutral-900 flex items-center justify-center">
          <PhotoIcon className="h-10" />
        </div>
        <div className="flex flex-col gap-3 w-full sm:w-1/2 p-3 bg-neutral-800 *:animate-pulse">
          <div className="w-15 h-8 bg-neutral-900 rounded-2xl" />
          <div className="bg-neutral-700 opacity-10 h-[1px] rounded-md" />
          <div className="flex gap-2 flex-col">
            <div className="w-40 h-3 bg-neutral-900 rounded-md" />
            <div className="w-28 h-3 bg-neutral-900 rounded-md" />
            <div className="w-32 h-3 bg-neutral-900 rounded-md" />
          </div>
          <div className="mt-auto flex gap-2 items-center justify-between h-10">
            <div className=" bg-neutral-900 size-8 rounded-full " />
            <div className="w-30 h-3 bg-neutral-900 rounded-md mr-4" />
            <Button text="구매" />
          </div>
        </div>
      </div>
      <div className="fixed top-0 left-0 bg-black opacity-60 w-full h-full"></div>
    </div>
  );
}
