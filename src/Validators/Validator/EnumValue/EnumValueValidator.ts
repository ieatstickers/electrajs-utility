import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { Types } from "../../../Types/Types";
import { ValidatorOptions } from "../../Type/ValidatorOptions";

export class EnumValueValidator extends AbstractValidator
{
  protected enumClass: { [key: string]: string | number };
  
  public constructor(enumClass: { [key: string]: string | number }, options?: ValidatorOptions)
  {
    super(options);
    
    if (!Types.isEnum(enumClass))
    {
      throw new TypeError("EnumValueValidator requires a valid enum");
    }
    
    this.enumClass = enumClass;
  }
  
  public validate(value: any): ValidatorResult
  {
    if (!Types.isSet(value)) return this.handleValueNotSet(value);
    
    if (!Types.isString(value) && !Types.isNumber(value))
    {
      return this.handleResult({
        value: value,
        valid: false,
        message: `Enum value must be a string or a number - ${this.getValueType(value)} provided`
      });
    }
    
    if (!Types.isEnumValue(value, this.enumClass))
    {
      const enumValues = Object.values(this.enumClass);
      
      return this.handleResult({
        value: value,
        valid: false,
        message: `Value must be ${enumValues.slice(0, -1).join(", ")} or ${enumValues.slice(-1)} - "${value}" provided`
      });
    }
    
    return this.handleResult({ value: value, valid: true, message: null });
  }
}
