import { z } from 'zod';

const cookieConfigSchema = z.object({
  domain: z.string(),
  httpOnly: z.coerce.boolean(),
  maxAge: z.number(),
  path: z.string(),
  sameSite: z.enum(['lax', 'strict', 'none']),
  secure: z.coerce.boolean(),
});

export type CookieConfig = z.infer<typeof cookieConfigSchema>;

const maybeCookieConfig: Partial<CookieConfig> = {
  domain: process.env.COOKIE_DOMAIN,
  path: process.env.COOKIE_PATH,
  maxAge: process.env.COOKIE_MAX_AGE as unknown as number,
  sameSite: process.env.COOKIE_SAME_SITE as unknown as CookieConfig['sameSite'],
  httpOnly: process.env.COOKIE_HTTP_ONLY as unknown as boolean,
  secure: process.env.COOKIE_SECURE as unknown as boolean,
};

export const cookieConfig = cookieConfigSchema.parse(maybeCookieConfig);
