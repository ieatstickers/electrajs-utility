import { ValidatorInterface } from "./ValidatorInterface";
import { ValidatorResult } from "../Type/ValidatorResult";
import { ValidatorOptions } from "../Type/ValidatorOptions";
export declare abstract class AbstractValidator implements ValidatorInterface {
    protected readonly options: ValidatorOptions;
    constructor(options?: ValidatorOptions);
    abstract validate(value: any): ValidatorResult;
    protected getOption(name: keyof ValidatorOptions): ValidatorOptions[keyof ValidatorOptions];
    protected getValueType(value: any): string;
    protected handleValueNotSet(value: any): ValidatorResult;
    protected handleResult(result: ValidatorResult): ValidatorResult;
    private getDefaultOptions;
}
