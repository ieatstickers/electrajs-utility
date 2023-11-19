import { ValidatorInterface } from "./ValidatorInterface";
import { ValidatorResult } from "../Type/ValidatorResult";
import { ValidatorOptions } from "../Type/ValidatorOptions";

export abstract class AbstractValidator implements ValidatorInterface
{
  protected readonly options: ValidatorOptions;
  
  public constructor(options?: ValidatorOptions)
  {
    this.options = Object.assign(
      {},
      this.getDefaultOptions(),
      options
    )
  }
  
  public abstract validate(value: any): ValidatorResult;
  
  protected getOption(name: keyof ValidatorOptions): ValidatorOptions[keyof ValidatorOptions]
  {
    return this.options[name];
  }
  
  protected getValueType(value: any): string
  {
    if (value === null) return "null";
    else if (Array.isArray(value)) return "array";
    else if (Number.isInteger(value)) return "integer";
    return typeof value;
  }
  
  protected handleValueNotSet(value: any): ValidatorResult
  {
    if (this.getOption("optional") === true)
    {
      return this.handleResult({ value: value, valid: true, message: null });
    }
    
    return this.handleResult({
      value: value,
      valid: false,
      message: `Value is required - ${this.getValueType(value)} provided`
    })
  }
  
  protected handleResult(result: ValidatorResult): ValidatorResult
  {
    if (this.getOption("throwErrors") && result.valid === false)
    {
      throw new TypeError(result.message);
    }
    
    return result;
  }
  
  private getDefaultOptions(): ValidatorOptions
  {
    return {
      optional: false,
      throwErrors: false
    };
  }
}
