import { StringValidator } from "./StringValidator";

describe("StringValidator", () => {
  
  describe("validate", () => {
    
    it("returns the correct response when validating a string value", () => {
      const { value, valid, message } = (new StringValidator()).validate("valid string");
      expect(value).toBe("valid string");
      expect(valid).toBe(true);
      expect(message).toBeNull();
    });
    
    it("returns the correct response when validating an invalid value", () => {
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
          message: "Value must be a string - number provided"
        },
        {
          value: true,
          valid: false,
          message: "Value must be a string - boolean provided"
        },
        {
          value: [],
          valid: false,
          message: "Value must be a string - array provided"
        },
        {
          value: {},
          valid: false,
          message: "Value must be a string - object provided"
        },
        {
          value: () => { console.log("test"); },
          valid: false,
          message: "Value must be a string - function provided"
        }
      ]
      
      for (const { value, valid, message } of values)
      {
        const validator = new StringValidator();
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
      
      for (const [ key, value] of Object.entries(values))
      {
        const validator = new StringValidator({ optional: false });
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
        const validator = new StringValidator({ optional: true });
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
        true,
        [],
        {},
        () => { console.log("test"); }
      ];
      
      for (const value of values)
      {
        const { message } = (new StringValidator()).validate(value);
        const validator = new StringValidator({ throwErrors: true });
        const expectation = expect(() => validator.validate(value));
        expectation.toThrow(TypeError);
        expectation.toThrow(message);
      }
    });
    
  });
  
});
