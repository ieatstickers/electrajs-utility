import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { ValidatorInterface } from "../ValidatorInterface";
import { ValidatorOptions } from "../../Type/ValidatorOptions";
export declare class ArrayValidator extends AbstractValidator {
    private readonly itemValidator;
    constructor(itemValidator?: ValidatorInterface, options?: ValidatorOptions);
    validate(value: any): ValidatorResult;
}
