export class GetTokenPayload {
  constructor(
    readonly callbackCode: string,
    readonly callbackState: string,
    readonly originalCodeVerifier: string,
    readonly originalState: string,
  ) {}
}
