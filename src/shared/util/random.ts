import { TimeExtension } from "./time-extension";
import { randomBytes } from "crypto";
import { v4 as uuidv4 } from "uuid";

export class Random {
    /**
     * Get random UUID v4.
     * @returns Random UUID v4.
     */
    static uuid(): string {
        return uuidv4();
    }

    /**
     * Get random email.
     * @returns Random email formatted as '(6 chars + 4 digits)@email.com'.
     */
    static email(): string {
        return this.lowercase(6) + this.digits(4) + "@email.com";
    }

    /**
     * Get random hex string in length.
     * @param length - Length of random hex (default = 10).
     * @returns Random hex in length.
     */
    static hex(length = 10): string {
        return randomBytes(length).toString("hex");
    }

    /**
     * Get random number in range.
     * @param min - Minimum number in-between.
     * @param max - Maximum number in-between.
     * @returns Random number in range.
     */
    static number(min: number, max: number): number {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    /**
     * Get random alphabetic string in lowercase as length.
     * @param length - Length of random lowercase string (default = 10).
     * @returns Random alphabetic string in lowercase as length
     */
    static lowercase(length = 10): string {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += alphabet.charAt(this.number(0, alphabet.length - 1));
        }
        return result;
    }

    /**
     * Get random alphabetic string in uppercase as length.
     * @param length - Length of random uppercase string (default = 10).
     * @returns Random alphabetic string in uppercase as length
     */
    static uppercase(length = 10): string {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += alphabet.charAt(this.number(0, alphabet.length - 1));
        }
        return result;
    }

    /**
     * Get random enum from the enum declared.
     * @param anyEnum - Enum.
     * @returns Random enum.
     */
    static enum<T>(anyEnum: { [s: string | number]: T }): T {
        const values = Object.values(anyEnum);
        const randomIndex = this.number(0, values.length - 1);
        const randomEnum = values[randomIndex];
        return randomEnum;
    }

    /**
     * Get random URL.
     * @param length - Length of random string in URL for domain and file-route (default = 10).
     * @param extension - File extension in file-route (default = no file extension).
     * @returns Random URL formatted as 'https://(random string).com/(random string).(extension)'
     */
    static url(length = 10, extension?: string): string {
        const ext = extension ? `.${extension}` : "";
        return (
            "https://" +
            this.lowercase(length) +
            ".com/" +
            this.lowercase(length) +
            ext
        );
    }

    /**
     * Get random nickname from nickname pool.
     * @returns Random no-space nickname.
     */
    static nickname(): string {
        return NICKNAME_POOL[
            Math.floor(Math.random() * NICKNAME_POOL.length)
        ].toLowerCase();
    }

    /**
     * Get random digits in length.
     * @param length - Length of digits (default = 4).
     * @returns Random digits[0-9] in length.
     */
    static digits(length = 4): string {
        const unit = Math.pow(10, length);
        return (Math.floor(Math.random() * unit) + unit)
            .toString()
            .substring(1);
    }

    /**
     * Get random rate in range (0 ~ 1).
     * @param precision - Set a precision to fix.
     * @returns Random rate in range (0 ~ 1) with the fixed precision.
     */
    static rate(precision = 2): string {
        const random = this.number(0, 100);
        return (random / 100).toFixed(precision);
    }

    /**
     * Get random date before the days.
     * @param date - A particular date as standard.
     * @param diffDays - The number of days (N) away from the date.
     * @returns Random 'past' date between the particular date and the date before the N days.
     */
    static dateBefore(date: Date, diffDays: number): Date {
        const diffDaysInMs = diffDays * TimeExtension.ONE_DAY_IN_MS;
        return new Date(date.getTime() - this.number(0, diffDaysInMs));
    }

    /**
     * Get random date after the days.
     * @param date - A particular date as standard.
     * @param diffDays - The number of days (N) away from the date.
     * @returns Random 'future' date between the particular date and the date after the N days.
     */
    static dateAfter(date: Date, diffDays: number): Date {
        const diffDaysInMs = diffDays * TimeExtension.ONE_DAY_IN_MS;
        return new Date(date.getTime() + this.number(0, diffDaysInMs));
    }

    /**
     * Get random date between periods away from a particular date as the days.
     * @param date - A particular date as standard.
     * @param diffDays - The number of days (N) away from the date (Negative numbers mean the past).
     * @returns Random (past or future) date between the particular date and the date before/after the N days.
     */
    static dateBetween(date = new Date(), diffDays = 0): Date {
        const difference =
            diffDays < 0 ? Math.ceil(diffDays) : Math.floor(diffDays);
        const diffDaysInMs = difference * TimeExtension.ONE_DAY_IN_MS;
        const randomTimeUtilInMs =
            diffDays < 0
                ? this.number(diffDaysInMs, 0)
                : this.number(0, diffDaysInMs);
        return new Date(date.getTime() + randomTimeUtilInMs);
    }

    /**
     * Get random image URL from 'picsum' website.
     * @param width - Image width in pixel (default = 300).
     * @param height - Image height in pixel (default = 300).
     * @returns Random 'picsum' image URL.
     */
    static imageUrl(width = 300, height = 300): string {
        return `https://picsum.photos/${width}/${height}`;
    }

    /**
     * Get random EOS account name with random string.
     * @param length - Length of account name (default = 8).
     * @param creator - Creator 'p' or 'c' account name (Optional)
     * @returns Random EOS account name in maximum 12 length (with '.p' or '.c' if creator is).
     */
    static eosAccount(length = 8, creator?: "p" | "c"): string {
        const eosCharPool = "abcdefghijklmnopqrstuvwxyz12345";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += eosCharPool.charAt(
                this.number(0, eosCharPool.length - 1)
            );

            if (creator && result.length === 10) {
                break;
            }
        }
        if (result.length > 12) {
            result = result.substring(0, 12);
        }
        if (creator) {
            result += `.${creator}`;
        }
        return result;
    }

    /**
     * Get shuffled array.
     * @param array - An array to shuffle.
     * @returns Shuffled array.
     */
    static shuffle<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Get random birth in (YYYY-MM-DD) format.
     * @returns Random birth.
     */
    static birth(): string {
        const minPastTime = new Date("1970-01-01").getTime();
        const currentTime = new Date().getTime();
        const randomDate = new Date(this.number(minPastTime, currentTime));

        const year = randomDate.getFullYear();
        const month = (randomDate.getMonth() + 1).toString();
        const monthString = month.length < 2 ? `0${month}` : month;
        const day = randomDate.getDate().toString();
        const dayString = day.length < 2 ? `0${day}` : day;

        return `${year}-${monthString}-${dayString}`;
    }
}

