import { compareSync, genSaltSync, hashSync } from "bcrypt";
import {
    Cipher,
    Decipher,
    createCipheriv,
    createDecipheriv,
    createHash,
} from "crypto";

export class CryptoExtension {
    static sha256(data: string | Buffer): string {
        return createHash("sha256").update(data).digest("hex");
    }

    static hashPassword(password: string): string {
        const saltOrRounds = genSaltSync();
        return hashSync(password, saltOrRounds);
    }

    static comparePassword(
        plainPassword: string,
        hashPassword: string
    ): boolean {
        return compareSync(plainPassword, hashPassword);
    }

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
}
