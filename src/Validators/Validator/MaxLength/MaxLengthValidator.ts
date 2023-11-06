import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { Types } from "../../../Types/Types";
import { ValidatorOptions } from "../../Type/ValidatorOptions";

export class MaxLengthValidator extends AbstractValidator
{
  protected maxLength: number;
  
  public constructor(maxLength: number, options?: ValidatorOptions)
  {
    super(options);
    this.maxLength = maxLength;
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
    
    if (value.length > this.maxLength)
    {
      return this.handleResult({
        value: value,
        valid: false,
        message: `Value must be no more than ${this.maxLength} in length - ${this.getValueType(value)} of length ${value.length} provided`
      });
    }
    
    return this.handleResult({ value: value, valid: true, message: null });
  }
}
