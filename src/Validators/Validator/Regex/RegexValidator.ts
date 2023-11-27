import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { Types } from "../../../Types/Types";
import { ValidatorOptions } from "../../Type/ValidatorOptions";

export class RegexValidator extends AbstractValidator
{
  protected pattern: RegExp;
  protected expectedFormat: string;
  
  public constructor(pattern: RegExp, expectedFormat: string, options?: ValidatorOptions)
  {
    super(options);
    this.pattern = pattern;
    this.expectedFormat = expectedFormat;
  }
  
  public validate(value: any): ValidatorResult
  {
    if (!Types.isSet(value)) return this.handleValueNotSet(value);
    
    if (!Types.isString(value))
    {
      return this.handleResult({
        value: value,
        valid: false,
        message: `Value must be a string - ${this.getValueType(value)} provided`
      });
    }
    
    if (!this.pattern.test(value))
    {
      return this.handleResult({
        value: value,
        valid: false,
        message: `Value must match format ${this.expectedFormat} - "${value}" provided`
      });
    }
    
    return this.handleResult({ value: value, valid: true, message: null });
  }
}
