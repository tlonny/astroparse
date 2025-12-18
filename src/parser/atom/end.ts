import type { ParseInput, ParseResult } from "@src/type"

export type ParserAtomEndParseResultError = {
    errorType: "ASTROPARSE::PARSER::ATOM::END::INPUT_NOT_END"
}

export const parserAtomEnd = (
    input : ParseInput
) : ParseResult<null, ParserAtomEndParseResultError> => {
    if (input.cursor >= input.data.length) {
        return {
            success: true,
            value: null,
            input
        }
    }

    return {
        success: false,
        error: { errorType: "ASTROPARSE::PARSER::ATOM::END::INPUT_NOT_END" },
        input: input
    }
}
