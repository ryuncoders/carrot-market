import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-600 h-screen flex items-center justify-center p-5">
      <form className="bg-white p-3 rounded-2xl max-w-screen-lg">
        <div className="my-3 flex flex-col gap-2">
          <input
            type="email"
            placeholder="email"
            required
            className="px-5 py-2 bg-slate-200 rounded-full w-full 
            ring ring-transparent focus:ring-green-500 
            focus:ring-offset-2 transition-shadow
             invalid:focus:ring-red-600 outline-none peer"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            minLength={5}
            required
            className="px-5 py-2 bg-slate-200 rounded-full w-full outline-none 
            ring ring-transparent ring-offset-2 transition-shadow
             focus:ring-green-500 invalid:focus:ring-red-500
            
            "
          />
          <span className=" text-red-500 font-medium hidden peer-invalid:block ">
            Email is required.
          </span>
        </div>

        <button
          type="submit"
          className="bg-black text-white w-full rounded-full py-2 font-bold"
        >
          Log in
        </button>
      </form>
    </main>
  );
}
