import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { Types } from "../../../Types/Types";
import { ValidatorOptions } from "../../Type/ValidatorOptions";

export class MinLengthValidator extends AbstractValidator
{
  protected minLength: number;
  
  public constructor(minLength: number, options?: ValidatorOptions)
  {
    super(options);
    this.minLength = minLength;
  }
  
  public validate(value: any): ValidatorResult
  {
    if (!Types.isSet(value)) return this.handleValueNotSet(value);
    
    if (!Types.isString(value) && !Types.isArray(value))
    {
      return this.handleResult({
        value: value,
        valid: false,
        message: `Value must be a string or an array - ${this.getValueType(value)} provided`
      });
    }
    
    if (value.length < this.minLength)
    {
      return this.handleResult({
        value: value,
        valid: false,
        message: `Value must be at least ${this.minLength} in length - ${this.getValueType(value)} of length ${value.length} provided`
      });
    }
    
    return this.handleResult({ value: value, valid: true, message: null });
  }
}
