import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { ValidatorOptions } from "../../Type/ValidatorOptions";
import { ValidatorInterface } from "../ValidatorInterface";
import { Types } from "../../../Types/Types";

export class AllValidator extends AbstractValidator
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
      const { valid, message } = validator.validate(value);
      
      if (!valid)
      {
        return this.handleResult({
          value: value,
          valid: false,
          message: message
        });
      }
    }
    
    return this.handleResult({ value: value, valid: true, message: null });
  }
}
