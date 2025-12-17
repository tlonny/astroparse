import type { ParseInput, Parser, ParseResult } from "@src/type"

export const parserAtomMapValue = <TValueIn, TValueOut, TError>(
    parser: Parser<TValueIn, TError>,
    mapFn: (value: TValueIn) => TValueOut
) : Parser<TValueOut, TError> => (input : ParseInput) : ParseResult<TValueOut, TError> => {
        const result = parser(input)

        if (!result.success) {
            return result
        }

        return {
            success: true,
            input: result.input,
            value: mapFn(result.value)
        }
    }
