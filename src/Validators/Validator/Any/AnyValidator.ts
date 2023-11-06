import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { ValidatorOptions } from "../../Type/ValidatorOptions";
import { ValidatorInterface } from "../ValidatorInterface";
import { Types } from "../../../Types/Types";

export class AnyValidator extends AbstractValidator
{
  protected validators: Array<ValidatorInterface>;
  
  public constructor(validators: Array<ValidatorInterface>, options?: ValidatorOptions)
  {
    super(options);
    this.validators = validators;
  }
  
  public validate(value: any): ValidatorResult
  {
    if (!Types.isSet(value)) return this.handleValueNotSet(value);
    
    for (const validator of this.validators)
    {
      const { valid } = validator.validate(value);
      
      if (valid)
      {
        return this.handleResult({ value: value, valid: true, message: null });
      }
    }
    
    return this.handleResult({
      value: value,
      valid: false,
      message: `Value doesn't pass any specified validators - ${this.getValueType(value)} provided`
    });
  }
}
