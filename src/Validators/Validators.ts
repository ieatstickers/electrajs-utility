import { ValidatorInterface } from "./Validator/ValidatorInterface";
import { StringValidator } from "./Validator/String/StringValidator";
import { ValidatorOptions } from "./Type/ValidatorOptions";
import { ArrayValidator } from "./Validator/Array/ArrayValidator";
import { BooleanValidator } from "./Validator/Boolean/BooleanValidator";
import { NumberValidator } from "./Validator/Number/NumberValidator";
import { ObjectValidator } from "./Validator/Object/ObjectValidator";
import { SchemaValidator } from "./Validator/Schema/SchemaValidator";
import { Schema } from "./Validator/Schema/Type/Schema";
import { AllValidator } from "./Validator/All/AllValidator";
import { AnyValidator } from "./Validator/Any/AnyValidator";
import { MinLengthValidator } from "./Validator/MinLength/MinLengthValidator";
import { MaxLengthValidator } from "./Validator/MaxLength/MaxLengthValidator";

export class Validators
{
  public static all(validators: ValidatorInterface[], options?: ValidatorOptions): ValidatorInterface
  {
    return new AllValidator(validators, options);
  }
  
  public static any(validators: ValidatorInterface[], options?: ValidatorOptions): ValidatorInterface
  {
    return new AnyValidator(validators, options);
  }
  
  public static array(options?: ValidatorOptions): ValidatorInterface
  {
    return new ArrayValidator(options);
  }

  public static boolean(options?: ValidatorOptions): ValidatorInterface
  {
    return new BooleanValidator(options);
  }

  public static maxLength(maxLength: number, options?: ValidatorOptions): ValidatorInterface
  {
    return new MaxLengthValidator(maxLength, options);
  }

  public static minLength(minLength: number, options?: ValidatorOptions): ValidatorInterface
  {
    return new MinLengthValidator(minLength, options);
  }

  public static number(options?: ValidatorOptions): ValidatorInterface
  {
    return new NumberValidator(options);
  }

  public static object(options?: ValidatorOptions): ValidatorInterface
  {
    return new ObjectValidator(options);
  }

  public static schema(schema: Schema, options?: ValidatorOptions): ValidatorInterface
  {
    return new SchemaValidator(schema, options);
  }

  public static string(options?: ValidatorOptions): ValidatorInterface
  {
    return new StringValidator(options);
  }
}
