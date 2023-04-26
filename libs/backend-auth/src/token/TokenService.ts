export interface TokenService {
  validateIdToken(idToken: string): Promise<void>;
}
