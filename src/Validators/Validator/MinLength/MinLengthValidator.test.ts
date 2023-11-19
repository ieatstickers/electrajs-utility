import { MinLengthValidator } from "./MinLengthValidator";

describe("MinLengthValidator", () => {
  
  describe("validate", () => {
    
    it("returns correct response when validating a value of valid type and length", () => {
      const validator = new MinLengthValidator(3);
      const testValue = "test";
      const { value: validatorValue, valid, message } = validator.validate(testValue);
      expect(validatorValue).toBe(testValue);
      expect(valid).toBe(true);
      expect(message).toBeNull();
      
      const testValue2 = [ 1, 2, 3 ];
      const { value: validatorValue2, valid: valid2, message: message2 } = validator.validate(testValue2);
      expect(validatorValue2).toBe(testValue2);
      expect(valid2).toBe(true);
      expect(message2).toBeNull();
    });
    
    it("returns correct response when validating a value of valid type but invalid length", () => {
      const validator = new MinLengthValidator(3);
      const testValue = "te";
      const { value: validatorValue, valid, message } = validator.validate(testValue);
      expect(validatorValue).toBe(testValue);
      expect(valid).toBe(false);
      expect(message).toBe("Value must be at least 3 in length - string of length 2 provided");
      const testValue2 = [ 1, 2 ];
      const { value: validatorValue2, valid: valid2, message: message2 } = validator.validate(testValue2);
      expect(validatorValue2).toBe(testValue2);
      expect(valid2).toBe(false);
      expect(message2).toBe("Value must be at least 3 in length - array of length 2 provided");
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
        const validator = new MinLengthValidator(3);
        const { value: validatorValue, valid, message } = validator.validate(invalidValue);
        expect(validatorValue).toBe(invalidValue);
        expect(valid).toBe(false);
        expect(message).toBe(`Value must be a string or an array - ${type} provided`);
      }
    });
    
    it("returns correct response when validating a null value (optional)", () => {
      const nullValues = [ null, undefined ];
      
      for (const nullValue of nullValues)
      {
        const validator = new MinLengthValidator(3, { optional: true });
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
        const validator = new MinLengthValidator(3, { optional: false });
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
          message: "Value must be a string or an array - integer provided"
        },
        boolean: {
          value: false,
          valid: false,
          message: "Value must be a string or an array - boolean provided"
        },
        array: {
          value: [],
          valid: false,
          message: "Value must be at least 3 in length - array of length 0 provided"
        },
        string: {
          value: "te",
          valid: false,
          message: "Value must be at least 3 in length - string of length 2 provided"
        }
      }
      
      for (const { value, valid, message } of Object.values(invalidValues))
      {
        const validator = new MinLengthValidator(3, { throwErrors: true });
        const expectation = expect(() => validator.validate(value));
        expectation.toThrow(TypeError);
        expectation.toThrow(message);
      }
    });
    
  });
  
});
