import type { ParseInput, ParseResultError } from "@src/type"

export const parserAtomError = <TError>(
    error: TError
) => (input : ParseInput) : ParseResultError<TError> => ({
        success: false,
        input: input,
        error: error
    })
