import { HydrateModeEnum } from "./Enum/HydrateModeEnum";
import { Arrays } from "../Arrays/Arrays";
import { HydrateOptions } from "./Type/HydrateOptions";
import { MergeResult } from "./Type/MergeResult";

export class Objects
{
  public static merge<T extends object[]>(...objects: T): MergeResult<T>
  {
    return objects.reduce((acc, source) => {
      
      for (const key in source)
      {
        const sourceValue = source[key];
        
        if (Array.isArray(sourceValue))
        {
          acc[key] = Arrays.clone(sourceValue);
        }
        else if (typeof sourceValue === "object" && sourceValue !== null)
        {
          acc[key] = this.merge(acc[key] || {}, Objects.clone(sourceValue));
        }
        else
        {
          acc[key] = sourceValue;
        }
      }
      
      return acc;
    }, {} as any);
  }
  
  public static clone<T extends Record<string | number, any>>(obj: T): T
  {
    if(!obj || typeof obj !== 'object' || Array.isArray(obj))
    {
      throw new TypeError("Cannot clone object. Source object must be of type 'object'.");
    }
    
    return this.hydrate(
      Object.create(obj),
      obj,
      {
        mode: HydrateModeEnum.SOURCE_PROPERTIES,
        includeNullValues: true,
        includeMethods: true
      }
    );
  }
  
  public static hydrate<Dest extends Object, Src extends Object, Options extends HydrateOptions<Dest, Src>>(
    dest: Dest,
    source: Src,
    options?: Options
  ): Options extends { mode: HydrateModeEnum.DEST_PROPERTIES } ? Dest : Src & Dest
  {
    if (options && (typeof options !== "object" || Array.isArray(options)))
    {
      throw new TypeError(`Cannot hydrate object. Options must be of type "object"`);
    }
    
    options = Object.assign(
      {
        mode: HydrateModeEnum.DEST_PROPERTIES,
        mutators: {},
        includeNullValues: true,
        includeMethods: false
      },
      options || {}
    ) as Options;
    
    if (
      !source
      || !dest
      || typeof dest !== "object"
      || typeof source !== "object"
      || Array.isArray(dest)
      || Array.isArray(source)
    )
    {
      throw new TypeError(`Cannot hydrate object. Source and destination object must both be of type "object"`);
    }
    
    const properties = options.mode === HydrateModeEnum.SOURCE_PROPERTIES
      ? Object.keys(source)
      : Object.keys(dest);
    
    for (const property of properties)
    {
      if (!source.hasOwnProperty(property)) continue;
      const sourceValue = source[property];
      if (options.includeMethods === false && typeof sourceValue === "function") continue;
      if (options.mutators[property])
      {
        if (typeof options.mutators[property] !== "function")
        {
          throw new Error(`Cannot hydrate object. Mutator for property "${property}" is not a function`);
        }
        
        dest[property] = options.mutators[property](sourceValue);
      }
      else if (options.includeNullValues === true && sourceValue == null)
      {
        dest[property] = sourceValue;
      }
      else if (Array.isArray(sourceValue))
      {
        dest[property] = Arrays.clone(sourceValue);
      }
      else if (typeof sourceValue === "object")
      {
        dest[property] = this.clone(sourceValue);
      }
      else
      {
        dest[property] = sourceValue;
      }
    }
    
    return dest as Src & Dest;
  }
  
  public static getByKeyPath(
    keyPath: Array<string | number>,
    obj: { [key: string | number]: any },
    defaultValue?: any
  ): any
  {
    if (!Array.isArray(keyPath) || keyPath.length === 0)
    {
      throw new TypeError("Invalid key path. Must be an array of strings and/or numbers.");
    }
    
    const keys = keyPath.slice();
    let current = obj;
    
    while (keys.length > 0)
    {
      const key = keys.shift();
      
      if (current && typeof current === "object" && current.hasOwnProperty(key))
      {
        current = current[key];
      }
      else
      {
        return defaultValue;
      }
    }
    
    return current;
  }

  public static setByKeyPath(keyPath: Array<string | number>, value: any, obj: Object): Object
  {
    if (!Array.isArray(keyPath) || keyPath.length === 0)
    {
      throw new TypeError("Invalid key path. Must be an array of strings and/or numbers.");
    }
    
    const keys = keyPath.slice();
    const key = keys.shift();
    
    if (keys.length)
    {
      obj[key] = this.setByKeyPath(keys, value, obj[key] || {});
    }
    else
    {
      obj[key] = value;
    }
    
    return obj;
  }
}
