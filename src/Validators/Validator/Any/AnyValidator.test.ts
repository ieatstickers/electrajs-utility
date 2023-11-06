import { AnyValidator } from "./AnyValidator";
import { Validators } from "../../Validators";

describe("AnyValidator", () => {
  
  describe("validate", () => {
    
    it("returns the correct response when validating a valid value", () => {
      const validator = new AnyValidator(
        [ Validators.string(), Validators.number() ],
        { optional: false }
      );
      const testValue = "test";
      const { value: validatorValue, valid, message } = validator.validate(testValue);
      expect(validatorValue).toBe(testValue);
      expect(valid).toBe(true);
      expect(message).toBeNull();
      
      const testValue2 = 123;
      const { value: validatorValue2, valid: valid2, message: message2 } = validator.validate(testValue2);
      expect(validatorValue2).toBe(testValue2);
      expect(valid2).toBe(true);
      expect(message2).toBeNull();
    });
    
    it("returns the correct response when validating an invalid value", () => {
      const validator = new AnyValidator(
        [ Validators.string(), Validators.number() ],
        { optional: false }
      );
      const testValue = true;
      const { value: validatorValue, valid, message } = validator.validate(testValue);
      expect(validatorValue).toBe(testValue);
      expect(valid).toBe(false);
      expect(message).toBe("Value doesn't pass any specified validators - boolean provided");
    });
    
    it("returns the correct response when validating a null value (optional)", () => {
      const nullValues = [ null, undefined ];
      
      for (const nullValue of nullValues)
      {
        const validator = new AnyValidator(
          [ Validators.string(), Validators.number() ],
          { optional: true }
        );
        const { value: validatorValue, valid, message } = validator.validate(nullValue);
        expect(validatorValue).toBe(nullValue);
        expect(valid).toBe(true);
        expect(message).toBeNull();
      }
    });
    
    it("returns the correct response when validating a null value (not optional)", () => {
      const nullValues = {
        null: null,
        undefined: undefined
      };
      
      for (const type in nullValues)
      {
        const nullValue = nullValues[type];
        const validator = new AnyValidator([ Validators.string(), Validators.number() ], { optional: false });
        const { value: validatorValue, valid, message } = validator.validate(nullValue);
        expect(validatorValue).toBe(nullValue);
        expect(valid).toBe(false);
        expect(message).toBe(`Value is required - ${type} provided`);
      }
    });
    
    it("throws an error when given an invalid value and throwErrors is true", () => {
      const validator = new AnyValidator(
        [ Validators.string(), Validators.number() ],
        { optional: false, throwErrors: true }
      );
      const testValue = true;
      const expectation = expect(() => validator.validate(testValue));
      expectation.toThrow(TypeError);
      expectation.toThrow("Value doesn't pass any specified validators - boolean provided");
    });
    
  });
  
});
