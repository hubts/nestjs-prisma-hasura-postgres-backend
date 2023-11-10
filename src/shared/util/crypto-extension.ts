import { compareSync, genSaltSync, hashSync } from "bcrypt";
import {
    Cipher,
    Decipher,
    createCipheriv,
    createDecipheriv,
    createHash,
} from "crypto";

/**
 * Crypto extension from 'crypto' library.
 *
 * If you do not want to use 'bcrypt', delete the methods associated with the library.
 */
export class CryptoExtension {
    /**
     * Get SHA-256 hash.
     * @param {string | Buffer} data - Input ingredient to hash.
     * @returns {string} Hashed result in SHA-256 (32 bytes).
     */
    static sha256(data: string | Buffer): string {
        return createHash("sha256").update(data).digest("hex");
    }

    /**
     * Encrypt by AES-256-CBC algorithm (Symmetric).
     * @param plainText - Plain text to encrypt.
     * @param iv - Initial vector.
     * @param key - Symmetric key.
     * @returns {string} Cipher text (encrypted).
     */
    static encryptAes256Cbc(
        plainText: string,
        iv: string,
        key: string
    ): string {
        const initialVector = Buffer.from(iv, "hex");
        const cryptoKey = Buffer.from(key, "hex");

        const cipher: Cipher = createCipheriv(
            "aes-256-cbc",
            cryptoKey,
            initialVector
        );
        let encryptedText = cipher.update(plainText, "utf-8", "base64");
        encryptedText += cipher.final("base64");

        return encryptedText;
    }

    /**
     * Decrypt by AES-256-CBC algorithm (Symmetric).
     * @param cipherText - Cipher text to decrypt.
     * @param iv - Initial vector.
     * @param key - Symmetric key.
     * @returns {string} Plain text (decrypted).
     */
    static decryptAes256Cbc(
        cipherText: string,
        iv: string,
        key: string
    ): string {
        const initialVector = Buffer.from(iv, "hex");
        const cryptoKey = Buffer.from(key, "hex");

        const decipher: Decipher = createDecipheriv(
            "aes-256-cbc",
            cryptoKey,
            initialVector
        );
        let decryptedValue = decipher.update(cipherText, "base64", "utf-8");
        decryptedValue += decipher.final("utf-8");

        return decryptedValue;
    }

    /**
     * Bcrypt: Hash the password.
     * @param {string} password - The password to be hashed.
     * @returns {string} Hashed result.
     */
    static hashPassword(password: string): string {
        const saltOrRounds = genSaltSync();
        return hashSync(password, saltOrRounds);
    }

    /**
     * Bcrypt: Compare the hash password and the original expected.
     * @param plainPassword - The original password before hashing.
     * @param hashPassword - The hash password (may be expected as result).
     * @returns {boolean} Whether the hash of the password matches or not.
     */
    static comparePassword(
        plainPassword: string,
        hashPassword: string
    ): boolean {
        return compareSync(plainPassword, hashPassword);
    }
}
