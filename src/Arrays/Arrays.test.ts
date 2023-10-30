import { Arrays } from "./Arrays";
import { Numbers } from "../Numbers/Numbers";

describe("Arrays", () => {
  
  describe("clone", () => {
    
    it("clones an array of numbers", () => {
      const arr = [ 1, 2, 3 ];
      const result = Arrays.clone(arr);
      // Arrays are equal
      expect(result).toEqual(arr);
      // Arrays don't have the same reference
      expect(result).not.toBe(arr);
    });
    
    it("clones an array of strings", () => {
      const arr = [ "a", "b", "c" ];
      const result = Arrays.clone(arr);
      // Arrays are equal
      expect(result).toEqual(arr);
      // Arrays don't have the same reference
      expect(result).not.toBe(arr);
    });
    
    it("clones an array of arrays (breaking references)", () => {
      const arr = [ [ 1, 2, 3 ], [ 4, 5, 6 ] ];
      const result = Arrays.clone(arr);
      // Main array is equal
      expect(result).toEqual(arr);
      // Main array doesn't have the same reference
      expect(result).not.toBe(arr);
      // First array is equal
      expect(result[0]).toEqual(arr[0]);
      // First array doesn't have the same reference
      expect(result[0]).not.toBe(arr[0]);
      // Second array is equal
      expect(result[1]).toEqual(arr[1]);
      // Second array doesn't have the same reference
      expect(result[1]).not.toBe(arr[1]);
    });
    
    it("clones an array of objects (breaking references)", () => {
      const arr = [ { a: 1, b: 2 }, { c: 3, d: 4 } ];
      const result = Arrays.clone(arr);
      // Main array is equal
      expect(result).toEqual(arr);
      // Main array doesn't have the same reference
      expect(result).not.toBe(arr);
      // First object is equal
      expect(result[0]).toEqual(arr[0]);
      // First object doesn't have the same reference
      expect(result[0]).not.toBe(arr[0]);
      // Second object is equal
      expect(result[1]).toEqual(arr[1]);
      // Second object doesn't have the same reference
      expect(result[1]).not.toBe(arr[1]);
    });
    
    it("clones an array of mixed types (breaking any references)", () => {
      const arr = [ 1, "a", [ 2, "b" ], { c: 3, d: "d" } ];
      const result = Arrays.clone(arr);
      // Main array is equal
      expect(result).toEqual(arr);
      // Main array doesn't have the same reference
      expect(result).not.toBe(arr);
      // First item is equal (number)
      expect(result[0]).toEqual(arr[0]);
      // Second item is equal (string)
      expect(result[1]).toEqual(arr[1]);
      // Third item is equal (array)
      expect(result[2]).toEqual(arr[2]);
      // Third item doesn't have the same reference (array)
      expect(result[2]).not.toBe(arr[2]);
      // Fourth item is equal (object)
      expect(result[3]).toEqual(arr[3]);
      // Fourth item doesn't have the same reference (object)
      expect(result[3]).not.toBe(arr[3]);
    });
    
    it("clones an array of functions", () => {
      const arr = [ () => {
      }, () => {
      } ];
      const result = Arrays.clone(arr);
      // Main array is equal
      expect(result).toEqual(arr);
      // Main array doesn't have the same reference
      expect(result).not.toBe(arr);
      // First item is equal (function)
      expect(result[0]).toEqual(arr[0]);
      // Second item is equal (function)
      expect(result[1]).toEqual(arr[1]);
    });
    
    it("clones an empty array", () => {
      const arr = [];
      const result = Arrays.clone(arr);
      // Arrays are equal
      expect(result).toEqual(arr);
      // Arrays don't have the same reference
      expect(result).not.toBe(arr);
    });
    
    it("throws an error when input is undefined", () => {
      expect(() => {
        Arrays.clone(undefined);
      }).toThrow(TypeError);
    });
    
    it("throws an error when input is null", () => {
      expect(() => {
        Arrays.clone(null);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("randomItem", () => {
    
    it("returns a random item from an array", () => {
      const arr = [ 1, 2, 3 ];
      jest.spyOn(Numbers, "random").mockReturnValue(1);
      const result = Arrays.randomItem(arr);
      expect(result).toEqual(2);
    });
    
    it("returns the first item from an array", () => {
      const arr = [ 4, 5, 6 ];
      jest.spyOn(Numbers, "random").mockReturnValue(0);
      const result = Arrays.randomItem(arr);
      expect(result).toEqual(4);
    });
    
    it("returns the last item from an array", () => {
      const arr = [ 7, 8, 9 ];
      jest.spyOn(Numbers, "random").mockReturnValue(2);
      const result = Arrays.randomItem(arr);
      expect(result).toEqual(9);
    });
    
    it("throws an error when input is undefined", () => {
      expect(() => {
        Arrays.randomItem(undefined);
      }).toThrow(TypeError);
    });
    
    it("throws an error when input is null", () => {
      expect(() => {
        Arrays.randomItem(null);
      }).toThrow(TypeError);
    });
    
    it("throws an error when input is an empty array", () => {
      expect(() => {
        Arrays.randomItem([]);
      }).toThrow(Error);
    });
    
  });
  
});
