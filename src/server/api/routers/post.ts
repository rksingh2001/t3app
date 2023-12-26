import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

let posts = [
  {
    id: 1,
    name: "Hello World",
  }
];

let post = {
  id: 1,
  name: "Example Todo",
};


export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input }) => {
      post = { id: post.id + 1, name: input.text };
      posts.push(post);
      return posts;
    }),
  
  clearAll: publicProcedure
    .mutation(() => {
      posts = [];
      return posts;
    })
});
