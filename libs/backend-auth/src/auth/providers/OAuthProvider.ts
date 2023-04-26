import { GetOicdLogoutUrlPayload } from './GetOicdLogoutUrlPayload';
import { GetTokenPayload } from './GetTokenPayload';
import { OAuthCodeFlowWithPkceAuthorizationData } from './OAuthCodeFlowWithPkceAuthorizationData';
import { OAuthToken } from './OAuthToken';

export interface OAuthProvider {
  getAuthorizationData(): OAuthCodeFlowWithPkceAuthorizationData;
  getOicdLogoutUrl(payload: GetOicdLogoutUrlPayload): string;
  getToken(payload: GetTokenPayload): Promise<OAuthToken>;
}
