import type { ParseInput, ParseResult } from "@src/type"

export type ParserAtomTokenParseResultErrorInputEnd = {
    errorType: "ASTROPARSE::PARSER::ATOM::TOKEN::INPUT_END"
}

export const parserAtomToken = (
    input : ParseInput
) : ParseResult<string, ParserAtomTokenParseResultErrorInputEnd> => {
    if (input.cursor >= input.data.length) {
        return {
            success: false,
            error: { errorType: "ASTROPARSE::PARSER::ATOM::TOKEN::INPUT_END" },
            input: input
        }
    }

    return {
        success: true,
        value: input.data[input.cursor] as string,
        input: {
            data: input.data,
            cursor: input.cursor + 1
        }
    }
}
