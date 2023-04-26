export class OAuthToken {
  constructor(
    readonly accessToken: string,
    readonly refreshToken: string,
    readonly idToken: string,
    readonly tokenType: string,
    readonly expiredAt: Date,
  ) {}
}
