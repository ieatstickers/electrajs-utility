# @electra/utility

A collection of utility classes to help with common tasks.

## Installation

Using npm:
```bash
npm install @electra/utility
```

Using yarn:
```bash
yarn add @electra/utility
```

## Usage

Classes are exported as named exports from `@electra/utility`.

```typescript
import { Objects } from '@electra/utility';

const src = { a: 1, b: 2 };
const clone = Objects.clone(src);
```

## API Reference

### Arrays

#### clone

Create a deep clone of an array, including any nested arrays, objects or class instances.

#### Parameters
- `arr`: The array to be cloned

#### Returns
- A deep clone of the array any nested arrays, objects or class instances found in the array will also be deep cloned.

#### Example
```typescript
import { Arrays } from '@electra/utility';

const exampleArray = [
  { name: "John", age: 21 },
  { name: "Jane", age: 22 },
  { name: "Jack", age: 23 }
];

const clone = Arrays.clone(exampleArray);
```

#### randomItem

Get a random item from an array.

#### Parameters
- `arr: Array<any>`: The array to get a random item from.

#### Returns
- A random item from the array.

#### Example
```typescript
import { Arrays } from '@electra/utility';

const exampleArray = [1, 2, 3, 4, 5];
const randomItem = Arrays.randomItem(exampleArray);
```

### Numbers

#### random

Get a random integer between `min` and `max`.

#### Parameters
- `min: number`: The minimum value of the random number.
- `max: number`: The maximum value of the random number.

#### Returns
- A random integer between `min` and `max`.

#### Example
```typescript
import { Numbers } from '@electra/utility';

const randomNumber = Numbers.random(1, 10);
```

### Objects

#### clone

Create a deep clone of an object, including any nested arrays, objects or class instances.

#### Parameters
- `obj: Object`: The object to be cloned.

#### Returns
- A deep clone of the object. Any nested arrays, objects or class instances found in the object will also be deep cloned.


#### hydrate

Create a new object from a source object. You can configure whether to hydrate only properties that already exist on the new object, or copy across all properties from the source object.

#### Parameters
- `dest: Object`: The object to be hydrated.
- `src: Object`: The object to hydrate from.
- `options`: An object containing options for the hydration process.
  - `mode: HydrateModeEnum`: Either `dest_properties` or `source_properties` (default: `HydrateModeEnum.DEST_PROPERTIES`),
  - `mutators: { [property: string]: (value: any) => any }`: Map containing mutator functions to modify values as they are hydrated onto the destination object
  - `includeNullValues: boolean`: Whether to hydrate properties whose value is null/undefined in the source object (default: `true`),
  - `includeMethods`: Whether to hydrate methods from the source object (default: `false`).

#### Returns
- The hydrated destination object.

#### Example
```typescript
import { Objects, HydrateModeEnum } from '@electra/utility';

const dest = { a: 1, b: 2 };
const src = { b: 3, c: 4 };
const hydrated = Objects.hydrate(
  dest,
  src,
  { 
    mode: HydrateModeEnum.SOURCE_PROPERTIES
  }
);
// hydrated = { a: 1, b: 3, c: 4 }
```

#### getByKeyPath

Get a value from an object using a key path.

#### Parameters
- `keyPath: Array<string>`: An array of keys to traverse to get the value.
- `obj: Object`: The object to get the value from.
- `defaultValue: any`: The value to return if the key path does not exist in the object (default: `undefined`).

#### Returns
- The value at the key path in the object, or the default value if the key path does not exist.

```typescript
import { Objects } from '@electra/utility';

const obj = { a: { b: { foo: 'bar' } } };
const value = Objects.getByKeyPath(['a', 'b', 'foo'], obj);
// value = "bar"
```

#### setByKeyPath

Set a value in an object using a key path.

#### Parameters
- `keyPath: Array<string>`: An array of keys to traverse to set the value.
- `obj: Object`: The object to set the value in.

#### Returns
- The object with the value set at the key path. The return value doesn't need to be used as the original object is mutated.

```typescript
import { Objects } from '@electra/utility';

const obj = { a: { b: { foo: 'bar' } } };
const newObj = Objects.setByKeyPath(['a', 'b', 'foo'], 'baz', obj);
// newObj = { a: { b: { foo: 'baz' } } }
```

### Promises

#### all

Similar to `Promise.all`, but takes an object of promises instead of an array.

#### Parameters
- `promises: { [key: string]: Promise<any> }`: An object containing promises.

#### Returns
- A promise that resolves when all promises in the object have resolved. The resolved value is an object containing the resolved values of each promise.

```typescript
import { Promises } from '@electra/utility';

const promises = {
  foo: new Promise((resolve) => resolve('bar')),
  testing: new Promise((resolve) => resolve(123))
};

const all = Promises.all(promises);

all.then((values) => {
  // values = { foo: 'bar', testing: 123 }
});
```

### Strings

#### initialCaps

Capitalise the first letter of each word in a string.

#### Parameters
- `str: string`: The string to convert to initial caps.

#### Returns
- The string converted to initial caps.

```typescript
import { Strings } from '@electra/utility';

const str = Strings.initialCaps('hello world');
// str = 'Hello World'
```

#### random

Generate a random string of a given length.

#### Parameters
- `length: number`: The length of the string to generate.
- `blacklistedStrings: Array<string>`: An array of strings to avoid generating.

#### Returns
- A random string of the given length.

```typescript
import { Strings } from '@electra/utility';

const str = Strings.random(10);
// str = 'aBcDeFgHiJ'
const secondStr = Strings.random(10, [str]);
// secondStr = 'kLmNoPqRsT' (will never be the same as str)
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

