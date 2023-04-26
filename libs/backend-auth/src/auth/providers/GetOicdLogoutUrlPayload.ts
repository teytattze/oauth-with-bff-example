export class GetOicdLogoutUrlPayload {
  constructor(readonly idToken: string, readonly returnTo: string) {}
}
