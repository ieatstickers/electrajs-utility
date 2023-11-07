import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
export declare class BooleanValidator extends AbstractValidator {
    validate(value: any): ValidatorResult;
}
