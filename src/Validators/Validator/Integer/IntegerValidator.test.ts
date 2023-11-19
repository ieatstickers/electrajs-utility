import { IntegerValidator } from "./IntegerValidator";

describe("IntegerValidator", () => {
  
  describe("validate", () => {
    
    it("returns the correct response when validating a number value", () => {
      const validator = new IntegerValidator();
      const { value: validatorValue, valid, message } = validator.validate(123);
      expect(validatorValue).toBe(123);
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
          value: false,
          valid: false,
          message: "Value must be an integer - boolean provided"
        },
        {
          value: "test",
          valid: false,
          message: "Value must be an integer - string provided"
        },
        {
          value: [],
          valid: false,
          message: "Value must be an integer - array provided"
        },
        {
          value: {},
          valid: false,
          message: "Value must be an integer - object provided"
        },
        {
          value: () => { console.log("test"); },
          valid: false,
          message: "Value must be an integer - function provided"
        }
      ]
      
      for (const { value, valid, message } of values)
      {
        const validator = new IntegerValidator();
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
        const validator = new IntegerValidator({ optional: false });
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
        const validator = new IntegerValidator({ optional: true });
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
        false,
        "test",
        [],
        {},
        () => { console.log("test"); }
      ];
      
      for (const value of values)
      {
        const { message } = (new IntegerValidator()).validate(value);
        const validator = new IntegerValidator({ throwErrors: true });
        const expectation = expect(() => validator.validate(value));
        expectation.toThrow(TypeError);
        expectation.toThrow(message);
      }
    });
    
  });
  
});
