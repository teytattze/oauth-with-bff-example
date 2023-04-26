import { TokenResponse } from './dtos/TokenResponse';

export interface Auth0Client {
  getToken(code: string, codeVerifier: string): Promise<TokenResponse>;
}
