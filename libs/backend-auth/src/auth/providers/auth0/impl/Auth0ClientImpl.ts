import { AxiosRequestConfig } from 'axios';

import { HttpService } from '../../../../common/http/HttpService';
import { OAuthConfig } from '../../../../config/oauth.config';
import { Auth0Client } from '../Auth0Client';
import { TokenResponse } from '../dtos/TokenResponse';

export class Auth0ClientImpl implements Auth0Client {
  constructor(
    private readonly config: OAuthConfig,
    private readonly httpService: HttpService,
  ) {}

  async getToken(code: string, codeVerifier: string): Promise<TokenResponse> {
    const requestURL = `${this.config.authorizationServerBaseUrl}/oauth/token`;

    const body = new URLSearchParams({
      grant_type: this.config.grantType,
      client_id: this.config.clientId,
      code: code,
      code_verifier: codeVerifier,
      redirect_uri: this.config.redirectUri,
    }).toString();

    const requestConfig: AxiosRequestConfig = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };

    const { data } = await this.httpService.post<TokenResponse>(
      requestURL,
      body,
      requestConfig,
    );
    return data;
  }
}
