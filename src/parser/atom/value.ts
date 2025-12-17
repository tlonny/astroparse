import type { ParseInput, ParseResultValue } from "@src/type"

export const parserAtomValue = <TValue>(
    value: TValue
) => (input : ParseInput) : ParseResultValue<TValue> => ({
        success: true,
        input: input,
        value: value

    })
