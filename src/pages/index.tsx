import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.create.useMutation();

  const handleChange = (e: any) => {
    e.preventDefault()

    hello.mutate({ text: e.target.value });
  }

  return (
    <div className="text-cyan-100 text-2xl flex justify-center items-center flex-col h-[100vh] gap-2">
      <div className="h-10">
        {hello.data?.name ?? ""}
      </div>
      <input onChange={handleChange} className="text-violet-500 text-xl" />
    </div>
  );
}
