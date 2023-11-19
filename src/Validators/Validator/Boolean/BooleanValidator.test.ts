import { BooleanValidator } from "./BooleanValidator";

describe("BooleanValidator", () => {
  
  describe("validate", () => {
    
    it("returns the correct response when validating a boolean value", () => {
      const validator = new BooleanValidator();
      const { value: validatorValue, valid, message } = validator.validate(false);
      expect(validatorValue).toBe(false);
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
          message: "Value must be a boolean - integer provided"
        },
        {
          value: "test",
          valid: false,
          message: "Value must be a boolean - string provided"
        },
        {
          value: [],
          valid: false,
          message: "Value must be a boolean - array provided"
        },
        {
          value: {},
          valid: false,
          message: "Value must be a boolean - object provided"
        },
        {
          value: () => { console.log("test"); },
          valid: false,
          message: "Value must be a boolean - function provided"
        }
      ]
      
      for (const { value, valid, message } of values)
      {
        const validator = new BooleanValidator();
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
        const validator = new BooleanValidator({ optional: false });
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
        const validator = new BooleanValidator({ optional: true });
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
        [],
        {},
        () => { console.log("test"); }
      ];
      
      for (const value of values)
      {
        const { message } = (new BooleanValidator()).validate(value);
        const validator = new BooleanValidator({ throwErrors: true });
        const expectation = expect(() => validator.validate(value));
        expectation.toThrow(TypeError);
        expectation.toThrow(message);
      }
    });
    
  });
  
});
