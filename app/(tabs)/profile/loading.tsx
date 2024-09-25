import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return (
    <div>
      <div className="flex  flex-col gap-3">
        <div className="flex px-5 py-3 border-b border-neutral-600 justify-between items-center">
          <span className="font-bold text-lg">프로필</span>
          <FaceSmileIcon className="size-7" />
        </div>
        <div className="p-5 flex flex-col gap-3">
          <div className=""></div>
          <div className="flex gap-3 items-center">
            <div className="relative rounded-full size-16 border bg-neutral-400 " />
            <div className="flex gap-2 items-center">
              <h1 className="font-semibold text-xg">user</h1>
              <span className="text-xs text-neutral-500">#0</span>
            </div>
          </div>
          <div className="max-w-full bg-orange-500 rounded-md flex items-center justify-center text-white py-2 text-sm">
            <span>프로필 수정</span>
          </div>
        </div>
        <div className="flex flex-col *:w-full *:text-white *:border-b *:border-neutral-600 *:p-3">
          <div className="flex items-center justify-between">
            <span>판매물품 0개</span>

            <ChevronRightIcon className="size-6 font-bold" />
          </div>
          <div className="">
            <div className="flex items-center justify-between">
              <span>받은 거래 후기 0개</span>
              <ChevronRightIcon className="size-6 font-bold" />
            </div>
          </div>
        </div>

        <div className="px-3">
          <button className="w-full rounded-md bg-neutral-600 text-white py-3">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
