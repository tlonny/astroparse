import type { ParseInput, Parser } from "@src/type"

export const parserAtomTry = <TValue, TError>(
    parser : Parser<TValue, TError>
) : Parser<TValue, TError> => (input : ParseInput) => {
        const result = parser(input)
        if (result.success) {
            return result
        }

        return { success: false, error: result.error, input: input }
    }
