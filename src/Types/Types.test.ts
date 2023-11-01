import { Types } from "./Types";

describe("Types", () => {
  
  describe("isString", () => {
    
    it("returns true when input is a string and optional flag is false", () => {
      expect(Types.isString("test")).toBe(true);
    });
    
    it("returns false when input is a non-string and optional flag is false", () => {
      const nonStringValues = [ true, false, 1, [ 1, 2, 3 ], {}, () => {}, null, undefined ];
      
      for (const value of nonStringValues)
      {
        expect(Types.isString(value)).toBe(false);
      }
    });
    
    it("returns false when input is a non-string and optional flag is true", () => {
      const nonStringValues = [ true, false, 1, [ 1, 2, 3 ], {}, () => {} ];
      
      for (const value of nonStringValues)
      {
        expect(Types.isString(value, true)).toBe(false);
      }
    });
    
    it("returns true when input is null or undefined and optional flag is true", () => {
      expect(Types.isString(null, true)).toBe(true);
      expect(Types.isString(undefined, true)).toBe(true);
    });
    
    it("returns false when input is null or undefined and optional flag is false", () => {
      expect(Types.isString(null)).toBe(false);
      expect(Types.isString(undefined)).toBe(false);
    });
    
  });
  
  describe("isBoolean", () => {
    
    it("returns true when input is a boolean and optional flag is false", () => {
      expect(Types.isBoolean(true)).toBe(true);
      expect(Types.isBoolean(false)).toBe(true);
    });
    
    it("returns false when input is a non-boolean and optional flag is false", () => {
      const nonBooleanValues = [ "string", 1, [ 1, 2, 3 ], {}, () => {}, null, undefined ];
      
      for (const value of nonBooleanValues)
      {
        expect(Types.isBoolean(value)).toBe(false);
      }
    });
    
    it("returns false when input is a non-boolean and optional flag is true", () => {
      const nonBooleanValues = [ "string", 1, [ 1, 2, 3 ], {}, () => {} ];
      
      for (const value of nonBooleanValues)
      {
        expect(Types.isBoolean(value, true)).toBe(false);
      }
    });
    
    it("returns true when input is null or undefined and optional flag is true", () => {
      expect(Types.isBoolean(null, true)).toBe(true);
      expect(Types.isBoolean(undefined, true)).toBe(true);
    });
    
    it("returns false when input is null or undefined and optional flag is false", () => {
      expect(Types.isBoolean(null)).toBe(false);
      expect(Types.isBoolean(undefined)).toBe(false);
    });
    
  });
  
  describe("isNumber", () => {
    
    it("returns true when input is a number and optional flag is false", () => {
      expect(Types.isNumber(0)).toBe(true);
      expect(Types.isNumber(1)).toBe(true);
    });
    
    it("returns false when input is a non-number and optional flag is false", () => {
      const nonNumberValues = [ true, false, "string", [ 1, 2, 3 ], {}, () => {}, null, undefined ];
      
      for (const value of nonNumberValues)
      {
        expect(Types.isNumber(value)).toBe(false);
      }
    });
    
    it("returns false when input is a non-number and optional flag is true", () => {
      const nonNumberValues = [ true, false, "test", [ 1, 2, 3 ], {}, () => {} ];
      
      for (const value of nonNumberValues)
      {
        expect(Types.isNumber(value, true)).toBe(false);
      }
    });
    
    it("returns true when input is null or undefined and optional flag is true", () => {
      expect(Types.isNumber(null, true)).toBe(true);
      expect(Types.isNumber(undefined, true)).toBe(true);
    });
    
    it("returns false when input is null or undefined and optional flag is false", () => {
      expect(Types.isNumber(null)).toBe(false);
      expect(Types.isNumber(undefined)).toBe(false);
    });
    
  });
  
  describe("isArray", () => {
    
    it("returns true when input is an array and optional flag is false", () => {
      expect(Types.isArray([])).toBe(true);
    });
    
    it("returns false when input is a non-array and optional flag is false", () => {
      const nonArrayValues = [ true, false, 1, "test", {}, () => {}, null, undefined ];
      
      for (const value of nonArrayValues)
      {
        expect(Types.isArray(value)).toBe(false);
      }
    });
    
    it("returns false when input is a non-array optional flag is true", () => {
      const nonArrayValues = [ true, false, 1, "test", {}, () => {} ];
      
      for (const value of nonArrayValues)
      {
        expect(Types.isArray(value, true)).toBe(false);
      }
    });
    
    it("returns true when input is null or undefined and optional flag is true", () => {
      expect(Types.isArray(null, true)).toBe(true);
      expect(Types.isArray(undefined, true)).toBe(true);
    });
    
    it("returns false when input is null or undefined and optional flag is false", () => {
      expect(Types.isArray(null)).toBe(false);
      expect(Types.isArray(undefined)).toBe(false);
    });
    
  });
  
  describe("isObject", () => {
    
    it("returns true when input is an object and optional flag is false", () => {
      expect(Types.isObject({})).toBe(true);
      class TestClass {}
      expect(Types.isObject(new TestClass())).toBe(true);
    });
    
    it("returns false when input is a non-object and optional flag is false", () => {
      const nonObjectValues = [ true, false, 1, "test", [], () => {}, null, undefined ];
      
      for (const value of nonObjectValues)
      {
        expect(Types.isObject(value)).toBe(false);
      }
    });
    
    it("returns false when input is a non-object and optional flag is true", () => {
      const nonObjectValues = [ true, false, 1, "test", [], () => {} ];
      
      for (const value of nonObjectValues)
      {
        expect(Types.isObject(value, true)).toBe(false);
      }
    });
    
    it("returns true when input is null or undefined and optional flag is true", () => {
      expect(Types.isObject(null, true)).toBe(true);
      expect(Types.isObject(undefined, true)).toBe(true);
    });
    
    it("returns false when input is null or undefined and optional flag is false", () => {
      expect(Types.isObject(null)).toBe(false);
      expect(Types.isObject(undefined)).toBe(false);
    });
    
  });
  
  describe("isFunction", () => {
    
    it("returns true when input is a function and optional flag is false", () => {
      expect(Types.isFunction(() => {})).toBe(true);
    });
    
    it("returns false when input is a non-function and optional flag is false", () => {
      const nonFunctionValues = [ true, false, 1, "test", [], {}, true, null, undefined ];
      
      for (const value of nonFunctionValues)
      {
        expect(Types.isFunction(value)).toBe(false);
      }
    });
    
    it("returns false when input is a non-function and optional flag is true", () => {
      const nonFunctionValues = [ true, false, 1, "test", [], {} ];
      
      for (const value of nonFunctionValues)
      {
        expect(Types.isFunction(value, true)).toBe(false);
      }
    });
    
    it("returns true when input is null or undefined and optional flag is true", () => {
      expect(Types.isFunction(null, true)).toBe(true);
      expect(Types.isFunction(undefined, true)).toBe(true);
    });
    
    it("returns false when input is null or undefined and optional flag is false", () => {
      expect(Types.isFunction(null)).toBe(false);
      expect(Types.isFunction(undefined)).toBe(false);
    });
    
  });
  
  describe("isEnum", () => {
    
    it("returns true when value is an object with string keys and string values and optional flag is false", () => {
      const objEnum = {
        KEY1: "value1",
        KEY2: "value2"
      };
      expect(Types.isEnum(objEnum)).toBe(true);
      
      enum ExampleEnum
      {
        KEY1 = "value1",
        KEY2 = "value2"
      }
      
      expect(Types.isEnum(ExampleEnum)).toBe(true);
    });
    
    it("returns true when value is an object with string keys and number values and optional flag is false", () => {
      const objEnum = {
        KEY1: 1,
        KEY2: 2
      };
      expect(Types.isEnum(objEnum)).toBe(true);
      
      enum ExampleEnum
      {
        KEY1 = 1,
        KEY2 = 2
      }
      
      expect(Types.isEnum(ExampleEnum)).toBe(true);
    });
    
    it("returns true when value is an object with string keys and a mix of string/number values and optional flag is false", () => {
      const objEnum = {
        KEY1: "1",
        KEY2: 2
      };
      expect(Types.isEnum(objEnum)).toBe(true);
      
      enum ExampleEnum
      {
        KEY1 = "1",
        KEY2 = 2
      }
      
      expect(Types.isEnum(ExampleEnum)).toBe(true);
    });
    
    it("returns false when value is an object with values that aren't strings or numbers and optional flag is false", () => {
      const objEnum = {
        KEY1: true,
        KEY2: 2
      };
      expect(Types.isEnum(objEnum)).toBe(false);
    });
    
    it("returns true when the input is an empty object or enum and optional flag is false", () => {
      expect(Types.isEnum({})).toBe(true);
      
      enum ExampleEnum {}
      
      expect(Types.isEnum(ExampleEnum)).toBe(true);
    });
    
    it("returns false when the input is not an object or enum and optional flag is false", () => {
      const nonEnumTypes = [ true, false, 1, "test", [], () => {}, null, undefined ];
      
      for (const nonEnumType of nonEnumTypes)
      {
        expect(Types.isEnum(nonEnumType as any)).toBe(false);
      }
    });
    
    it("returns false when the input is not an object or enum and optional flag is true", () => {
      const nonEnumTypes = [ true, false, 1, "test", [], () => {} ];
      
      for (const nonEnumType of nonEnumTypes)
      {
        expect(Types.isEnum(nonEnumType as any, true)).toBe(false);
      }
    });
    
    it("returns true when the input is null or undefined and optional flag is true", () => {
      expect(Types.isEnum(null, true)).toBe(true);
      expect(Types.isEnum(undefined, true)).toBe(true);
    });
    
  });
  
  describe("isEnumValue", () => {
    
    it("returns true if value exists in the enum and optional flag is false", () => {
      const objEnum = {
        KEY1: "value1",
        KEY2: "value2"
      };
      expect(Types.isEnumValue("value1", objEnum)).toBe(true);
    });
    
    it("returns false if value doesn't exist in the enum and optional flag is false", () => {
      const objEnum = {
        KEY1: "value1",
        KEY2: "value2"
      };
      expect(Types.isEnumValue("value3", objEnum)).toBe(false);
    });
    
    it("throws error if enumeration is not an enum", () => {
      const nonEnumTypes = [ 1, "test", [], () => {
      }, null, undefined ];
      
      for (const nonEnumType of nonEnumTypes)
      {
        expect(() => {
          Types.isEnumValue("value1", nonEnumType as any);
        }).toThrow(TypeError);
      }
    });
    
    it("returns true when the input is null or undefined and optional flag is true", () => {
      enum ExampleEnum
      {
        KEY1 = "value1",
        KEY2 = "value2"
      }
      expect(Types.isEnumValue(null, ExampleEnum, true)).toBe(true);
      expect(Types.isEnumValue(undefined, ExampleEnum, true)).toBe(true);
    });
    
  });
  
  describe("isNull", () => {
    
    it("returns true when input is null", () => {
      expect(Types.isNull(null)).toBe(true);
    });
    
    it("returns false when input is not null", () => {
      const nonNullValues = [ true, false, 1, "test", [], {}, () => {}, undefined ];
      
      for (const value of nonNullValues)
      {
        expect(Types.isNull(value)).toBe(false);
      }
    });
    
  });
  
  describe("isUndefined", () => {
    
    it("returns true when input is undefined", () => {
      expect(Types.isUndefined(undefined)).toBe(true);
    });
    
    it("returns false when input is not undefined", () => {
      const nonUndefinedValues = [ true, false, 1, "test", [], {}, () => {}, null ];
      
      for (const value of nonUndefinedValues)
      {
        expect(Types.isUndefined(value)).toBe(false);
      }
    });
    
  });
  
  describe("isSet", () => {
    
    it("returns true when input is null", () => {
      expect(Types.isSet(null)).toBe(false);
    });
    
    it("returns true when input is undefined", () => {
      expect(Types.isSet(undefined)).toBe(false);
    });
    
    it("returns true when input is not undefined or null", () => {
      const nonSetValues = [ true, false, 1, "test", [], {}, () => {} ];
      
      for (const value of nonSetValues)
      {
        expect(Types.isSet(value)).toBe(true);
      }
    });
    
  });
  
});
