import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { ValidatorOptions } from "../../Type/ValidatorOptions";
export declare class RegexValidator extends AbstractValidator {
    protected pattern: RegExp;
    protected expectedFormat: string;
    constructor(pattern: RegExp, expectedFormat: string, options?: ValidatorOptions);
    validate(value: any): ValidatorResult;
}
