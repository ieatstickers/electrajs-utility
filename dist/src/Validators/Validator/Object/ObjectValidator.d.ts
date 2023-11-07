import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
export declare class ObjectValidator extends AbstractValidator {
    validate(value: any): ValidatorResult;
}
