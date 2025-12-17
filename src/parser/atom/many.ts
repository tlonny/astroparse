import type { ParseInput, Parser, ParseResult } from "@src/type"

export const parserAtomMany = <TValue, TError>(
    parser : Parser<TValue, TError>
) => (input : ParseInput) : ParseResult<TValue[], TError> => {
        const results : TValue[] = []
        let current = input

        while (true) {
            const result = parser(current)
            if (result.success) {
                results.push(result.value)
                current = result.input
            } else if (result.input.cursor !== current.cursor) {
                return result
            } else {
                break
            }
        }

        return {
            success: true,
            input: current,
            value: results
        }
    }
