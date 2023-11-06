import { Strings } from "./Strings";

describe("Strings", () => {
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  describe("initialCaps", () => {
    
    it("capitalizes the first letter of each word in a sentence", () => {
      const input = "hello world";
      const output = Strings.initialCaps(input);
      expect(output).toBe("Hello World");
    });
    
    it("capitalizes a single word", () => {
      const input = "hello";
      const output = Strings.initialCaps(input);
      expect(output).toBe("Hello");
    });
    
    it("returns an empty string when input is empty", () => {
      const output = Strings.initialCaps("");
      expect(output).toBe("");
    });
    
    it("handles strings with additional spaces correctly", () => {
      const input = " hello  world ";
      const output = Strings.initialCaps(input);
      expect(output).toBe(" Hello  World ");
    });
    
    it("handles non-alpha characters without modification", () => {
      const input = "hello, world! !";
      const output = Strings.initialCaps(input);
      expect(output).toBe("Hello, World! !");
    });
    
    it("properly capitalizes strings already in uppercase or lowercase", () => {
      const inputLowercase = "hello world";
      const inputUppercase = "HELLO WORLD";
      const outputLowercase = Strings.initialCaps(inputLowercase);
      const outputUppercase = Strings.initialCaps(inputUppercase);
      expect(outputLowercase).toBe("Hello World");
      expect(outputUppercase).toBe("HELLO WORLD");
    });
    
    it("throws an error when input is not a string", () => {
      const nonStringValues = [ 1, [ 1, 2, 3 ], () => {}, true, { test: "test" }, null, undefined ];
      
      for (const value of nonStringValues)
      {
        expect(() => {
          Strings.initialCaps(value as any);
        }).toThrow(TypeError);
      }
    });
    
  });
  
  describe("random", () => {
    
    it("generates a string of specified length", () => {
      const length = 15;
      const randomString = Strings.random(length);
      expect(randomString).toHaveLength(length);
    });
    
    it("defaults to a length of 10 when no length is provided", () => {
      const defaultLength = 10;
      const randomString = Strings.random();
      expect(randomString).toHaveLength(defaultLength);
    });
    
    it("does not generate a blacklisted string", () => {
      const blacklistedStrings = [ "abcde", "defgh" ];
      const randomString = Strings.random(5, blacklistedStrings);
      expect(blacklistedStrings).not.toContain(randomString);
    });
    
    it("throws an error after X attempts to generate a non-blacklisted string", () => {
      jest.spyOn(Strings, "generateRandomString" as any).mockReturnValue("abcde");
      const blacklistedStrings = [ "abcde", "defgh" ];
      expect(() => {
        Strings.random(5, blacklistedStrings);
      }).toThrow(Error);
    });
  });
});
