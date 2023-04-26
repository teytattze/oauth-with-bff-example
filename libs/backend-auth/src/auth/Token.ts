export class Token {
  constructor(
    readonly accessToken: string,
    readonly refreshToken: string,
    readonly idToken: string,
    readonly csrfToken: string,
  ) {}
}
