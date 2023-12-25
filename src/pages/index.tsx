import { useState } from "react";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.create.useMutation();
  const [val, setVal] = useState("");

  const handleEnter = (e: any) => {
    if (e.code !== "Enter") {
      return;
    }

    hello.mutate({ text: e.target.value });
  }

  const handleChange = (e: any) => {
    console.log(e.target.value)
    setVal(e.target.value)
  }

  return (
    <div className="text-cyan-100 text-2xl flex justify-center items-center flex-col h-[100vh] gap-2">
      <div className="h-10">
        {hello.data?.name ?? ""}
      </div>
      <input value={val} onChange={handleChange} onKeyDown={handleEnter} className="text-violet-500 text-xl" />
    </div>
  );
}
