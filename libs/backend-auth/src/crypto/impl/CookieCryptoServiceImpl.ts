import * as crypto from 'node:crypto';

import { CookieCryptoConfig } from '../../config/coorkie-crypto.config';
import { CryptoService } from '../CryptoService';

export class CookieCryptoServiceImpl implements CryptoService {
  constructor(private readonly config: CookieCryptoConfig) {}

  encrypt(plaintext: string): string {
    const iv = crypto.randomBytes(this.config.ivBytes);
    const key = Buffer.from(this.config.key, 'hex');

    const cipher = crypto.createCipheriv(this.config.algorithm, key, iv);
    const encryptedText = Buffer.concat([
      cipher.update(plaintext),
      cipher.final(),
    ]);
    const result = Buffer.concat([iv, encryptedText, cipher.getAuthTag()]);

    return result.toString('base64url');
  }

  decrypt(ciphertext: string): string {
    this.validateEncryptedCookie(ciphertext);
    return this.decryptWithoutValidation(ciphertext);
  }

  private validateEncryptedCookie(encryptedValue: string) {
    const encrypted = Buffer.from(encryptedValue, 'base64url');
    const minSize = this.config.ivBytes + 1 + this.config.authTagBytes;
    if (encrypted.length < minSize) throw new Error('Invalid cookie');
  }

  private decryptWithoutValidation(encryptedValue: string) {
    const { authTag, encrypted, iv } =
      this.decomposeEncryptedValue(encryptedValue);

    const key = Buffer.from(this.config.key, 'hex');
    const decipher = crypto.createDecipheriv(this.config.algorithm, key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = decipher.update(encrypted);
    const final = decipher.final();

    const result = Buffer.concat([decrypted, final]);
    return result.toString();
  }

  private decomposeEncryptedValue(encryptedValue: string) {
    const encoded = Buffer.from(encryptedValue, 'base64url');

    const iv = encoded.subarray(0, this.config.ivBytes);
    const encrypted = encoded.subarray(
      this.config.ivBytes,
      encoded.length - this.config.authTagBytes,
    );
    const authTag = encoded.subarray(
      encoded.length - this.config.authTagBytes,
      encoded.length,
    );

    return { iv, encrypted, authTag };
  }
}
