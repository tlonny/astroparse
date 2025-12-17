import type { Parser, ParseInput, ParseResult } from "@src/type"

type ParserAtomSequenceParseResult<TParsers extends Parser<any, any>[]> = ParseResult<
   { [TIndex in keyof TParsers]: TParsers[TIndex] extends Parser<infer TValue, any> ? TValue : never },
   TParsers[number] extends Parser<any, infer TError> ? TError : never
>

export const parserAtomSequence = <const TParsers extends Parser<any, any>[]>(
    parsers : TParsers
) => (input : ParseInput) : ParserAtomSequenceParseResult<TParsers> => {
        let current = input
        const values: unknown[] = []

        for (const parser of parsers) {
            const result = parser(current)
            if (result.success) {
                values.push(result.value)
                current = result.input
                continue
            }

            return result
        }

        return {
            success: true,
            input: current,
            value: values
        } as ParserAtomSequenceParseResult<TParsers>
    }
