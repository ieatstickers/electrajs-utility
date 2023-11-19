import { ValidatorInterface } from "./Validator/ValidatorInterface";
import { ValidatorOptions } from "./Type/ValidatorOptions";
import { Schema } from "./Validator/Schema/Type/Schema";
export declare class Validators {
    static all(validators: ValidatorInterface[], options?: ValidatorOptions): ValidatorInterface;
    static any(validators: ValidatorInterface[], options?: ValidatorOptions): ValidatorInterface;
    static array(options?: ValidatorOptions): ValidatorInterface;
    static boolean(options?: ValidatorOptions): ValidatorInterface;
    static enumValue(enumClass: {
        [key: string]: string | number;
    }, options?: ValidatorOptions): ValidatorInterface;
    static integer(options?: ValidatorOptions): ValidatorInterface;
    static maxLength(maxLength: number, options?: ValidatorOptions): ValidatorInterface;
    static minLength(minLength: number, options?: ValidatorOptions): ValidatorInterface;
    static number(options?: ValidatorOptions): ValidatorInterface;
    static object(options?: ValidatorOptions): ValidatorInterface;
    static regex(pattern: RegExp, expectedFormat: string, options?: ValidatorOptions): ValidatorInterface;
    static schema(schema: Schema, options?: ValidatorOptions): ValidatorInterface;
    static string(options?: ValidatorOptions): ValidatorInterface;
}
