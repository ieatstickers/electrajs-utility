import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { Types } from "../../../Types/Types";

export class NumberValidator extends AbstractValidator
{
  public validate(value: any): ValidatorResult
  {
    if (!Types.isSet(value)) return this.handleValueNotSet(value);
    
    if (!Types.isNumber(value))
    {
      return this.handleResult({
        value: value,
        valid: false,
        message: `Value must be a number - ${this.getValueType(value)} provided`
      })
    }
    
    return this.handleResult({ value: value, valid: true, message: null });
  }
}
