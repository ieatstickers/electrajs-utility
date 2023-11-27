import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { Types } from "../../../Types/Types";
import { ValidatorInterface } from "../ValidatorInterface";
import { ValidatorOptions } from "../../Type/ValidatorOptions";

export class ArrayValidator extends AbstractValidator
{
  private readonly itemValidator: ValidatorInterface;
  
  public constructor(itemValidator?: ValidatorInterface, options?: ValidatorOptions)
  {
    super(options);
    this.itemValidator = itemValidator;
  }
  
  public validate(value: any): ValidatorResult
  {
    if (!Types.isSet(value)) return this.handleValueNotSet(value);
    
    if (!Types.isArray(value))
    {
      return this.handleResult({
        value: value,
        valid: false,
        message: `Value must be an array - ${this.getValueType(value)} provided`
      })
    }
    
    if (this.itemValidator)
    {
      for (const item of value)
      {
        const { valid, message } = this.itemValidator.validate(item);
        
        if (!valid)
        {
          return this.handleResult({
            value: value,
            valid: false,
            message: `Array item validation failed. ${message}`
          });
        }
      }
    }
    
    return this.handleResult({ value: value, valid: true, message: null });
  }
}
