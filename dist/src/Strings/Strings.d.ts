export declare class Strings {
    private static readonly URL_SAFE_CHARS;
    static initialCaps(string: string): string;
    static random(length?: number, blacklistedStrings?: Array<string>): string;
    private static generateRandomString;
}
