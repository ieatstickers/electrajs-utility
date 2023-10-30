import { Numbers } from "./Numbers";

describe("Numbers", () => {
  
  describe("random", () => {
    
    it("returns a number within the given range", () => {
      for (let i = 0; i < 1000; i++)
      {
        const randomNum = Numbers.random(50, 100);
        expect(randomNum).toBeGreaterThanOrEqual(50);
        expect(randomNum).toBeLessThanOrEqual(100);
      }
    });
    
    it("returns the correct number when min and max are equal", () => {
      const randomNum = Numbers.random(50, 50);
      expect(randomNum).toEqual(50);
    });
    
    it("handles negative numbers", () => {
      for (let i = 0; i < 1000; i++)
      {
        const randomNum = Numbers.random(-100, -50);
        expect(randomNum).toBeGreaterThanOrEqual(-100);
        expect(randomNum).toBeLessThanOrEqual(-50);
      }
    });
    
    it("handles negative and positive numbers", () => {
      for (let i = 0; i < 1000; i++)
      {
        const randomNum = Numbers.random(-50, 50);
        expect(randomNum).toBeGreaterThanOrEqual(-50);
        expect(randomNum).toBeLessThanOrEqual(50);
      }
    });
    
    it("throws an error when min is greater than max", () => {
      expect(() => {
        Numbers.random(100, 50);
      }).toThrow(Error);
    });
    
  });
  
});
