import { AbstractValidator } from "../AbstractValidator";
import { ValidatorResult } from "../../Type/ValidatorResult";
import { ValidatorOptions } from "../../Type/ValidatorOptions";
import { Types } from "../../../Types/Types";
import { Schema } from "./Type/Schema";

export class SchemaValidator extends AbstractValidator
{
  protected schema: Schema;
  protected options: ValidatorOptions;
  
  public constructor(schema: Schema, options?: ValidatorOptions)
  {
    super(options);
    this.schema = schema;
  }
  
  public validate(value: any): ValidatorResult
  {
    if (!Types.isSet(value)) return this.handleValueNotSet(value);
    
    if (!Types.isObject(value))
    {
      return this.handleResult({
        value: value,
        valid: false,
        message: `Value must be of type object - ${this.getValueType(value)} provided`
      });
    }
    
    for (const [ key, validator ] of Object.entries(this.schema))
    {
      const { valid, message } = validator.validate(value[key]);
      
      if (!valid)
      {
        return this.handleResult({
          value: value,
          valid: false,
          message: `${key} does not match schema definition. ${message}`
        });
      }
      
    }
    
    return this.handleResult({ value: value, valid: true, message: null });
  }
}
