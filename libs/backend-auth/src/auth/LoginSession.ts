export class LoginSession {
  constructor(readonly codeVerifier: string, readonly state: string) {}
}
