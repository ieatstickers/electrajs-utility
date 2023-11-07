import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { ValidatorOptions } from "../../Type/ValidatorOptions";
import { Schema } from "./Type/Schema";
export declare class SchemaValidator extends AbstractValidator {
    protected schema: Schema;
    protected options: ValidatorOptions;
    constructor(schema: Schema, options?: ValidatorOptions);
    validate(value: any): ValidatorResult;
}
