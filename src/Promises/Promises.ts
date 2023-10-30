import { PromiseMap } from "./Type/PromiseMap";
import { ResolvedPromiseMap } from "./Type/ResolvedPromiseMap";

export class Promises
{
  public static async all<Promises extends PromiseMap>(promises: Promises): Promise<ResolvedPromiseMap<Promises>>
  {
    if (
      !promises
      || typeof promises !== "object"
      || Array.isArray(promises)
    )
    {
      throw new TypeError(`Cannot resolve promises. Input must be of type "object"`);
    }
    
    if (Object.values(promises).some(promise => !(promise instanceof Promise)))
    {
      throw new TypeError(`Cannot resolve promises. Input must be of type "object" with all values being of type "Promise"`);
    }
    
    return Object.fromEntries(
      await Promise.all(
        Object
          .entries(promises)
          .map(async ([key, promise]) => [key, await promise])
      )
    );
  }
}
