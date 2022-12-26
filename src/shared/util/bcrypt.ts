import { genSaltSync, hashSync, compareSync } from "bcrypt";

export class Bcrypt {
    static hash(password: string): string {
        const saltOrRounds = genSaltSync();
        return hashSync(password, saltOrRounds);
    }

    static compare(password: string, hashPassword: string): boolean {
        return compareSync(password, hashPassword);
    }
}
