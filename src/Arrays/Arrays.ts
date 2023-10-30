import { Numbers } from "../Numbers/Numbers";
import { Objects } from "../Objects/Objects";

export class Arrays
{
  public static clone<T>(arr: Array<T>): Array<T>
  {
    if (!Array.isArray(arr)) throw new TypeError(`Input type "${typeof arr}" passed to Arrays.clone()`);
    return arr.map((item) => {
      if (Array.isArray(item)) return this.clone(item) as T;
      else if (typeof item === "object") return Objects.clone(item) as T;
      else return item as T;
    })
  }
  
  public static randomItem<T>(arr: Array<T>): T
  {
    if (!Array.isArray(arr)) throw new TypeError(`Input type "${typeof arr}" passed to Arrays.randomItem()`);
    if (arr.length === 0) throw new Error("Cannot get random item from empty array");
    return arr[Numbers.random(0, arr.length - 1)];
  }
}
