export declare class Types {
    static isString(value: any, optional?: boolean): boolean;
    static isBoolean(value: any, optional?: boolean): boolean;
    static isNumber(value: any, optional?: boolean): boolean;
    static isInteger(value: any, optional?: boolean): boolean;
    static isArray(value: any, optional?: boolean): boolean;
    static isObject(value: any, optional?: boolean): boolean;
    static isFunction(value: any, optional?: boolean): boolean;
    static isNull(value: any): boolean;
    static isUndefined(value: any): boolean;
    static isSet(value: any): boolean;
    static isEnum(value: any, optional?: boolean): boolean;
    static isEnumValue(value: any, enumeration: {
        [key: string]: string | number;
    }, optional?: boolean): boolean;
}
