import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { ValidatorOptions } from "../../Type/ValidatorOptions";
export declare class MaxLengthValidator extends AbstractValidator {
    protected maxLength: number;
    constructor(maxLength: number, options?: ValidatorOptions);
    validate(value: any): ValidatorResult;
}
