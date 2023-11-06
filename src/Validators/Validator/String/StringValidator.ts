import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { Types } from "../../../Types/Types";

export class StringValidator extends AbstractValidator
{
  public validate(value: any): ValidatorResult
  {
    if (!Types.isSet(value)) return this.handleValueNotSet(value);
    
    if (!Types.isString(value))
    {
      return this.handleResult({
        value: value,
        valid: false,
        message: `Value must be a string - ${this.getValueType(value)} provided`
      })
    }
    
    return this.handleResult({ value: value, valid: true, message: null });
  }
}
