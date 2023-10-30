import { Promises } from "./Promises";

describe("Promises", () => {
  
  describe("all", () => {
    
    it("resolves an object of promises", async () => {
      const promises = {
        first:  Promise.resolve(1),
        second: Promise.resolve("two"),
        third:  Promise.resolve(true)
      };
      
      const result = await Promises.all(promises);
      expect(result).toEqual({ first: 1, second: "two", third: true });
    });
    
    it("handles a mix of resolved and unresolved promises", async () => {
      const promises = {
        immediate: Promise.resolve(10),
        delayed:   new Promise((resolve) => setTimeout(() => resolve(20), 50)),
        string:    Promise.resolve("hello")
      };
      
      const result = await Promises.all(promises);
      expect(result).toEqual({ immediate: 10, delayed: 20, string: "hello" });
    });
    
    it("handles rejected promises", async () => {
      const promises = {
        valid:   Promise.resolve(123),
        invalid: Promise.reject(new Error("Failure"))
      };
      
      await expect(Promises.all(promises))
        .rejects
        .toThrow("Failure");
    });
    
    it("handles an empty object", async () => {
      const promises = {};
      const result = await Promises.all(promises);
      expect(result).toEqual({});
    });
    
    it("throws an error when input is not an object", async () => {
      const nonObjectValues = [ 1, "a", [ 1, 2, 3 ], () => {
      }, null, undefined ];
      
      for (const value of nonObjectValues)
      {
        await expect(Promises.all(value as any)).rejects.toThrow(TypeError);
      }
    });
    
    it("throws an error when input contains non-promises", async () => {
      const nonPromiseValues = [ 1, "a", [ 1, 2, 3 ], () => {
      }, null, undefined ];
      
      for (const value of nonPromiseValues)
      {
        await expect(Promises.all({ test: value as any })).rejects.toThrow(TypeError);
      }
    });
    
  });
  
});
