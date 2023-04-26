export class OAuthCodeFlowWithPkceAuthorizationData {
  constructor(
    readonly authorizationUrl: string,
    readonly codeVerifier: string,
    readonly state: string,
  ) {}
}
