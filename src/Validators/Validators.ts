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
import { EnumValueValidator } from "./Validator/EnumValue/EnumValueValidator";
import { IntegerValidator } from "./Validator/Integer/IntegerValidator";
import { RegexValidator } from "./Validator/Regex/RegexValidator";
import { AbstractValidator } from "./Validator/AbstractValidator";

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
  
  public static array(itemValidator: ValidatorInterface, options?: ValidatorOptions): ValidatorInterface;
  public static array(options?: ValidatorOptions): ValidatorInterface;
  public static array(...args: Array<any>): ValidatorInterface
  {
    const [ firstArg, options ] = args;
    
    if (firstArg instanceof AbstractValidator)
    {
      return new ArrayValidator(firstArg, options);
    }
    
    return new ArrayValidator(undefined, firstArg);
  }

  public static boolean(options?: ValidatorOptions): ValidatorInterface
  {
    return new BooleanValidator(options);
  }

  public static enumValue(enumClass: { [key: string]: string | number }, options?: ValidatorOptions): ValidatorInterface
  {
    return new EnumValueValidator(enumClass, options);
  }
  
  public static integer(options?: ValidatorOptions): ValidatorInterface
  {
    return new IntegerValidator(options);
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

  public static regex(pattern: RegExp, expectedFormat: string, options?: ValidatorOptions): ValidatorInterface
  {
    return new RegexValidator(pattern, expectedFormat, options);
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
