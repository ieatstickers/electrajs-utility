import { Objects } from "./Objects";
import { HydrateModeEnum } from "./Enum/HydrateModeEnum";

describe("Objects", () => {
  
  describe("clone", () => {
    
    it("clones an object (breaking reference)", () => {
      const source = { foo: "bar", bar: "foo", test: 123 };
      const clone = Objects.clone(source);
      expect(clone).toEqual(source);
      expect(clone).not.toBe(source);
    });
    
    it("clones a class instance (breaking reference)", () => {
      class TestClass
      {
        public foo: string = "bar";
        public bar: string = "foo";
        public test: number = 123;
      }
      
      const source = new TestClass();
      const clone = Objects.clone(source);
      expect(clone).toEqual(source);
      expect(clone).not.toBe(source);
      expect(clone instanceof TestClass).toBe(true);
    });
    
    it("clones nested objects (breaking references)", () => {
      const source = { foo: "bar", bar: { test: 123, foo: { anotherTest: "something" } } };
      const clone = Objects.clone(source);
      // Main object is cloned
      expect(clone).toEqual(source);
      expect(clone).not.toBe(source);
      // Nested object is cloned
      expect(clone.bar).toEqual(source.bar);
      expect(clone.bar).not.toBe(source.bar);
      // Deep nested object is cloned
      expect(clone.bar.foo).toEqual(source.bar.foo);
      expect(clone.bar.foo).not.toBe(source.bar.foo);
    });
    
    it("throws an error if the source object is not an object", () => {
      const nonObjectValues = [ 1, "a", [ 1, 2, 3 ], () => {
      }, null, undefined ];
      
      for (const value of nonObjectValues)
      {
        expect(() => {
          Objects.clone(value as any);
        }).toThrow(TypeError);
      }
    });
    
  });
  
  describe("hydrate", () => {
    
    it("hydrates object properties (SOURCE_PROPERTIES MODE)", () => {
      const dest = { foo: "bar", bar: "foo" };
      const source = { bar: "baz", test: 123, arr: [ 1, 2, 3 ], testFunc: () => {} };
      const result = Objects.hydrate(
        dest,
        source,
        {
          mode: HydrateModeEnum.SOURCE_PROPERTIES
        }
      );
      expect(result).toEqual({ foo: "bar", bar: "baz", test: 123, arr: [ 1, 2, 3 ] });
      expect(result).toBe(dest);
    });
    
    it("hydrates object properties (DEST_PROPERTIES MODE)", () => {
      const dest = { foo: "bar", bar: "foo" };
      const source = { bar: "baz", test: 123 };
      const result = Objects.hydrate(dest, source, { mode: HydrateModeEnum.DEST_PROPERTIES });
      expect(result).toEqual({ foo: "bar", bar: "baz" });
      expect(result).toBe(dest);
    });
    
    it("hydrates object methods/functions", () => {
      const dest = {
        foo:           "bar",
        bar:           "foo",
        exampleMethod: () => {
        }
      };
      const source = {
        bar:                 "baz",
        test:                123,
        exampleMethod:       () => {
          console.log("exampleMethod");
        },
        secondExampleMethod: () => {
        }
      };
      const result = Objects.hydrate(dest, source, { mode: HydrateModeEnum.SOURCE_PROPERTIES, includeMethods: true });
      expect(result.bar).toBe(source.bar);
      expect(result.test).toBe(source.test);
      expect(result.exampleMethod).toBe(source.exampleMethod);
      expect(result.secondExampleMethod).toBe(source.secondExampleMethod);
      expect(result).toBe(dest);
    });
    
    it("hydrates object null values", () => {
      const dest = { foo: "bar", bar: "foo" };
      const source = { bar: null, test: 123, anotherTest: undefined };
      const result = Objects.hydrate(dest, source, { mode: HydrateModeEnum.SOURCE_PROPERTIES });
      expect(result).toEqual({ foo: "bar", bar: null, test: 123, anotherTest: undefined });
      expect(result).toBe(dest);
    });
    
    it("hydrates object properties using mutators", () => {
      const dest = { foo: "bar", bar: "foo" };
      const source = { bar: "baz", test: 123 };
      const result = Objects.hydrate(dest, source, {
        mode:     HydrateModeEnum.SOURCE_PROPERTIES,
        mutators: {
          bar:                 (value: string) => value.toUpperCase(),
          thisShouldBeIgnored: (value: string) => value.toLowerCase()
        }
      });
      expect(result).toEqual({ foo: "bar", bar: "BAZ", test: 123 });
      expect(result).toBe(dest);
    });
    
    it("throws an error if mutator is not a function", () => {
      const dest = { foo: "bar", bar: "foo" };
      const source = { bar: "baz", test: 123 };
      expect(() => {
        Objects.hydrate(dest, source, {
          mode:     HydrateModeEnum.SOURCE_PROPERTIES,
          mutators: {
            bar: "not a function" as any
          }
        });
      }).toThrow(Error);
    });
    
    it("throws an error if the source object is not an object", () => {
      const nonObjectValues = [ 1, "a", [ 1, 2, 3 ], () => {
      }, null, undefined ];
      
      for (const value of nonObjectValues)
      {
        expect(() => {
          Objects.hydrate({}, value as any);
        }).toThrow(TypeError);
      }
    });
    
    it("throws an error if the dest object is not an object", () => {
      const nonObjectValues = [ 1, "a", [ 1, 2, 3 ], () => {
      }, null, undefined ];
      
      for (const value of nonObjectValues)
      {
        expect(() => {
          Objects.hydrate(value as any, {});
        }).toThrow(TypeError);
      }
    });
    
    it("throws an error if the options object is not an object or null", () => {
      const nonObjectValues = [ 1, "a", [ 1, 2, 3 ], () => {
      } ];
      
      for (const value of nonObjectValues)
      {
        expect(() => {
          Objects.hydrate({}, {}, value as any);
        }).toThrow(TypeError);
      }
    });
    
  });
  
  describe("getByKeyPath", () => {
    
    it("retrieves an existing path", () => {
      const obj = { foo: { bar: { baz: "test" } } };
      const result = Objects.getByKeyPath([ "foo", "bar", "baz" ], obj);
      expect(result).toEqual("test");
    });
    
    it("returns undefined for a non-existing path", () => {
      const obj = { foo: { bar: { baz: "test" } } };
      const result = Objects.getByKeyPath([ "foo", "bar", "nonExisting" ], obj);
      expect(result).toBeUndefined();
    });
    
    it("returns default value for a non-existing path", () => {
      const obj = { foo: { bar: { baz: "test" } } };
      const result = Objects.getByKeyPath([ "foo", "bar", "nonExisting" ], obj, "default");
      expect(result).toEqual("default");
    });
    
    it("retrieves value from an array using a numeric key", () => {
      const obj = { foo: { bar: { baz: [ 1, 2, 3 ] } } };
      const result = Objects.getByKeyPath([ "foo", "bar", "baz", 1 ], obj);
      expect(result).toEqual(2);
    });
    
    it("throws an error when the keyPath is not valid", () => {
      const invalidKeyPaths = [ [], null, undefined, "test", 123, {} ];
      
      for (const keyPath of invalidKeyPaths)
      {
        expect(() => {
          Objects.getByKeyPath(keyPath as any, {});
        }).toThrow(TypeError);
      }
    });
    
  });
  
  describe("setByKeyPath", () => {
    
    it("sets a value at an existing path", () => {
      const obj = { foo: { bar: { baz: "test" } } };
      const result = Objects.setByKeyPath([ "foo", "bar", "baz" ], "new value", obj);
      expect(result).toEqual({ foo: { bar: { baz: "new value" } } });
    });
    
    it("sets a value at a non-existing path", () => {
      const obj = { foo: { bar: { baz: "test" } } };
      const result = Objects.setByKeyPath([ "foo", "bar", "nonExisting", "anotherNonExisting" ], "new value", obj);
      expect(result).toEqual({ foo: { bar: { baz: "test", nonExisting: { anotherNonExisting: "new value" } } } });
    });
    
    it("sets a value at an array index", () => {
      const obj = { foo: { bar: { baz: [ 1, 2, 3 ] } } };
      const result = Objects.setByKeyPath([ "foo", "bar", "baz", 1 ], "new value", obj);
      expect(result).toEqual({ foo: { bar: { baz: [ 1, "new value", 3 ] } } });
    });
    
    it("throws an error when the keyPath is not valid", () => {
      const invalidKeyPaths = [ [], null, undefined, "test", 123, {} ];
      
      for (const keyPath of invalidKeyPaths)
      {
        expect(() => {
          Objects.setByKeyPath(keyPath as any, {}, {});
        }).toThrow(TypeError);
      }
    });
    
  });
  
  describe("merge", () => {
  
    it("correctly deep merges an object", () => {
      const deepNestedObj = { deepKey: "deepValue" };
      const obj1 = { foo: "bar", bar: "foo", test: 123, obj: { someKey: "someValue", deepNestedObj: deepNestedObj } };
      const obj2 = { bar: "baz", test: 456, arr: [ 1, 2, 3 ], obj: { someKey: "someOtherValue" } };
      const obj3 = { third: true };
      
      const merged = Objects.merge(
        obj1,
        obj2,
        obj3
      );
      
      expect(merged).toEqual({
        foo: "bar",
        bar: "baz",
        test: 456,
        arr: [ 1, 2, 3 ],
        obj: {
          someKey: "someOtherValue",
          deepNestedObj: {
            deepKey: "deepValue"
          }
        },
        third: true
      });
      expect(merged).not.toBe(obj1);
      expect(merged).not.toBe(obj2);
      expect(merged.obj.deepNestedObj.deepKey).not.toBe(deepNestedObj);
      
    });
    
  });
  
});
