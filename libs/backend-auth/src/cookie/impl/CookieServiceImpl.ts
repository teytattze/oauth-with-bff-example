import { LoginSession } from '../../auth/LoginSession';
import { Token } from '../../auth/Token';
import { CookieConfig } from '../../config/cookie.config';
import { CryptoService } from '../../crypto/CryptoService';
import { CookieName } from '../CookieName';
import { CookieSerializer } from '../CookieSerializer';
import { CookieService } from '../CookieService';

export class CookieServiceImpl implements CookieService {
  constructor(
    private readonly config: CookieConfig,
    private readonly cookieSerializer: CookieSerializer,
    private readonly cryptoService: CryptoService,
  ) {}

  getLoginSessionCookie(loginSession: LoginSession) {
    const encryptedLoginSession = this.cryptoService.encrypt(
      JSON.stringify(loginSession),
    );
    const loginSessionCookie = this.cookieSerializer.serialize(
      CookieName.LOGIN_SESSION,
      encryptedLoginSession,
      this.config,
    );
    return [loginSessionCookie];
  }

  getLogoutCookie() {
    const clearedLoginCookie = this.emptyLoginSessionCookie();
    const clearedAccessTokenCookie = this.emptyAccessTokenCookie();
    const clearedRefreshTokenCookie = this.emptyRefreshTokenCookie();
    const clearedCSRFTokenCookie = this.emptyCsrfTokenCookie();
    const clearedIDTokenCookie = this.emptyIdTokenCookie();
    return [
      clearedLoginCookie,
      clearedAccessTokenCookie,
      clearedRefreshTokenCookie,
      clearedCSRFTokenCookie,
      clearedIDTokenCookie,
    ];
  }

  getTokenCookie(token: Token) {
    const accessTokenCookie = this.getAccessTokenCookie(token.accessToken);
    const refreshTokenCookie = this.getRefreshTokenCookie(token.refreshToken);
    const csrfTokenCookie = this.getCsrfTokenCookie(token.csrfToken);
    const idTokenCookie = this.getIdTokenCookie(token.idToken);
    return [
      accessTokenCookie,
      refreshTokenCookie,
      csrfTokenCookie,
      idTokenCookie,
    ];
  }

  private emptyLoginSessionCookie() {
    return this.cookieSerializer.serialize(CookieName.LOGIN_SESSION, '', {
      ...this.config,
      maxAge: 0,
    });
  }

  private emptyAccessTokenCookie() {
    return this.cookieSerializer.serialize(CookieName.ACCESS_TOKEN, '', {
      ...this.config,
      maxAge: 0,
    });
  }

  private emptyRefreshTokenCookie() {
    return this.cookieSerializer.serialize(CookieName.REFRESH_TOKEN, '', {
      ...this.config,
      maxAge: 0,
    });
  }

  private emptyIdTokenCookie() {
    return this.cookieSerializer.serialize(CookieName.ID_TOKEN, '', {
      ...this.config,
      maxAge: 0,
    });
  }

  private emptyCsrfTokenCookie() {
    return this.cookieSerializer.serialize(CookieName.CSRF_TOKEN, '', {
      ...this.config,
      maxAge: 0,
    });
  }

  private getAccessTokenCookie(token: string) {
    const encryptedAccessToken = this.cryptoService.encrypt(token);
    return this.cookieSerializer.serialize(
      CookieName.ACCESS_TOKEN,
      encryptedAccessToken,
      this.config,
    );
  }

  private getRefreshTokenCookie(token: string) {
    const encryptedRefreshToken = this.cryptoService.encrypt(token);
    return this.cookieSerializer.serialize(
      CookieName.REFRESH_TOKEN,
      encryptedRefreshToken,
      this.config,
    );
  }

  private getIdTokenCookie(token: string) {
    const encryptedIdToken = this.cryptoService.encrypt(token);
    return this.cookieSerializer.serialize(
      CookieName.ID_TOKEN,
      encryptedIdToken,
      this.config,
    );
  }

  private getCsrfTokenCookie(token: string) {
    const encryptedCsrfToken = this.cryptoService.encrypt(token);
    return this.cookieSerializer.serialize(
      CookieName.CSRF_TOKEN,
      encryptedCsrfToken,
      this.config,
    );
  }
}
