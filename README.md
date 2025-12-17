# AstroParse

![ci](https://github.com/tlonny/astroparse/actions/workflows/check.yml/badge.svg)

A minimal, zero dependency, fully-typed parser combinator library.

## Installation

```bash
npm install astroparse
```

## Quick Look

```typescript
import {
    parserAtomMapValue,
    parserAtomSequence,
    parserAtomToken,
    parserAtomTry,
    parserAtomPredicate,
    parserText,
    parserWhitespace,
    parserAtomMany
} from "astroparse"

const parserName = parserAtomMapValue(
    parserAtomMany(
        parserAtomTry(
            parserAtomPredicate(
                parserAtomToken,
                c => /[a-zA-Z]/.test(c)
                    ? { success: true }
                    : { success: false, error: null }
            )
        )
    ),
    (chars) => chars.join("").toUpperCase()
)


const parserShout = parserAtomMapValue(
    parserAtomSequence([
        parserText({ word: "hello" }),
        parserWhitespace,
        parserName
    ]),
    ([,, name]) => `Hello, ${name}!`
)

const result = parserShout({ data: "hello \tsteven", cursor: 0 })

if (result.success) {
    console.log(result.value) // Hello, STEVEN!
} else {
    console.error(result.error)
}
```

## Parser Definition

A parser is simply a function that takes a `ParseInput` and returns a `ParseResult<TValue, TError>`.

A `ParseInput` is simply an object containing some string to be parsed, and a cursor describing how much of the string has been consumed.

```typescript
export type ParseInput = {
    data: string
    cursor: number
}
```

A `ParseResult<TValue, TError>` is a discriminated union type describing either a successful or failed parse on a given input:

```typescript
export type ParseResult<TValue, TError> =
    | ParseResultValue<TValue>
    | ParseResultError<TError>
```

A successful parse will yield a `ParseResultValue<TValue>` object, containing a boolean success discriminator, the value parsed from the input (of type `TValue`) and a new `ParseInput` reflecting any potential changes to input consumption:

```typescript
export type ParseResultValue<TValue> = {
    success: true
    value: TValue,
    input: ParseInput
}
```

A failed parse will yield a `ParseResultError<TError>` object, containing a boolean success discriminator, the error returned by the parser (of type `TError`) and a new `ParseInput` reflecting any potential changes to input consumption:

```typescript
export type ParseResultError<TError> = {
    success: false
    error: TError,
    input: ParseInput
}
```

Thus it is possible to create your own custom parsers by directly implementing functions that conform to the above spec. However, it is recommended that you instead construct custom parsers by composing the suite of atomic parsers provided by AstroParse where possible (it is a parser _combinator_ library after all!)

## Atomic Parsers

AstroParse provides a minimal (but arguably "complete") set of generic, atomic parsers:

 - `parserAtomToken`: consumes and returns the next character of input. Errors if at the end of the input.
 - `parserAtomEnd`: complements `parserAtomToken` - returns a null if at the end of the input. Errors otherwise.
 - `parserAtomValue`: always "parses" a specified value without consuming any input.
 - `parserAtomError`: always returns a specified error without consuming any input.
 - `parserAtomPredicate`: wraps an existing parser, checking the result against a predicate function and erroring if the predicate fails.
 - `parserAtomTry`: wraps an existing parser, backtracking any consumed input if the inner parser errors.
 - `parserAtomPeek`: wraps an existing parser, backtracking any consumed input if the inner parser succeeds.
 - `parserAtomMany`: wraps an existing parser, applying it repeatedly to produce an array of parsed values until an error is observed. The error will propagate if the erroring parser has consumed input.
 - `parserAtomEither`: wraps an array of parsers, attempting to parse each in order until a first value is successfully parsed. Any errors produced by sub-parsers will only propagate if input has been consumed.
 - `parserAtomSequence`: wraps an array of parsers, attempting to parse each in sequence until all have successfully parsed. Any errors produced by sub-parsers are propagated straight away.
 - `parserAtomMapValue`: wraps a parser with a mapping function that transforms any parsed value whilst ignoring errors.
 - `parserAtomMapError`: wraps a parser with a mapping function that transforms any errors whilst ignoring parsed values.

## Non-Atomic Parsers

AstroParse also provides a small set of non-atomic "utility/common" parsers. You're encouraged to inspect the source for these parsers as it is a useful resource when it comes to composing your own parsers:

- `parserText`: parses a specified text string exactly as-is. Will not consume input on failure.
- `parserWhitespace`: parses a (potentially empty) region of whitespace. Will never return an error.
