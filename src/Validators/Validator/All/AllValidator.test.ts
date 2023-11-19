import { AllValidator } from "./AllValidator";
import { Validators } from "../../Validators";

describe("AllValidator", () => {
  
  describe("validate", () => {
    
    it("returns the correct response when validating a valid value", () => {
      
      const validator = new AllValidator([ Validators.string(), Validators.minLength(5), Validators.maxLength(10) ]);
      
      const testValue = "testing";
      
      const { value: validatorValue, valid, message } = validator.validate(testValue);
      expect(validatorValue).toBe(testValue);
      expect(valid).toBe(true);
      expect(message).toBeNull();
      
    });
    
    it("returns correct response when validating an invalid value", () => {
      
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
          value: true,
          valid: false,
          message: "Value must be a string - boolean provided"
        },
        array: {
          value: [],
          valid: false,
          message: "Value must be a string - array provided"
        },
        function: {
          value: () => { console.log("test"); },
          valid: false,
          message: "Value must be a string - function provided"
        },
        minLength: {
          value: "test",
          valid: false,
          message: "Value must be at least 5 in length - string of length 4 provided"
        },
        maxLength: {
          value: "testing1234",
          valid: false,
          message: "Value must be no more than 10 in length - string of length 11 provided"
        }
      };
      
      for (const type in invalidValues)
      {
        const { value, valid, message } = invalidValues[type];
        const validator = new AllValidator([ Validators.string(), Validators.minLength(5), Validators.maxLength(10) ]);
        const { value: validatorValue, valid: isValid, message: validatorMessage } = validator.validate(value);
        expect(validatorValue).toBe(value);
        expect(isValid).toBe(valid);
        expect(validatorMessage).toBe(message);
      }
      
    });
    
    it("returns correct response when validating a null value (optional)", () => {
      
      const nullValues = {
        null: null,
        undefined: undefined
      };
      
      for (const type in nullValues)
      {
        const nullValue = nullValues[type];
        const validator = new AllValidator(
          [ Validators.string(), Validators.minLength(5), Validators.maxLength(10) ],
          { optional: true }
        );
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
        const validator = new AllValidator(
          [ Validators.string(), Validators.minLength(5), Validators.maxLength(10) ],
          { optional: false }
        );
        const { value: validatorValue, valid, message } = validator.validate(nullValue);
        expect(validatorValue).toBe(nullValue);
        expect(valid).toBe(false);
        expect(message).toBe(`Value is required - ${type} provided`);
      }
      
    });
    
    it("throws an error when given an invalid value and throwErrors is true", () => {
      
      const validator = new AllValidator(
        [ Validators.string(), Validators.minLength(5), Validators.maxLength(10) ],
        { throwErrors: true }
      );
      const testValue = 123;
      
      const expectation = expect(() => { validator.validate(testValue);});
      
      expectation.toThrow(TypeError);
      expectation.toThrow("Value must be a string - integer provided");
      
    });
    
  });
  
});
