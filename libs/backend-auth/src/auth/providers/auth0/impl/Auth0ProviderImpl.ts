import { HashService } from '../../../../common/hash/HashService';
import { RandomService } from '../../../../common/random/RandomService';
import { OAuthConfig } from '../../../../config/oauth.config';
import { GetOicdLogoutUrlPayload } from '../../GetOicdLogoutUrlPayload';
import { GetTokenPayload } from '../../GetTokenPayload';
import { OAuthCodeFlowWithPkceAuthorizationData } from '../../OAuthCodeFlowWithPkceAuthorizationData';
import { OAuthToken } from '../../OAuthToken';
import { Auth0Client } from '../Auth0Client';
import { Auth0Provider } from '../Auth0Provider';

export class Auth0ProviderImpl implements Auth0Provider {
  private readonly defaultRandomStringBytes = 64;

  constructor(
    private readonly config: OAuthConfig,
    private readonly auth0Client: Auth0Client,
    private readonly hashService: HashService,
    private readonly randomService: RandomService,
  ) {}

  getAuthorizationData() {
    const state = this.randomService.generateRandomString(
      this.defaultRandomStringBytes,
    );
    const codeVerifier = this.randomService.generateRandomString(
      this.defaultRandomStringBytes,
    );
    const codeChallenge = this.hashService.hash(codeVerifier);

    const url = new URL(`${this.config.authorizationServerBaseUrl}/authorize`);
    url.searchParams.append('client_id', this.config.clientId);
    url.searchParams.append('response_type', this.config.responseType);
    url.searchParams.append('redirect_uri', this.config.redirectUri);
    url.searchParams.append('state', state);
    url.searchParams.append('code_challenge', codeChallenge);
    url.searchParams.append(
      'code_challenge_method',
      this.config.codeChallengeMethod,
    );
    url.searchParams.append('scope', this.config.scope);

    return new OAuthCodeFlowWithPkceAuthorizationData(
      url.toString(),
      codeVerifier,
      state,
    );
  }

  getOicdLogoutUrl(payload: GetOicdLogoutUrlPayload) {
    const { idToken, returnTo } = payload;

    const url = new URL(
      `${this.config.authorizationServerBaseUrl}/oidc/logout`,
    );
    url.searchParams.append('id_token_hint', idToken);
    url.searchParams.append('post_logout_redirect_uri', returnTo);

    return url.toString();
  }

  async getToken(payload: GetTokenPayload): Promise<OAuthToken> {
    const { callbackCode, callbackState, originalCodeVerifier, originalState } =
      payload;

    if (callbackState !== originalState) throw new Error("State doesn't match");

    const tokenResponse = await this.auth0Client.getToken(
      callbackCode,
      originalCodeVerifier,
    );

    return {
      accessToken: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token,
      idToken: tokenResponse.id_token,
      tokenType: tokenResponse.token_type,
      expiredAt: new Date(Date.now() + tokenResponse.expires_in),
    };
  }
}
