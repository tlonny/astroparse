import type { ParseInput, ParseResult } from "@src/type"

export type ParserAtomCharacterParseResultErrorInputEnd = {
    errorType: "ASTROPARSE::PARSER::ATOM::CHARACTER::INPUT_END"
}

export type ParserAtomCharacterParseResultError =
    | ParserAtomCharacterParseResultErrorInputEnd

export const parserAtomCharacter = (
    input : ParseInput
) : ParseResult<string, ParserAtomCharacterParseResultError> => {
    if (input.cursor >= input.data.length) {
        return {
            success: false,
            error: { errorType: "ASTROPARSE::PARSER::ATOM::CHARACTER::INPUT_END" },
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
