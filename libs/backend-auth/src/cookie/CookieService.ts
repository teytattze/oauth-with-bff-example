import { LoginSession } from '../auth/LoginSession';
import { Token } from '../auth/Token';

export interface CookieService {
  getLoginSessionCookie: (loginSession: LoginSession) => string[];
  getLogoutCookie: () => string[];
  getTokenCookie: (token: Token) => string[];
}
