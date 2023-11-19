import { SchemaValidator } from "./SchemaValidator";
import { Validators } from "../../Validators";

describe("SchemaValidator", () => {
  
  describe("validate", () => {
    
    it("returns the correct response when validating a valid object value against a schema definition", () => {
      const schema = {
        test: Validators.string(),
        test2: Validators.number(),
        test3: Validators.boolean()
      };
      
      const validator = new SchemaValidator(schema);
      const testValue = { test: "test", test2: 123, test3: true };
      const { value: validatorValue, valid, message } = validator.validate(testValue);
      expect(validatorValue).toBe(testValue);
      expect(valid).toBe(true);
      expect(message).toBeNull();
    })
    
    it("returns the correct response when given an invalid value", () => {
      const schema = {
        test: Validators.string(),
        test2: Validators.number(),
        test3: Validators.boolean()
      };
      
      const values = {
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
          message: "Value must be of type object - integer provided"
        },
        string: {
          value: "test",
          valid: false,
          message: "Value must be of type object - string provided"
        },
        boolean: {
          value: false,
          valid: false,
          message: "Value must be of type object - boolean provided"
        },
        array: {
          value: [],
          valid: false,
          message: "Value must be of type object - array provided"
        },
        function: {
          value: () => { console.log("test"); },
          valid: false,
          message: "Value must be of type object - function provided"
        },
        object: {
          value: {},
          valid: false,
          message: "test does not match schema definition. Value is required - undefined provided"
        },
        object2: {
          value: { test: "test", test2: "123", test3: "test" },
          valid: false,
          message: "test2 does not match schema definition. Value must be a number - string provided"
        },
        object3: {
          value: { test: "test", test2: 123 },
          valid: false,
          message: "test3 does not match schema definition. Value is required - undefined provided"
        }
      }
      
      for (const [key, { value, valid, message }] of Object.entries(values))
      {
        const validator = new SchemaValidator(schema);
        const { value: validatorValue, valid: isValid, message: validatorMessage } = validator.validate(value);
        expect(validatorValue).toBe(value);
        expect(isValid).toBe(valid);
        expect(validatorMessage).toBe(message);
      }
    })
    
    it("returns the correct response when given a null value (not optional)", () => {
      const schema = {
        test: Validators.string(),
        test2: Validators.number(),
        test3: Validators.boolean()
      };
      
      const values = {
        "null": null,
        "undefined": undefined
      };
      
      for (const [key, value] of Object.entries(values))
      {
        const validator = new SchemaValidator(schema, { optional: false });
        const { value: validatorValue, valid: isValid, message: validatorMessage } = validator.validate(value);
        expect(validatorValue).toBe(value);
        expect(isValid).toBe(false);
        expect(validatorMessage).toBe(`Value is required - ${key} provided`);
      }
    })
    
    it("returns the correct response when given a null value (optional)", () => {
      const schema = {
        test: Validators.string(),
        test2: Validators.number(),
        test3: Validators.boolean()
      };
      
      const values = {
        "null": null,
        "undefined": undefined
      };
      
      for (const [key, value] of Object.entries(values))
      {
        const validator = new SchemaValidator(schema, { optional: true });
        const { value: validatorValue, valid: isValid, message: validatorMessage } = validator.validate(value);
        expect(validatorValue).toBe(value);
        expect(isValid).toBe(true);
        expect(validatorMessage).toBeNull();
      }
    })
    
    it("throws an error when given an invalid value and throwErrors is true", () => {
      const schema = {
        test: Validators.string(),
        test2: Validators.number(),
        test3: Validators.boolean()
      };
      
      const values = {
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
          message: "Value must be of type object - integer provided"
        },
        string: {
          value: "test",
          valid: false,
          message: "Value must be of type object - string provided"
        },
        boolean: {
          value: false,
          valid: false,
          message: "Value must be of type object - boolean provided"
        },
        array: {
          value: [],
          valid: false,
          message: "Value must be of type object - array provided"
        },
        function: {
          value: () => { console.log("test"); },
          valid: false,
          message: "Value must be of type object - function provided"
        },
        object: {
          value: {},
          valid: false,
          message: "test does not match schema definition. Value is required - undefined provided"
        },
        object2: {
          value: { test: "test", test2: "123", test3: "test" },
          valid: false,
          message: "test2 does not match schema definition. Value must be a number - string provided"
        },
        object3: {
          value: { test: "test", test2: 123 },
          valid: false,
          message: "test3 does not match schema definition. Value is required - undefined provided"
        }
      }
      
      for (const [key, { value, valid, message }] of Object.entries(values))
      {
        const validator = new SchemaValidator(schema, { throwErrors: true });
        expect(() => validator.validate(value)).toThrow(message);
      }
    });
    
    it("returns the correct response when validating a valid object against a nested schema", () => {
        const schema = {
          test: Validators.string(),
          test2: Validators.number(),
          test3: Validators.boolean(),
          test4: Validators.schema({
            test: Validators.string(),
            test2: Validators.number(),
            test3: Validators.boolean()
          })
        };
        
        const testValue = {
          test: "test",
          test2: 123,
          test3: true,
          test4: {
            test: "test",
            test2: 123,
            test3: true
          }
        };
        
        const validator = new SchemaValidator(schema);
        const { value: validatorValue, valid, message } = validator.validate(testValue);
        expect(validatorValue).toBe(testValue);
        expect(valid).toBe(true);
        expect(message).toBeNull();
    });
    
    it("returns the correct response when validating an invalid object against a nested schema", () => {
      const schema = {
        test: Validators.string(),
        test2: Validators.number(),
        test3: Validators.boolean(),
        test4: Validators.schema({
          test: Validators.string(),
          test2: Validators.number(),
          test3: Validators.boolean()
        })
      };
      
      const testValue = {
        test: "test",
        test2: 123,
        test3: true,
        test4: {
          test: "test",
          test2: "123",
          test3: "true"
        }
      };
      
      const validator = new SchemaValidator(schema);
      const { value: validatorValue, valid, message } = validator.validate(testValue);
      expect(validatorValue).toBe(testValue);
      expect(valid).toBe(false);
      expect(message).toBe("test4 does not match schema definition. test2 does not match schema definition. Value must be a number - string provided");
    });
  
  });
  
});
