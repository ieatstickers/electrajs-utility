# @electra/utility

A collection of utility classes to help with common tasks.

### Installation

Using npm:

```bash
npm install @electra/utility
```

Using yarn:

```bash
yarn add @electra/utility
```

### Usage

Classes are exported as named exports from `@electra/utility`.

```typescript
import { Objects } from '@electra/utility';

const src = { a: 1, b: 2 };
const clone = Objects.clone(src);
```

### API Reference

Table of contents:

- [Arrays](#arrays)
    - [clone](#arraysclone)
    - [randomItem](#arraysrandomitem)
- [Numbers](#numbers)
    - [random](#numbersrandom)
- [Objects](#objects)
    - [clone](#objectsclone)
    - [hydrate](#objectshydrate)
    - [getByKeyPath](#objectsgetbykeypath)
    - [setByKeyPath](#objectssetbykeypath)
- [Promises](#promises)
    - [all](#promisesall)
- [Strings](#strings)
    - [initialCaps](#stringsinitialcaps)
    - [random](#stringsrandom)
- [Types](#types)
  - [isString](#typesisstring)
  - [isBoolean](#typesisboolean)
  - [isNumber](#typesisnumber)
  - [isInteger](#typesisinteger)
  - [isArray](#typesisarray)
  - [isObject](#typesisobject)
  - [isFunction](#typesisfunction)
  - [isNull](#typesisnull)
  - [isUndefined](#typesisundefined)
  - [isSet](#typesisset)
  - [isEnum](#typesisenum)
  - [isEnumValue](#typesisenumvalue)
- [Validators](#validators)
    - [all](#validatorsall)
    - [any](#validatorsany)
    - [array](#validatorsarray)
    - [boolean](#validatorsboolean)
    - [enumValue](#validatorsenumvalue)
    - [integer](#validatorsinteger)
    - [maxLength](#validatorsmaxlength)
    - [minLength](#validatorsminlength)
    - [number](#validatorsnumber)
    - [object](#validatorsobject)
    - [regex](#validatorsregex)
    - [schema](#validatorsschema)
    - [string](#validatorsstring)

## Arrays

### Arrays.clone

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

### Arrays.randomItem

Get a random item from an array.

#### Parameters

- `arr: Array<any>`: The array to get a random item from.

#### Returns

- A random item from the array.

#### Example

```typescript
import { Arrays } from '@electra/utility';

const exampleArray = [ 1, 2, 3, 4, 5 ];
const randomItem = Arrays.randomItem(exampleArray);
```

## Numbers

### Numbers.random

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

## Objects

### Objects.clone

Create a deep clone of an object, including any nested arrays, objects or class instances.

#### Parameters

- `obj: Object`: The object to be cloned.

#### Returns

- A deep clone of the object. Any nested arrays, objects or class instances found in the object will also be deep
  cloned.
  
### Objects.hydrate

Hydrate an object (destination) with data from another object (source). You can configure whether to hydrate only properties that already exist on the
new object, or copy across all properties from the source object, regardless of whether they already exist in the destination object.

#### Parameters

- `dest: Object`: The object to be hydrated.
- `src: Object`: The object to hydrate from.
- `options`: An object containing options for the hydration process.
    - `mode: HydrateModeEnum`: Either `dest_properties` or `source_properties` (
      default: `HydrateModeEnum.DEST_PROPERTIES`),
    - `mutators: { [property: string]: (value: any) => any }`: Map containing mutator functions to modify values as they
      are hydrated onto the destination object
    - `includeNullValues: boolean`: Whether to hydrate properties whose value is null/undefined in the source object (
      default: `true`),
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

### Objects.getByKeyPath

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
const value = Objects.getByKeyPath([ 'a', 'b', 'foo' ], obj);
// value = "bar"
```

### Objects.setByKeyPath

Set a value in an object using a key path.

#### Parameters

- `keyPath: Array<string>`: An array of keys to traverse to set the value.
- `obj: Object`: The object to set the value in.

#### Returns

- The object with the value set at the key path. The return value doesn't need to be used as the original object is
  mutated.

```typescript
import { Objects } from '@electra/utility';

const obj = { a: { b: { foo: 'bar' } } };
const newObj = Objects.setByKeyPath([ 'a', 'b', 'foo' ], 'baz', obj);
// newObj = { a: { b: { foo: 'baz' } } }
```

## Promises

### Promises.all

Similar to `Promise.all`, but takes an object of promises instead of an array.

#### Parameters

- `promises: { [key: string]: Promise<any> }`: An object containing promises.

#### Returns

- A promise that resolves when all promises in the object have resolved. The resolved value is an object containing the
  resolved values of each promise.

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

## Strings

### Strings.initialCaps

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

### Strings.random

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
const secondStr = Strings.random(10, [ str ]);
// secondStr = 'kLmNoPqRsT' (will never be the same as str)  
```

## Types

### Types.isString

Check if a value is a string.

#### Parameters

- `value: any`: The value to check.
- `optional: boolean`: Whether the value can be null or undefined (default: `false`).

#### Returns

- `boolean`: `true` if the value is a string, `false` otherwise.

```typescript
import { Types } from '@electra/utility';

const isString = Types.isString('test');
// isString = true
```

### Types.isBoolean

Check if a value is a boolean.

#### Parameters

- `value: any`: The value to check.
- `optional: boolean`: Whether the value can be null or undefined (default: `false`).

#### Returns

- `boolean`: `true` if the value is a boolean, `false` otherwise.

```typescript
import { Types } from '@electra/utility';

const isBoolean = Types.isBoolean(true);
// isBoolean = true
```

### Types.isNumber

Check if a value is a number.

#### Parameters

- `value: any`: The value to check.
- `optional: boolean`: Whether the value can be null or undefined (default: `false`).

#### Returns

- `boolean`: `true` if the value is a number, `false` otherwise.

```typescript
import { Types } from '@electra/utility';

const isNumber = Types.isNumber(123);
// isNumber = true
```

### Types.isInteger

Check if a value is an integer.

#### Parameters

- `value: any`: The value to check.
- `optional: boolean`: Whether the value can be null or undefined (default: `false`).

#### Returns

- `boolean`: `true` if the value is an integer, `false` otherwise.

```typescript
import { Types } from '@electra/utility';

const isInteger = Types.isInteger(123);
// isInteger = true
```

### Types.isArray

Check if a value is an array.

#### Parameters

- `value: any`: The value to check.
- `optional: boolean`: Whether the value can be null or undefined (default: `false`).

#### Returns

- `boolean`: `true` if the value is an array, `false` otherwise.

```typescript
import { Types } from '@electra/utility';

const isArray = Types.isArray([ 1, 2, 3 ]);
// isArray = true
```

### Types.isObject

Check if a value is an object.

#### Parameters

- `value: any`: The value to check.
- `optional: boolean`: Whether the value can be null or undefined (default: `false`).

#### Returns

- `boolean`: `true` if the value is an object, `false` otherwise.

```typescript
import { Types } from '@electra/utility';

const isObject = Types.isObject({ a: 1, b: 2 });
// isObject = true
```

### Types.isFunction

Check if a value is a function.

#### Parameters

- `value: any`: The value to check.
- `optional: boolean`: Whether the value can be null or undefined (default: `false`).

#### Returns

- `boolean`: `true` if the value is a function, `false` otherwise.

```typescript
import { Types } from '@electra/utility';

const isFunction = Types.isFunction(() => {});
// isFunction = true
```

### Types.isNull

Check if a value is null.

#### Parameters

- `value: any`: The value to check.
- `optional: boolean`: Whether the value can be null or undefined (default: `false`).

#### Returns

- `boolean`: `true` if the value is null, `false` otherwise.

```typescript
import { Types } from '@electra/utility';

const isNull = Types.isNull(null);
// isNull = true
```

### Types.isUndefined

Check if a value is undefined.

#### Parameters

- `value: any`: The value to check.
- `optional: boolean`: Whether the value can be null or undefined (default: `false`).

#### Returns

- `boolean`: `true` if the value is undefined, `false` otherwise.

```typescript
import { Types } from '@electra/utility';

const isUndefined = Types.isUndefined(undefined);
// isUndefined = true
```

### Types.isSet

Check if a value is set (has a value other than null or undefined).

#### Parameters

- `value: any`: The value to check.
- `optional: boolean`: Whether the value can be null or undefined (default: `false`).

#### Returns

- `boolean`: `true` if the value is set, `false` otherwise.

```typescript
import { Types } from '@electra/utility';

const isSet = Types.isSet(123);
// isSet = true
```

### Types.isEnum

Check if a value is an enum.

#### Parameters

- `value: any`: The value to check.
- `optional: boolean`: Whether the value can be null or undefined (default: `false`).

#### Returns

- `boolean`: `true` if the value is an enum, `false` otherwise.

```typescript
import { Types } from '@electra/utility';

enum ExampleEnum {
  FOO = 'foo',
  BAR = 'bar'
}

const isEnum = Types.isEnum(ExampleEnum);
// isEnum = true
```

### Types.isEnumValue

Check if a value is a value of an enum.

#### Parameters

- `value: any`: The value to check.
- `enum: any`: The enum to check against.
- `optional: boolean`: Whether the value can be null or undefined (default: `false`).

#### Returns

- `boolean`: `true` if the value is a value of an enum, `false` otherwise.

```typescript
import { Types } from '@electra/utility';

enum ExampleEnum {
  FOO = 'foo',
  BAR = 'bar'
}

const isEnumValue = Types.isEnumValue("foo", ExampleEnum.Foo);
// isEnumValue = true
```

## Validators

### Validators.all

Validate a value against multiple validators. If any of the specified validators fail, the overall validation fails.

#### Parameters

- `validators: Array<ValidatorInterface>`: An array of validators to validate against.
- `options?: ValidatorOptions`: An object containing options for the validation process.
    - `optional?: boolean`: If set to true, null and undefined values will pass validation (default: `false`)
    - `throwErrors?: boolean`: If set to true, a TypeError will be thrown instead of returning the validation message in
      the result object (default: `false`)

#### Returns

An instance of `ValidatorInterface`

When calling the `validate` method on the returned instance, the following object is returned:

- An object containing the result of the validation.
    - `value: any`: The value that was validated.
    - `valid: boolean`: Whether the value passed validation.
    - `message?: string`: The validation message. (`null` if `valid` is `true`)

```typescript
import { Validators } from '@electra/utility';

const validator = Validators.all([ Validators.string(), Validators.minLength(5) ]);

const { value, valid, message } = validator.validate("test");

// value = "test"
// valid = false
// message = "Value must be at least 5 in length - string of length 4 provided"
```

### Validators.any

Validate a value against multiple validators. If any of the specified validators pass, the overall validation passes.

#### Parameters

- `validators: Array<ValidatorInterface>`: An array of validators to validate against.
- `options?: ValidatorOptions`: An object containing options for the validation process.
    - `optional?: boolean`: If set to true, null and undefined values will pass validation (default: `false`)
    - `throwErrors?: boolean`: If set to true, a TypeError will be thrown instead of returning the validation message in
      the result object (default: `false`)

#### Returns

An instance of `ValidatorInterface`

When calling the `validate` method on the returned instance, the following object is returned:

- An object containing the result of the validation.
  - `value: any`: The value that was validated.
  - `valid: boolean`: Whether the value passed validation.
  - `message?: string`: The validation message. (`null` if `valid` is `true`)

```typescript
import { Validators } from '@electra/utility';

const validator = Validators.any([ Validators.string(), Validators.boolean() ]);

const { value: stringValue, valid: isStringValid } = validator.validate("test");

// stringValue = "test"
// isStringValid = true

const { value: boolValue, valid: isBoolValid } = validator.validate(false);

// boolValue = false
// isBoolValid = true
```  

### Validators.array

Validate that a value is an array.

#### Parameters

The `Validators.array` method has two overload signatures:

One optional `options` parameter:

- `options?: ValidatorOptions`: An object containing options for the validation process.
    - `optional?: boolean`: If set to true, null and undefined values will pass validation (default: `false`)
    - `throwErrors?: boolean`: If set to true, a TypeError will be thrown instead of returning the validation message in
      the result object (default: `false`)

Or a required `itemValidator` parameter, with an optional `options` parameter:

- `itemValidator: ValidatorInterface`: A validator to validate each item in the array against.
- `options?: ValidatorOptions`: As above.

#### Returns

An instance of `ValidatorInterface`

When calling the `validate` method on the returned instance, the following object is returned:

- An object containing the result of the validation.
  - `value: any`: The value that was validated.
  - `valid: boolean`: Whether the value passed validation.
  - `message?: string`: The validation message. (`null` if `valid` is `true`)

```typescript
import { Validators } from '@electra/utility';

const validator = Validators.array();

const { value: arrayValue, valid: isArrayValid } = validator.validate([ 1, 2, 3 ]);

// arrayValue = [1, 2, 3]

const { value: stringValue, valid: isStringValid, message } = validator.validate("test");

// stringValue = "test"
// isStringValid = false
// message = "Value must be an array - string provided"
```  

### Validators.boolean

Validate that a value is a boolean.

#### Parameters

- `options?: ValidatorOptions`: An object containing options for the validation process.
    - `optional?: boolean`: If set to true, null and undefined values will pass validation (default: `false`)
    - `throwErrors?: boolean`: If set to true, a TypeError will be thrown instead of returning the validation message in
      the result object (default: `false`)

#### Returns

An instance of `ValidatorInterface`

When calling the `validate` method on the returned instance, the following object is returned:

- An object containing the result of the validation.
  - `value: any`: The value that was validated.
  - `valid: boolean`: Whether the value passed validation.
  - `message?: string`: The validation message. (`null` if `valid` is `true`)

```typescript
import { Validators } from '@electra/utility';

const validator = Validators.boolean();

const { value: boolValue, valid: isBoolValid } = validator.validate(false);

// boolValue = false
// isBoolValid = true

const { value: stringValue, valid: isStringValid, message } = validator.validate("test");

// stringValue = "test"
// isStringValid = false
// message = "Value must be a boolean - string provided"
```

### Validators.enumValue

Validate that a value is a valid enum value from a specified enum.

#### Parameters

- `enumClass: { [key: string]: string | number }`: The enum class to check the value against.
- `options?: ValidatorOptions`: An object containing options for the validation process.
  - `optional?: boolean`: If set to true, null and undefined values will pass validation (default: `false`)
  - `throwErrors?: boolean`: If set to true, a TypeError will be thrown instead of returning the validation message in
    the result object (default: `false`)

#### Returns

An instance of `ValidatorInterface`

When calling the `validate` method on the returned instance, the following object is returned:

- An object containing the result of the validation.
  - `value: any`: The value that was validated.
  - `valid: boolean`: Whether the value passed validation.
  - `message?: string`: The validation message. (`null` if `valid` is `true`)

```typescript
import { Validators } from '@electra/utility';

enum ExampleEnum {
  FOO = 'foo',
  BAR = 'bar'
}

const validator = Validators.enumValue(ExampleEnum);

const { value, valid, message } = validator.validate("foo");

// value = "foo"
// valid = true
// message = null
```

### Validators.integer

Validate that a value is an integer.

#### Parameters

- `options?: ValidatorOptions`: An object containing options for the validation process.
  - `optional?: boolean`: If set to true, null and undefined values will pass validation (default: `false`)
  - `throwErrors?: boolean`: If set to true, a TypeError will be thrown instead of returning the validation message in
    the result object (default: `false`)

#### Returns

An instance of `ValidatorInterface`

When calling the `validate` method on the returned instance, the following object is returned:

- An object containing the result of the validation.
  - `value: any`: The value that was validated.
  - `valid: boolean`: Whether the value passed validation.
  - `message?: string`: The validation message. (`null` if `valid` is `true`)

```typescript
import { Validators } from '@electra/utility';

const validator = Validators.integer();

const { value, valid, message } = validator.validate(123);

// value = 123
// valid = true
// message = null
```

### Validators.maxLength

Validate that a value is a string or array with a maximum length.

#### Parameters

- `maxLength: number`: The maximum length of the string or array.
- `options?: ValidatorOptions`: An object containing options for the validation process.
    - `optional?: boolean`: If set to true, null and undefined values will pass validation (default: `false`)
    - `throwErrors?: boolean`: If set to true, a TypeError will be thrown instead of returning the validation message in
      the result object (default: `false`)

#### Returns

An instance of `ValidatorInterface`

When calling the `validate` method on the returned instance, the following object is returned:

- An object containing the result of the validation.
  - `value: any`: The value that was validated.
  - `valid: boolean`: Whether the value passed validation.
  - `message?: string`: The validation message. (`null` if `valid` is `true`)

```typescript
import { Validators } from '@electra/utility';

const validator = Validators.maxLength(5);

const { value, valid, message } = validator.validate("test");

// value = "test"
// valid = true
// message = null
```

### Validators.minLength

Validate that a value is a string or array with a minimum length.

#### Parameters

- `minLength: number`: The minimum length of the string or array.
- `options?: ValidatorOptions`: An object containing options for the validation process.
    - `optional?: boolean`: If set to true, null and undefined values will pass validation (default: `false`)
    - `throwErrors?: boolean`: If set to true, a TypeError will be thrown instead of returning the validation message in
      the result object (default: `false`)

#### Returns

An instance of `ValidatorInterface`

When calling the `validate` method on the returned instance, the following object is returned:

- An object containing the result of the validation.
  - `value: any`: The value that was validated.
  - `valid: boolean`: Whether the value passed validation.
  - `message?: string`: The validation message. (`null` if `valid` is `true`)

```typescript
import { Validators } from '@electra/utility';

const validator = Validators.minLength(5);

const { value, valid, message } = validator.validate("testing");

// value = "testing"
// valid = true
// message = null
```

### Validators.number

Validate that a value is a number.

#### Parameters

- `options?: ValidatorOptions`: An object containing options for the validation process.
    - `optional?: boolean`: If set to true, null and undefined values will pass validation (default: `false`)
    - `throwErrors?: boolean`: If set to true, a TypeError will be thrown instead of returning the validation message in
      the result object (default: `false`)

#### Returns

An instance of `ValidatorInterface`

When calling the `validate` method on the returned instance, the following object is returned:

- An object containing the result of the validation.
  - `value: any`: The value that was validated.
  - `valid: boolean`: Whether the value passed validation.
  - `message?: string`: The validation message. (`null` if `valid` is `true`)

```typescript
import { Validators } from '@electra/utility';

const validator = Validators.number();

const { value, valid, message } = validator.validate(123);

// value = 123
// valid = true
// message = null
```

### Validators.object

Validate that a value is an object.

#### Parameters

The `Validators.object` method has two overload signatures:

One optional `options` parameter:

- `options?: ValidatorOptions`: An object containing options for the validation process.
    - `optional?: boolean`: If set to true, null and undefined values will pass validation (default: `false`)
    - `throwErrors?: boolean`: If set to true, a TypeError will be thrown instead of returning the validation message in
      the result object (default: `false`)

Or a required `itemValidator` parameter, with an optional `options` parameter:

- `itemValidator: ValidatorInterface`: A validator to validate each item in the object against.
- `options?: ValidatorOptions`: As above.

#### Returns

An instance of `ValidatorInterface`

When calling the `validate` method on the returned instance, the following object is returned:  

- An object containing the result of the validation.
  - `value: any`: The value that was validated.
  - `valid: boolean`: Whether the value passed validation.
  - `message?: string`: The validation message. (`null` if `valid` is `true`)

```typescript
import { Validators } from '@electra/utility';

const validator = Validators.object();

const { value, valid, message } = validator.validate({ a: 1, b: 2 });

// value = { a: 1, b: 2 }
// valid = true
// message = null
```

### Validators.regex

Validate that a value matches a regex pattern.

#### Parameters

- `pattern: RegExp`: The regex pattern to match against.
- `expectedFormat: string`: The expected format of the value (used in the validation message).
- `options?: ValidatorOptions`: An object containing options for the validation process.
  - `optional?: boolean`: If set to true, null and undefined values will pass validation (default: `false`)
  - `throwErrors?: boolean`: If set to true, a TypeError will be thrown instead of returning the validation message in
    the result object (default: `false`)

#### Returns

An instance of `ValidatorInterface`

When calling the `validate` method on the returned instance, the following object is returned:

- An object containing the result of the validation.
  - `value: any`: The value that was validated.
  - `valid: boolean`: Whether the value passed validation.
  - `message?: string`: The validation message. (`null` if `valid` is `true`)

```typescript
import { Validators } from '@electra/utility';

const validator = Validators.regex(
  /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, 
  "YYYY-MM-DD"
);

const { value, valid, message } = validator.validate("2019-01-31");

// value = "2019-01-31"
// valid = true
// message = null
```

### Validators.schema

Validate that a value matches a specified schema.

#### Parameters

- `schema: Schema`: The schema to validate against.
- `options?: ValidatorOptions`: An object containing options for the validation process.
    - `optional?: boolean`: If set to true, null and undefined values will pass validation (default: `false`)
    - `throwErrors?: boolean`: If set to true, a TypeError will be thrown instead of returning the validation message in the result object (default: `false`)

#### Returns

An instance of `ValidatorInterface`

When calling the `validate` method on the returned instance, the following object is returned:

- An object containing the result of the validation.
  - `value: any`: The value that was validated.
  - `valid: boolean`: Whether the value passed validation.
  - `message?: string`: The validation message. (`null` if `valid` is `true`)

```typescript
import { Validators, Schema } from '@electra/utility';

const schema = new Schema({
  name: Validators.string(),
  age: Validators.number()
});

const validator = Validators.schema(schema);

const { value, valid, message } = validator.validate({ name: "John", age: 21 });

// value = { name: "John", age: 21 }
// valid = true
// message = null
```

### Validators.string

Validate that a value is a string.

#### Parameters

- `options?: ValidatorOptions`: An object containing options for the validation process.
  - `optional?: boolean`: If set to true, null and undefined values will pass validation (default: `false`)
  - `throwErrors?: boolean`: If set to true, a TypeError will be thrown instead of returning the validation message in the result object (default: `false`)

#### Returns

An instance of `ValidatorInterface`

When calling the `validate` method on the returned instance, the following object is returned:

- An object containing the result of the validation.
  - `value: any`: The value that was validated.
  - `valid: boolean`: Whether the value passed validation.
  - `message?: string`: The validation message. (`null` if `valid` is `true`)

```typescript
import { Validators } from '@electra/utility';

const validator = Validators.string();

const { value, valid, message } = validator.validate("test");

// value = "test"
// valid = true
// message = null
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
