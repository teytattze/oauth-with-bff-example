export interface CryptoService {
  encrypt: (plaintext: string) => string;
  decrypt: (ciphertext: string) => string;
}
