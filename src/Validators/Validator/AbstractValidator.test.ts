import { AbstractValidator } from "./AbstractValidator";
import { ValidatorResult } from "../Type/ValidatorResult";

class TestValidator extends AbstractValidator
{
  public validate(value: any): ValidatorResult
  {
    return {
      value: value,
      valid: true,
      message: null
    };
  }
}

describe("AbstractValidator", () => {
  
  describe("getOption", () => {
    
    it("getOption returns correct option", () => {
      const validator = new TestValidator({ optional: false, throwErrors: false });
      expect(validator["getOption"]("optional")).toBe(false);
      expect(validator["getOption"]("throwErrors")).toBe(false);
      
      const validatorWithOptionOverrides = new TestValidator({ optional: true, throwErrors: true });
      expect(validatorWithOptionOverrides["getOption"]("optional")).toBe(true);
      expect(validatorWithOptionOverrides["getOption"]("throwErrors")).toBe(true);
    });
    
  });
  
  describe("getValueType", () => {
    
    const values = {
      "null": null,
      "array": [1, 2, 3],
      "undefined": undefined,
      "string": "test",
      "number": 123,
      "boolean": false,
      "function": () => {},
      "object": { test: "test" }
    };
    
    for (const [type, value] of Object.entries(values))
    {
      it(`returns correct value type for ${type}`, () => {
        const validator = new TestValidator();
        expect(validator["getValueType"](value)).toBe(type);
      });
    }
    
  });
  
  describe("handleValueNotSet", () => {
    
    it("returns valid if it's optional", () => {
      const validator = new TestValidator({ optional: true });
      expect(validator["handleValueNotSet"](null)).toEqual({ value: null, valid: true, message: null });
    });
    
    it("returns invalid if it's not optional", () => {
      const validator = new TestValidator({ optional: false });
      expect(validator["handleValueNotSet"](undefined)).toEqual({ value: undefined, valid: false, message: `Value is required - undefined provided` });
    });
    
    it("doesn't throw an error if optional and throwErrors are both set to true", () => {
      const validator = new TestValidator({ optional: true, throwErrors: true });
      expect(() => validator["handleValueNotSet"](null)).not.toThrow();
    });
    
    it("throws an error if optional is false and throwErrors is true", () => {
      const validator = new TestValidator({ optional: false, throwErrors: true });
      const expectation = expect(() => validator["handleValueNotSet"](undefined));
      expectation.toThrow(TypeError);
      expectation.toThrow(`Value is required - undefined provided`);
    });
    
  });
  
  describe("handleResult", () => {
    
    it("returns result when invalid and throwErrors is set to false", () => {
      const validator = new TestValidator({ throwErrors: false });
      expect(validator["handleResult"]({ value: "test", valid: false, message: "test" })).toEqual({ value: "test", valid: false, message: "test" });
    });
    
    it("throws error when invalid and throwErrors is set to true", () => {
      const validator = new TestValidator({ throwErrors: true });
      const expectation = expect(() => validator["handleResult"]({ value: "test", valid: false, message: "test" }));
      expectation.toThrow(TypeError);
      expectation.toThrow("test");
    });
    
  });
  
  describe("getDefaultOptions", () => {
    
    it("returns correct default options", () => {
      const validator = new TestValidator();
      
      expect(validator["getDefaultOptions"]()).toEqual({
        optional: false,
        throwErrors: false
      });
    });
    
  });
  
});
