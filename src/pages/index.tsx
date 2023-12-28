import { useState } from "react";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.create.useMutation();
  const [val, setVal] = useState("");

  const handleKeyDown = (e: any) => {
    switch (e.code) {
      case "Enter":
        if (e.target.value) {
          hello.mutate({ text: e.target.value });
        }
        break;
      default:
        return;
    }
    setVal("");
  }

  const handleChange = (e: any) => {
    setVal(e.target.value)
  }

  return (
    <div className="text-cyan-100 text-2xl flex justify-center items-center flex-col h-[100vh] gap-2">
      <div>
        <h1 className="font-semibold">Todo List</h1>
      </div>
      <input value={val} onChange={handleChange} onKeyDown={handleKeyDown} className="text-violet-500 text-xl p-1" />
      <div className="h-[2vh]"></div>
      <div className="h-[60vh] w-[70%] flex flex-wrap gap-2 items-start content-start">
        {
          hello.data?.map(obj =>
            <div className="p-1 bg-violet-700 rounded-sm">
              {obj.name}
            </div>)
          ?? ""
        }
      </div>
    </div>
  );
}