const NICKNAME_POOL = [
    "Marwah",
    "Hutchinson",
    "Carlton",
    "Osborne",
    "Delia",
    "Santos",
    "Melody",
    "Burgess",
    "Wallace",
    "Moon",
    "Archie",
    "Gallegos",
    "Letitia",
    "Washington",
    "Yvette",
    "Bean",
    "Kellie",
    "Turnbull",
    "Haseeb",
    "Guest",
    "Rees",
    "Hays",
    "Dante",
    "Parkinson",
    "Sapphire",
    "Cochran",
    "Alex",
    "Zimmerman",
    "Karina",
    "Briggs",
    "Braxton",
    "Shannon",
    "Milosz",
    "Mcleod",
    "Ruben",
    "Maguire",
    "Irvine",
    "Shyla",
    "Ferry",
    "Esha",
    "Wormald",
    "Eilish",
    "Sullivan",
    "James",
    "Reynolds",
    "Lana",
    "Pena",
    "Javier",
    "Laing",
    "Lacey",
    "Mae Conroy",
    "Sheridan",
    "Stanley",
    "Levi",
    "Mclellan",
    "Alysia",
    "Collins",
    "Zahid",
    "William",
    "Zhane",
    "Haney",
    "Hafsa",
    "Mclaughlin",
    "Beulah",
    "Diaz",
    "Kelise",
    "Amin",
    "Celine",
    "Fraser",
    "Milly",
    "Gonzales",
    "Matas",
    "Kumar",
    "Tilly",
    "Kennedy",
    "Mikaeel",
    "Hilton",
    "Mylee",
    "Compton",
    "Malachy",
    "Kearney",
    "Cali",
    "Nicholls",
    "Jesus",
    "Bates",
    "Anisah",
    "Coleman",
    "Vladimir",
    "Dejesus",
    "Christy",
    "Juarez",
    "Romy",
    "Wolfe",
    "Pixie",
    "Clegg",
    "Sofija",
    "Nava",
    "Marshall",
    "Pearce",
    "Avaya",
    "Head",
    "Libbie",
    "Mendez",
    "Lexi",
    "Rowe",
    "Sherman",
    "Shuaib",
    "Morse",
    "Alexandria",
    "Cooper",
    "Deacon",
    "Weir",
    "Ahyan",
    "Cortes",
    "Caelan",
    "Sharp",
    "Danish",
    "Gardner",
    "Shayna",
    "Oliver",
    "Saara",
    "Wooten",
    "Ivan",
    "Mckay",
    "Giacomo",
    "Wyatt",
    "Brogan",
    "Christian",
    "Tessa",
    "Ruiz",
    "Melinda",
    "Whitney",
    "Rory",
    "Irwin",
    "Irene",
    "Mcguire",
    "Rhian",
    "Griffin",
    "Khadeejah",
    "Glass",
    "Mamie",
    "Redmond",
    "Rudy",
    "Regan",
    "Carwyn",
    "Carver",
    "Chante",
    "Baxter",
    "Kyron",
    "Huber",
    "Malia",
    "Hood",
    "Laurel",
    "Redfern",
    "Tomi",
    "Wilcox",
    "Fannie",
    "Miranda",
    "Emaan",
    "Rogers",
    "Havin",
    "Mcnamara",
    "Alister",
    "Mckee",
    "Anabia",
    "Pugh",
    "Saif",
    "Chester",
    "Anisha",
    "Cairns",
    "Betty",
    "Parra",
    "Freddie",
    "Houston",
    "Aanya",
    "Mccallum",
    "Riley",
    "Sharples",
    "Albert",
    "Cotton",
    "Kashif",
    "Eaton",
    "Kiaan",
    "Estes",
    "Erin",
    "Foley",
    "Krystian",
    "Sheridan",
    "Aqeel",
    "Pike",
    "Winnie",
    "Zavala",
    "Princess",
    "Hussain",
    "Hester",
    "Mercer",
    "Destiny",
    "Marin",
];
