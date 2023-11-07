import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { ValidatorOptions } from "../../Type/ValidatorOptions";
import { ValidatorInterface } from "../ValidatorInterface";
export declare class AllValidator extends AbstractValidator {
    protected validators: Array<ValidatorInterface>;
    constructor(validators: Array<ValidatorInterface>, options?: ValidatorOptions);
    validate(value: any): ValidatorResult;
}
