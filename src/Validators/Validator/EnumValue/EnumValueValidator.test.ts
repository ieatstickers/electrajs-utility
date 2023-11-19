import { EnumValueValidator } from "./EnumValueValidator";

enum TestEnum
{
  ONE = "one",
  TWO = "two",
  THREE = "three",
  FOUR = "four",
  FIVE = "five"
}

describe("EnumValueValidator", () => {
  
  describe("validate", () => {
    
    it("returns correct response when validating a valid enum value", () => {
      const validator = new EnumValueValidator(TestEnum);
      const testValue = "three";
      const { value: validatorValue, valid, message } = validator.validate(testValue);
      expect(validatorValue).toBe(testValue);
      expect(valid).toBe(true);
      expect(message).toBeNull();
    });
    
    it("returns correct response when validating a value of valid type but not in enum", () => {
      const validator = new EnumValueValidator(TestEnum);
      const testValue = "testing";
      const { value: validatorValue, valid, message } = validator.validate(testValue);
      expect(validatorValue).toBe(testValue);
      expect(valid).toBe(false);
      const enumValues = Object.values(TestEnum);
      expect(message).toBe(`Value must be ${enumValues.slice(0, -1).join(", ")} or ${enumValues.slice(-1)} - "testing" provided`);
      
    });
    
    it("returns correct response when validating a value of invalid type", () => {
      const invalidValues = {
        array: [ 1, 2, 3 ],
        boolean: false,
        function: () => console.log("test"),
        object: { test: true },
      };
      
      for (const type in invalidValues)
      {
        const invalidValue = invalidValues[type];
        const validator = new EnumValueValidator(TestEnum);
        const { value: validatorValue, valid, message } = validator.validate(invalidValue);
        expect(validatorValue).toBe(invalidValue);
        expect(valid).toBe(false);
        expect(message).toBe(`Enum value must be a string or a number - ${type} provided`);
      }
    });
    
    it("returns correct response when validating a null value (optional)", () => {
      const nullValues = [ null, undefined ];
      
      for (const nullValue of nullValues)
      {
        const validator = new EnumValueValidator(TestEnum, { optional: true });
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
        const validator = new EnumValueValidator(TestEnum, { optional: false });
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
        boolean: {
          value: false,
          valid: false,
          message: "Enum value must be a string or a number - boolean provided"
        },
        array: {
          value: [ 1, 2, 3, 4, 5, 6, 7],
          valid: false,
          message: "Enum value must be a string or a number - array provided"
        }
      }
      
      for (const { value, message } of Object.values(invalidValues))
      {
        const validator = new EnumValueValidator(TestEnum, { throwErrors: true });
        const expectation = expect(() => validator.validate(value));
        expectation.toThrow(TypeError);
        expectation.toThrow(message);
      }
    });
    
  });
  
});
