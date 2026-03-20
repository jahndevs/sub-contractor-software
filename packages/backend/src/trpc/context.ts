import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { verifyToken } from '@clerk/backend';
import { prisma } from '../db';

export const createContext = async ({ req }: CreateExpressContextOptions) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  let userId: string | null = null;

  if (token) {
    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });
      userId = payload.sub;
    } catch {
      // invalid or expired token here,
    }
  }

  return { prisma, userId };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
