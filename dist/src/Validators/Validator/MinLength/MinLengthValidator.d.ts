import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { ValidatorOptions } from "../../Type/ValidatorOptions";
export declare class MinLengthValidator extends AbstractValidator {
    protected minLength: number;
    constructor(minLength: number, options?: ValidatorOptions);
    validate(value: any): ValidatorResult;
}
