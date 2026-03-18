import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { prisma } from '../db';

export const createContext = (_opts: CreateExpressContextOptions) => ({
  prisma,
});

export type Context = ReturnType<typeof createContext>;
