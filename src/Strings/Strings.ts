import { Numbers } from "../Numbers/Numbers";

export class Strings
{
  private static readonly URL_SAFE_CHARS: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._';
  
  public static initialCaps(string: string): string
  {
    const words = string.split(' ');
    
    return words.reduce((result, word, index) => {
      result += word.charAt(0).toUpperCase() + word.slice(1);
      if (index < words.length - 1) result += ' ';
      return result;
    }, '');
  }
  
  public static random(length: number = 10, blacklistedStrings?: Array<string>): string
  {
    let string: string;
    let attempts = 0;
    
    while (!string || (blacklistedStrings && blacklistedStrings.length && blacklistedStrings.includes(string)))
    {
      string = this.generateRandomString(length, this.URL_SAFE_CHARS);
      attempts++;
      
      if (attempts >= 100)
      {
        throw new Error(`Could not generate a random string that isn't blacklisted after ${attempts} attempts`);
      }
    }
    
    return string;
  }
  
  private static generateRandomString(length: number, availableChars: string): string
  {
    let str = '';
    
    for (let i = 0; i < length; i++)
    {
      str += availableChars.charAt(Numbers.random(0, availableChars.length - 1));
    }
    
    return str;
  }
}
