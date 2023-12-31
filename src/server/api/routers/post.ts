import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type PostType = {
  id: number;
  name: string;
  isOpen: boolean;
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
      const post: PostType = { id: posts.length, name: input.text, isOpen: false };
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
    }),
  
  openPost: publicProcedure
    .input(z.number())
    .mutation(({ input }) => {
      const post = posts.find(post => post.id === input);
      const otherPosts = posts.filter(post => post.id !== input);
      if (!post) return posts;
      post.isOpen = true;
      otherPosts.forEach(post => post.isOpen = false);
      return posts;
    })
});
