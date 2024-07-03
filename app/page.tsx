export default function Home() {
  return (
    <main className="bg-gray-600 h-screen flex items-center justify-center p-5">
      <form className="group flex-col max-w-screen-md min-w-40 flex p-5 rounded-2xl bg-white">
        <input type="email" placeholder="Write email" />
        <span className="group-focus-within:block hidden">email focus</span>

        <button type="submit">submit</button>
      </form>
    </main>
  );
}
