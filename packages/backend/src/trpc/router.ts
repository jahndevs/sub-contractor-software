import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';
import type { Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  greeting: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => ({
      message: `Hello ${input.name ?? 'world'}!`,
    })),
});

export type AppRouter = typeof appRouter;
