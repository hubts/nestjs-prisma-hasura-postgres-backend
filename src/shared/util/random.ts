import { randomBytes } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { TimeUtil } from "./time";

export class RandomUtil {
    static uuid(): string {
        return uuidv4();
    }

    static hex(length = 16): string {
        return randomBytes(length).toString("hex");
    }

    static range(min: number, max: number): number {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    static digits(length = 4): string {
        const unit = Math.pow(10, length);
        return (Math.floor(Math.random() * unit) + unit).toString().substring(1);
    }

    static alphabets(length = 10): string {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += alphabet.charAt(this.range(0, alphabet.length - 1));
        }
        return result;
    }

    static pick<T>(array: T[]): T {
        const index = this.range(0, array.length - 1);
        return array[index];
    }

    static shuffle<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    static email(length = 10): string {
        const domainPool = ["gmail.com", "naver.com", "daum.net"];
        const alphabeticLength = this.range(4, 6);
        const digitsLength = length - alphabeticLength;
        return this.alphabets(alphabeticLength) + this.digits(digitsLength) + "@" + this.pick(domainPool);
    }

    static url(length = 10, extension?: string): string {
        const ext = extension ? `.${extension}` : "";
        return "https://" + this.alphabets(length) + ".com/" + this.alphabets(length) + ext;
    }

    static nickname(): string {
        return this.pick(NICKNAME_POOL);
    }

    static dateBetween(standardDate = new Date(), diffDays = 0): Date {
        const difference = diffDays < 0 ? Math.ceil(diffDays) : Math.floor(diffDays);
        const diffDaysInMs = difference * TimeUtil.ONE_DAY_IN_MS;
        const randomTimeInMs = diffDays < 0 ? this.range(diffDaysInMs, 0) : this.range(0, diffDaysInMs);
        return new Date(standardDate.getTime() + randomTimeInMs);
    }
}

const NICKNAME_POOL = [
    "Marwah Hutchinson",
    "Carlton Osborne",
    "Delia Santos",
    "Melody Burgess",
    "Wallace Moon",
    "Archie Gallegos",
    "Letitia Washington",
    "Yvette Bean",
    "Kellie Turnbull",
    "Haseeb Guest",
    "Rees Hays",
    "Dante Parkinson",
    "Sapphire Cochran",
    "Alex Zimmerman",
    "Karina Briggs",
    "Braxton Shannon",
    "Milosz Mcleod",
    "Ruben Maguire",
    "Neo Irvine",
    "Shyla Ferry",
    "Esha Wormald",
    "Eilish Sullivan",
    "James Reynolds",
    "Lana Pena",
    "Javier Laing",
    "Lacey-Mae Conroy",
    "Sheridan Stanley",
    "Levi Mclellan",
    "Alysia Collins",
    "Zahid William",
    "Zhane Haney",
    "Hafsa Mclaughlin",
    "Beulah Diaz",
    "Kelise Amin",
    "Celine Fraser",
    "Milly Gonzales",
    "Matas Kumar",
    "Tilly Kennedy",
    "Mikaeel Hilton",
    "Mylee Compton",
    "Malachy Kearney",
    "Cali Nicholls",
    "Jesus Bates",
    "Anisah Coleman",
    "Vladimir Dejesus",
    "Christy Juarez",
    "Romy Wolfe",
    "Pixie Clegg",
    "Sofija Nava",
    "Marshall Pearce",
    "Avaya Head",
    "Libbie Mendez",
    "Lexi Rowe",
    "Joe Sherman",
    "Shuaib Morse",
    "Alexandria Cooper",
    "Deacon Weir",
    "Ahyan Cortes",
    "Caelan Sharp",
    "Danish Gardner",
    "Shayna Oliver",
    "Saara Wooten",
    "Ivan Mckay",
    "Giacomo Wyatt",
    "Brogan Christian",
    "Tessa Ruiz",
    "Melinda Whitney",
    "Rory Irwin",
    "Irene Mcguire",
    "Rhian Griffin",
    "Khadeejah Glass",
    "Mamie Redmond",
    "Rudy Regan",
    "Carwyn Carver",
    "Chante Baxter",
    "Kyron Huber",
    "Malia Hood",
    "Laurel Redfern",
    "Tomi Wilcox",
    "Fannie Miranda",
    "Emaan Rogers",
    "Havin Mcnamara",
    "Alister Mckee",
    "Anabia Pugh",
    "Saif Chester",
    "Anisha Cairns",
    "Betty Parra",
    "Freddie Houston",
    "Aanya Mccallum",
    "Riley Sharples",
    "Albert Cotton",
    "Kashif Eaton",
    "Kiaan Estes",
    "Erin Foley",
    "Krystian Sheridan",
    "Aqeel Pike",
    "Winnie Zavala",
    "Princess Hussain",
    "Hester Mercer",
    "Destiny Marin",
];
