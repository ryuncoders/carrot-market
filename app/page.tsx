import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-300 flex justify-center items-center h-screen dark:bg-slate-700">
      <div className="bg-white rounded-2xl shadow-2xl p-3.5 dark:bg-slate-600">
        <div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold -mb-1 dark:text-gray-300">
                In transit
              </span>
              <span className="text-4xl font-semibold dark:text-white">
                Coolblue
              </span>
            </div>
            <div className="size-12 bg-orange-600 rounded-full flex text-white items-center justify-center font-semibold text-sm ">
              <span>
                cool
                <br />
                blue
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-400 text-white uppercase px-2 py-1 rounded-full text-xs transition-all hover:bg-green-500">
              Today
            </span>
            <span className="dark:text-white">9:30-10:30u</span>
          </div>
          <div className="relative">
            <div className="absolute w-full bg-gray-200 rounded-full h-2" />
            <div className="absolute w-3/4 bg-green-500 rounded-full h-2" />
          </div>
          <div className="dark:text-slate-400 whitespace-nowrap flex justify-between items-center mt-5 text-gray-600 gap-3">
            <span>Expected</span>
            <span>Sorting Center</span>
            <span>In transit</span>
            <span className="text-gray-400 dark:text-slate-500">Deilvered</span>
          </div>
        </div>
      </div>
    </main>
  );
}
