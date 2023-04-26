import { z } from 'zod';

const hashConfigSchema = z.object({
  algorithm: z.enum(['sha256']),
});
export type HashConfig = z.infer<typeof hashConfigSchema>;

const maybeHashConfig: Partial<HashConfig> = {
  algorithm: process.env.HASH_ALGORITHM as unknown as HashConfig['algorithm'],
};

export const hashConfig = hashConfigSchema.parse(maybeHashConfig);
