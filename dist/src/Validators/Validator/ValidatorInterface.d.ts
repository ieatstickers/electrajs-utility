import { ValidatorResult } from "../Type/ValidatorResult";
export interface ValidatorInterface {
    validate(value: any): ValidatorResult;
}
