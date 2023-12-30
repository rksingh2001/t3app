import { useState } from "react";
import { api } from "~/utils/api";

function CloseButton() {
  return (
    <button type="button" className="bg-violet-800 rounded-md p-1 absolute top-[-0.25rem] right-[-0.25rem] inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
      <span className="sr-only">Close menu</span>
      <svg className="h-2 w-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}

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
        <h1 className="font-bold text-4xl">Todo List</h1>
      </div>
      <input value={val} onChange={handleChange} onKeyDown={handleKeyDown} className="text-violet-500 text-xl p-1" />
      <div className="h-[2vh]"></div>
      <div className="h-[60vh] w-[70%] flex flex-wrap gap-2 items-start content-start">
        {
          hello.data?.map(obj =>
            <div key={obj.id} className="relative p-2 bg-violet-700 rounded-sm">
              <CloseButton />
              {obj.name}
            </div>)
          ?? ""
        }
      </div>
    </div>
  );
}
