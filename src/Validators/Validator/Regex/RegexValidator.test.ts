import { RegexValidator } from "./RegexValidator";

const testRegexPattern = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

describe("RegexValidator", () => {
  
  describe("validate", () => {
    
    it("returns correct response when validating a value of valid type and format", () => {
      const validator = new RegexValidator(testRegexPattern, 'YYYY-MM-DD');
      const testValue = "2019-01-31";
      const { value: validatorValue, valid, message } = validator.validate(testValue);
      expect(validatorValue).toBe(testValue);
      expect(valid).toBe(true);
      expect(message).toBeNull();
    });
    
    it("returns correct response when validating a value of valid type but invalid format", () => {
      const validator = new RegexValidator(testRegexPattern, 'YYYY-MM-DD');
      const testValue = "2019-01-32";
      const { value: validatorValue, valid, message } = validator.validate(testValue);
      expect(validatorValue).toBe(testValue);
      expect(valid).toBe(false);
      expect(message).toBe(`Value must match format YYYY-MM-DD - "2019-01-32" provided`);
    });
    
    it("returns correct response when validating a value of invalid type", () => {
      const invalidValues = {
        integer: 123,
        boolean: false,
        function: () => console.log("test"),
        object: { test: true },
      };
      
      for (const type in invalidValues)
      {
        const invalidValue = invalidValues[type];
        const validator = new RegexValidator(testRegexPattern, 'YYYY-MM-DD');
        const { value: validatorValue, valid, message } = validator.validate(invalidValue);
        expect(validatorValue).toBe(invalidValue);
        expect(valid).toBe(false);
        expect(message).toBe(`Value must be a string - ${type} provided`);
      }
    });
    
    it("returns correct response when validating a null value (optional)", () => {
      const nullValues = [ null, undefined ];
      
      for (const nullValue of nullValues)
      {
        const validator = new RegexValidator(testRegexPattern, 'YYYY-MM-DD', { optional: true });
        const { value: validatorValue, valid, message } = validator.validate(nullValue);
        expect(validatorValue).toBe(nullValue);
        expect(valid).toBe(true);
        expect(message).toBeNull();
      }
    });
    
    it("returns correct response when validating a null value (not optional)", () => {
      const nullValues = {
        null: null,
        undefined: undefined
      };
      
      for (const type in nullValues)
      {
        const nullValue = nullValues[type];
        const validator = new RegexValidator(testRegexPattern, 'YYYY-MM-DD', { optional: false });
        const { value: validatorValue, valid, message } = validator.validate(nullValue);
        expect(validatorValue).toBe(nullValue);
        expect(valid).toBe(false);
        expect(message).toBe(`Value is required - ${type} provided`);
      }
    });
    
    it("throws error when given an invalid value and throwErrors is true", () => {
      const invalidValues = {
        null: {
          value: null,
          valid: false,
          message: "Value is required - null provided"
        },
        undefined: {
          value: undefined,
          valid: false,
          message: "Value is required - undefined provided"
        },
        integer: {
          value: 123,
          valid: false,
          message: "Value must be a string - integer provided"
        },
        boolean: {
          value: false,
          valid: false,
          message: "Value must be a string - boolean provided"
        },
        array: {
          value: [ 1, 2, 3, 4, 5, 6, 7],
          valid: false,
          message: "Value must be a string - array provided"
        },
        string: {
          value: "testing",
          valid: false,
          message: `Value must match format YYYY-MM-DD - "testing" provided`
        }
      }
      
      for (const { value, message } of Object.values(invalidValues))
      {
        const validator = new RegexValidator(testRegexPattern, 'YYYY-MM-DD', { throwErrors: true });
        const expectation = expect(() => validator.validate(value));
        expectation.toThrow(TypeError);
        expectation.toThrow(message);
      }
    });
    
  });
  
});
