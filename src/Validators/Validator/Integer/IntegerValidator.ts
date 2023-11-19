import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { Types } from "../../../Types/Types";

export class IntegerValidator extends AbstractValidator
{
  public validate(value: any): ValidatorResult
  {
    if (!Types.isSet(value)) return this.handleValueNotSet(value);
    
    if (!Types.isInteger(value))
    {
      return this.handleResult({
        value: value,
        valid: false,
        message: `Value must be an integer - ${this.getValueType(value)} provided`
      })
    }
    
    return this.handleResult({ value: value, valid: true, message: null });
  }
}
