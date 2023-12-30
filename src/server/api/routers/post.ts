import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type PostType = {
  id: number;
  name: string;
};

let posts: PostType[] = [];

export const postRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(() => {
      return posts;
    }),

  create: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input }) => {
      const post: PostType = { id: posts.length, name: input.text };
      posts.push(post);
      return posts;
    }),

  delete: publicProcedure
    .input(z.number())
    .mutation(({ input }) => {
      posts = posts.filter(post => post.id !== input)
      return posts
    }),

  clearAll: publicProcedure
    .mutation(() => {
      posts = [];
      return posts;
    })
});
