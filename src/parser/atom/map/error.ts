import type { ParseInput, Parser, ParseResult } from "@src/type"

export const parserAtomMapError = <TValue, TErrorIn, TErrorOut>(
    parser: Parser<TValue, TErrorIn>,
    mapFn: (value: TErrorIn) => TErrorOut
) => (input : ParseInput) : ParseResult<TValue, TErrorOut> => {
        const result = parser(input)

        if (result.success) {
            return result
        }

        return {
            success: false,
            input: result.input,
            error: mapFn(result.error)
        }
    }
