export default function Home() {
  return (
    <main className="bg-gray-600 h-screen flex items-center justify-center p-5">
      <div className="max-w-screen-md min-w-40 flex justify-center items-center p-5 rounded-2xl bg-white">
        <ul>
          {["Jane Cooper", "Leslie Alexander", "Elannor Pona", ""].map(
            (item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 mb-3 last:mb-0 *:flex *:justify-center *:items-center"
              >
                <div className="size-8 bg-blue-400 rounded-full " />
                <span className="flex items-center font-bold empty:bg-gray-300 empty:h-3 empty:w-20 empty:animate-pulse">
                  {item}
                </span>
                <div className="bg-red-500 text-white rounded-full size-5 text-xs relative z-10">
                  <span className="z-10">{index}</span>
                  <div className="bg-red-500 rounded-full size-5 absolute animate-ping" />
                </div>

                <div className="ml-auto bg-gray-300 size-8 rounded-full font-semibold">
                  {">"}
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </main>
  );
}
