import type { ParseInput, Parser, ParseResult } from "@src/type"

export const parserAtomPeek = <TValue, TError>(
    parser : Parser<TValue, TError>
) => (input : ParseInput) : ParseResult<TValue, TError> => {
        const result = parser(input)
        if (result.success) {
            return {
                success: true,
                value: result.value,
                input: input
            }
        }

        return result
    }
