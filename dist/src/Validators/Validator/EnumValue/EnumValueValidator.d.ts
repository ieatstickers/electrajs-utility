import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { ValidatorOptions } from "../../Type/ValidatorOptions";
export declare class EnumValueValidator extends AbstractValidator {
    protected enumClass: {
        [key: string]: string | number;
    };
    constructor(enumClass: {
        [key: string]: string | number;
    }, options?: ValidatorOptions);
    validate(value: any): ValidatorResult;
}
