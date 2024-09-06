import HackedComponent from "@/components/hacked";
import {
  experimental_taintObjectReference,
  experimental_taintUniqueValue,
} from "react";

async function getData() {
  const keys = {
    apiKey: "1111111",
    secret: "10101010",
  };
  // experimental_taintObjectReference("API key가 유출되었습니다.", keys);
  experimental_taintUniqueValue("비밀키가 유출되었습니다.", keys, keys.secret);
  return keys;
}

export default function Extras() {
  const data = getData();
  return (
    <div className="flex flex-col gap-3 py-10 px-5">
      <h1 className="text-6xl font-protest">Extras!</h1>
      <h2 className="font-roboto">So much more to learn!</h2>
      <HackedComponent data={data} />
    </div>
  );
}
