import { Validators } from "./Validators";
import { StringValidator } from "./Validator/String/StringValidator";
import { ArrayValidator } from "./Validator/Array/ArrayValidator";
import { BooleanValidator } from "./Validator/Boolean/BooleanValidator";
import { NumberValidator } from "./Validator/Number/NumberValidator";
import { ObjectValidator } from "./Validator/Object/ObjectValidator";
import { SchemaValidator } from "./Validator/Schema/SchemaValidator";
import { AllValidator } from "./Validator/All/AllValidator";
import { AnyValidator } from "./Validator/Any/AnyValidator";
import { MaxLengthValidator } from "./Validator/MaxLength/MaxLengthValidator";
import { MinLengthValidator } from "./Validator/MinLength/MinLengthValidator";
import { EnumValueValidator } from "./Validator/EnumValue/EnumValueValidator";
import { IntegerValidator } from "./Validator/Integer/IntegerValidator";

describe("Validators", () => {
  
  describe("all", () => {
    
    it("returns an AllValidator instance", () => {
      expect(Validators.all([])).toBeInstanceOf(AllValidator);
    });
    
  });
  
  describe("any", () => {
    
    it("returns an AnyValidator instance", () => {
      expect(Validators.any([])).toBeInstanceOf(AnyValidator);
    });
    
  });
  
  describe("array", () => {
    
    it("returns an ArrayValidator instance", () => {
      expect(Validators.array()).toBeInstanceOf(ArrayValidator);
    });
    
  });
  
  describe("boolean", () => {
    
    it("returns a BooleanValidator instance", () => {
      expect(Validators.boolean()).toBeInstanceOf(BooleanValidator);
    });
    
  });
  
  describe("enumValue", () => {
    
    it("returns a EnumValueValidator instance", () => {
      
      enum TestEnum
      {
        FOO = "foo",
        BAR = "bar"
      }
      
      expect(Validators.enumValue(TestEnum)).toBeInstanceOf(EnumValueValidator);
    });
    
  });
  
  describe("integer", () => {
    
    it("returns an IntegerValidator instance ", () => {
      expect(Validators.integer()).toBeInstanceOf(IntegerValidator);
    });
    
  });
  
  describe("maxLength", () => {
    
    it("returns a MaxLengthValidator instance", () => {
      expect(Validators.maxLength(5)).toBeInstanceOf(MaxLengthValidator);
    });
    
  });
  
  describe("minLength", () => {
    
    it("returns a MinLengthValidator instance", () => {
      expect(Validators.minLength(5)).toBeInstanceOf(MinLengthValidator);
    });
    
  });
  
  describe("number", () => {
    
    it("returns a NumberValidator instance ", () => {
      expect(Validators.number()).toBeInstanceOf(NumberValidator);
    });
    
  });
  
  describe("object", () => {
    
    it("returns an ObjectValidator instance", () => {
      expect(Validators.object()).toBeInstanceOf(ObjectValidator);
    });
    
  });
  
  describe("schema", () => {
    
    it("returns a SchemaValidator instance", () => {
      expect(Validators.schema({})).toBeInstanceOf(SchemaValidator);
    });
    
  });
  
  describe("string", () => {
    
    it("returns a StringValidator instance", () => {
      expect(Validators.string()).toBeInstanceOf(StringValidator);
    });
    
  });
  
});
