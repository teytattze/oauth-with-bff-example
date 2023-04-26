import { z } from 'zod';

const cookieCryptoConfigSchema = z.object({
  algorithm: z.enum(['aes-128-gcm', 'aes-192-gcm', 'aes-256-gcm']),
  key: z.string(),
  ivBytes: z.coerce.number(),
  authTagBytes: z.coerce.number(),
});

export type CookieCryptoConfig = z.infer<typeof cookieCryptoConfigSchema>;

const maybeCookieCryptoConfig: Partial<CookieCryptoConfig> = {
  algorithm: process.env
    .COOKIE_CRYPTO_ALGORITHM as unknown as CookieCryptoConfig['algorithm'],
  key: process.env.COOKIE_CRYPTO_KEY,
  ivBytes: process.env.COOKIE_CRYPTO_IV_BYTES as unknown as number,
  authTagBytes: process.env.COOKIE_CRYPTO_AUTH_TAG_BYTES as unknown as number,
};

export const cookieCryptoConfig = cookieCryptoConfigSchema.parse(
  maybeCookieCryptoConfig,
);
