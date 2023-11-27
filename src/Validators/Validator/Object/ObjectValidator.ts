import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { Types } from "../../../Types/Types";
import { ValidatorInterface } from "../ValidatorInterface";
import { ValidatorOptions } from "../../Type/ValidatorOptions";

export class ObjectValidator extends AbstractValidator
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
    
    if (!Types.isObject(value))
    {
      return this.handleResult({
        value: value,
        valid: false,
        message: `Value must be an object - ${this.getValueType(value)} provided`
      })
    }
    
    if (this.itemValidator)
    {
      for (const key in value)
      {
        const item = value[key];
        const { valid, message } = this.itemValidator.validate(item);
        
        if (!valid)
        {
          return this.handleResult({
            value: value,
            valid: false,
            message: `Object value with key "${key}" failed validation. ${message}`
          });
        }
      }
    }
    
    return this.handleResult({ value: value, valid: true, message: null });
  }
}
