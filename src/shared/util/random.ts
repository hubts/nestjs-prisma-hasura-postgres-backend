import { randomBytes } from "crypto";
import { v4 as uuidv4 } from "uuid";

export class Random {
    static uuid(): string {
        return uuidv4();
    }

    static hex(length = 10): string {
        return randomBytes(length).toString("hex");
    }

    static number(min = 0, max: number): number {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    static string(length = 10): string {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += alphabet.charAt(this.number(0, alphabet.length - 1));
        }
        return result;
    }

    static email(length = 10): string {
        return this.string(length) + "@email.com";
    }

    static url(length = 10, extension?: string): string {
        const ext = extension ? `.${extension}` : "";
        return "https://" + this.string(length) + ".com/" + this.string(length) + ext;
    }

    static nickname(): string {
        return NICKNAME_POOL[Math.floor(Math.random() * NICKNAME_POOL.length)];
    }

    static digits(length = 4): string {
        const unit = Math.pow(10, length);
        return (Math.floor(Math.random() * unit) + unit).toString().substring(1);
    }

    static date(daysBetween = 0, before = false): Date {
        const daysBetweenInMs = Math.floor(daysBetween) * 86400 * 1000;
        const randomTimeInMs = before ? -this.number(0, daysBetweenInMs) : this.number(0, daysBetweenInMs);
        return new Date(new Date().getTime() + randomTimeInMs);
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
