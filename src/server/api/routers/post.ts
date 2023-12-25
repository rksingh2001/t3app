import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

let post = {
  id: 1,
  name: "Hello World",
};

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Server ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      // simulate a slow db call

      post = { id: post.id + 1, name: input.text };
      return post;
    }),

  getLatest: publicProcedure.query(() => {
    return post;
  }),
});
