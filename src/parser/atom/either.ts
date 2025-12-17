import type { Parser, ParseInput, ParseResult } from "@src/type"

type ParserAtomEitherParseResult<TParsers extends Parser<any, any>[]> = ParseResult<
   TParsers[number] extends Parser<infer TValue, any> ? TValue : never,
   TParsers[number] extends Parser<any, infer TError> ? TError : never
>

export const parserAtomEither = <const TParsers extends Parser<any, any>[]>(
    parsers: TParsers
) => (input : ParseInput) : ParserAtomEitherParseResult<TParsers> => {
        let lastValue: ParserAtomEitherParseResult<TParsers> | null = null

        for (const parser of parsers) {
            const result = parser(input)
            if (result.success || result.input.cursor !== input.cursor) {
                return result
            } else {
                lastValue = result
            }
        }

        if (lastValue === null) {
            throw new Error("parserUtilEither is empty")
        }

        return lastValue
    }
