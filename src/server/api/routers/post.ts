import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type PostType = {
  id: number;
  name: string;
  isOpen: boolean;
};

let posts: PostType[] = [];

function generateUniqueId() {
  const timestamp = new Date().getTime();
  const randomPart = Math.random() * 10000;
  return timestamp + randomPart;
}

export const postRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(() => {
      return posts;
    }),

  create: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input }) => {
      const id = generateUniqueId();
      const post: PostType = { id: id, name: input.text, isOpen: false };
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
    }),

  editPost: publicProcedure
  .input(z.object({ text: z.string(), id: z.number() }))
  .mutation(({ input }) => {
    const post = posts.find(post => post.id === input.id);
    if (!post) return posts;
    post.name = input.text;
    return posts;
  })
});
