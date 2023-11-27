import { ArrayValidator } from "./ArrayValidator";
import { IntegerValidator } from "../Integer/IntegerValidator";

describe("ArrayValidator", () => {
  
  describe("validate", () => {
    
    it("returns the correct response when validating an array value", () => {
      const validator = new ArrayValidator();
      const testValue = [ 1, 2, 3 ];
      const { value, valid, message } = validator.validate(testValue);
      expect(value).toBe(testValue);
      expect(valid).toBe(true);
      expect(message).toBeNull();
    });
    
    it("returns the correct response when given an invalid value", () => {
      const values = [
        {
          value: null,
          valid: false,
          message: "Value is required - null provided"
        },
        {
          value: undefined,
          valid: false,
          message: "Value is required - undefined provided"
        },
        {
          value: 123,
          valid: false,
          message: "Value must be an array - integer provided"
        },
        {
          value: "test",
          valid: false,
          message: "Value must be an array - string provided"
        },
        {
          value: false,
          valid: false,
          message: "Value must be an array - boolean provided"
        },
        {
          value: {},
          valid: false,
          message: "Value must be an array - object provided"
        },
        {
          value: () => { console.log("test"); },
          valid: false,
          message: "Value must be an array - function provided"
        }
      ]
      
      for (const { value, valid, message } of values)
      {
        const validator = new ArrayValidator();
        const { value: validatorValue, valid: isValid, message: validatorMessage } = validator.validate(value);
        expect(validatorValue).toBe(value);
        expect(isValid).toBe(valid);
        expect(validatorMessage).toBe(message);
      }
    });
    
    it("returns the correct response when given a null value (not optional)", () => {
      const values = {
        "null": null,
        "undefined": undefined
      };
      
      for (const [key, value] of Object.entries(values))
      {
        const validator = new ArrayValidator(null, { optional: false });
        const { value: validatorValue, valid: isValid, message: validatorMessage } = validator.validate(value);
        expect(validatorValue).toBe(value);
        expect(isValid).toBe(false);
        expect(validatorMessage).toBe(`Value is required - ${key} provided`);
      }
    });
    
    it("returns the correct response when given a null value (optional)", () => {
      const values = [ null, undefined ];
      
      for (const value of values)
      {
        const validator = new ArrayValidator(null, { optional: true });
        const { value: validatorValue, valid: isValid, message: validatorMessage } = validator.validate(value);
        expect(validatorValue).toBe(value);
        expect(isValid).toBe(true);
        expect(validatorMessage).toBeNull();
      }
    });
    
    it("throws an error when given an invalid value and throwErrors is true", () => {
      const values = [
        null,
        undefined,
        123,
        "test",
        false,
        {},
        () => { console.log("test"); }
      ];
      
      for (const value of values)
      {
        const { message } = (new ArrayValidator()).validate(value);
        const validator = new ArrayValidator(null, { throwErrors: true });
        const expectation = expect(() => validator.validate(value));
        expectation.toThrow(TypeError);
        expectation.toThrow(message);
      }
    });
    
    it("returns the correct response when given an invalid array item", () => {
      
      const validator = new ArrayValidator((new IntegerValidator()));
      const { value, valid, message } = validator.validate([ 1, 2, 3, "test" ]);
      expect(value).toEqual([ 1, 2, 3, "test" ]);
      expect(valid).toBe(false);
      expect(message).toBe("Array item failed validation. Value must be an integer - string provided");
      
    });
    
  });
  
});
