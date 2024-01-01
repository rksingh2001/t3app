import { MouseEventHandler, useState } from "react";
import { api } from "~/utils/api";

function CloseButton({ handleOnClickCloseButton }: { handleOnClickCloseButton: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button onClick={handleOnClickCloseButton} type="button" className="bg-violet-800 rounded-md p-1 absolute top-[-0.25rem] right-[-0.25rem] inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
      <span className="sr-only">Close menu</span>
      <svg className="h-2 w-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}

export default function Home() {
  const hello = api.post.create.useMutation();
  const deletePost = api.post.delete.useMutation();
  const openPost = api.post.openPost.useMutation();
  const editPost = api.post.editPost.useMutation();
  const [val, setVal] = useState("");
  const [posts, setPosts] = useState(api.post.getAll.useQuery().data ?? []);

  const handleOnClickCloseButton = async (id: number) => {
    const res = await deletePost.mutateAsync(id);
    setPosts(res);
  }

  const handleKeyDown = async (e: any) => {
    switch (e.code) {
      case "Enter":
        if (e.target.value) {
          const res = await hello.mutateAsync({ text: e.target.value });
          setPosts(res);
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

  const handleInputOpen = async (id: number) => {
    const res = await openPost.mutateAsync(id);
    setPosts(res);
  }

  const handleInputChange = async (e: any, id: number) => {
    const res = await editPost.mutateAsync({ text: e.target.value, id });
    setPosts(res);
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
          posts?.map(obj =>
            <div onClick={() => handleInputOpen(obj.id)} key={obj.id} className="flex relative p-2 bg-violet-700 rounded-sm">
              <CloseButton key={obj.id} handleOnClickCloseButton={() => handleOnClickCloseButton(obj.id)} />
              {!obj.isOpen ?
                <div>
                  {obj.name}
                </div>
                :
                <input onChange={(e) => handleInputChange(e, obj.id)} className="bg-violet-700 w-fit" autoFocus size={obj.name.length} type="text" value={obj.name} />
              }
            </div>)
          ?? ""
        }
      </div>
    </div>
  );
}
