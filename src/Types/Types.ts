
export class Types
{
  public static isString(value: any, optional: boolean = false): boolean
  {
    return typeof value === "string" || (optional && !this.isSet(value));
  }
  
  public static isBoolean(value: any, optional: boolean = false): boolean
  {
    return typeof value === "boolean" || (optional && !this.isSet(value));
  }

  public static isNumber(value: any, optional: boolean = false): boolean
  {
    return typeof value === "number" || (optional && !this.isSet(value));
  }

  public static isInteger(value: any, optional: boolean = false): boolean
  {
    return Number.isInteger(value) || (optional && !this.isSet(value));
  }

  public static isArray(value: any, optional: boolean = false): boolean
  {
    return Array.isArray(value) || (optional && !this.isSet(value));
  }

  public static isObject(value: any, optional: boolean = false): boolean
  {
    return (value !== null && typeof value === "object" && !Array.isArray(value)) || (optional && !this.isSet(value));
  }
  
  public static isFunction(value: any, optional: boolean = false): boolean
  {
    return typeof value === "function" || (optional && !this.isSet(value));
  }

  public static isNull(value: any): boolean
  {
    return value === null;
  }

  public static isUndefined(value: any): boolean
  {
    return typeof value === "undefined";
  }
  
  public static isSet(value: any): boolean
  {
    return !this.isNull(value) && !this.isUndefined(value);
  }
  
  public static isEnum(value: any, optional: boolean = false): boolean
  {
    return (
        value !== null
        && typeof value === "object"
        && Array.isArray(value) === false
        && Object.keys(value).every(val => this.isString(val))
        && Object.values(value).every((value: any) => typeof value === "string" || typeof value === "number")
      )
      || (optional && !this.isSet(value));
  }
  
  public static isEnumValue(value: any, enumeration: { [key: string]: string | number }, optional: boolean = false)
  {
    if (!this.isEnum(enumeration)) throw new TypeError("Invalid enum passed to Types.isEnumValue");
    return Object.values(enumeration).includes(value) || (optional && !this.isSet(value));
  }
}
