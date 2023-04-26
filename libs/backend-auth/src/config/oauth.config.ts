import { z } from 'zod';

const oauthConfigSchema = z.object({
  authorizationServerBaseUrl: z.string(),
  clientId: z.string(),
  clientSecret: z.string(),
  codeChallengeMethod: z.enum(['S256']),
  grantType: z.string(),
  redirectUri: z.string(),
  responseType: z.string(),
  scope: z.string(),
});
export type OAuthConfig = z.infer<typeof oauthConfigSchema>;

const maybeOAuthConfig: Partial<OAuthConfig> = {
  authorizationServerBaseUrl: process.env.AUTHORIZATION_SERVER_BASE_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  codeChallengeMethod: process.env
    .CODE_CHALLENGE_METHOD as unknown as OAuthConfig['codeChallengeMethod'],
  grantType: process.env.GRANT_TYPE,
  redirectUri: process.env.REDIRECT_URI,
  responseType: process.env.RESPONSE_TYPE,
  scope: process.env.SCOPE,
};

export const oauthConfig = oauthConfigSchema.parse(maybeOAuthConfig);
