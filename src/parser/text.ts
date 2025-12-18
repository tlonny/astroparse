import { parserAtomMapError } from "@src/parser/atom/map/error"
import { parserAtomMapValue } from "@src/parser/atom/map/value"
import { parserAtomPredicate } from "@src/parser/atom/predicate"
import { parserAtomSequence } from "@src/parser/atom/sequence"
import { parserAtomToken } from "@src/parser/atom/token"
import { parserAtomTry } from "@src/parser/atom/try"
import type { Parser } from "@src/type"

export type ParserTextParseResultErrorTokenIncorrect = {
    errorType: "ASTROPARSE::PARSER::TEXT::TOKEN_INCORRECT",
    word: string,
    position: number
}

const errorBuild = (position : number, word: string) : ParserTextParseResultErrorTokenIncorrect => ({
    errorType: "ASTROPARSE::PARSER::TEXT::TOKEN_INCORRECT",
    position: position,
    word: word
})

export const parserText = (
    word: string
) : Parser<string, ParserTextParseResultErrorTokenIncorrect> => parserAtomMapValue(
    // If the parse fails halfway through, unwind the parsed input to avoid a fatal error
    parserAtomTry(
        // Parse each character of the text in sequence
        parserAtomSequence(
            [...word]
            // Parse the next token (character) and check it matches the corresponding text character
                .map((char, cursor) => parserAtomPredicate(
                    parserAtomMapError(
                        parserAtomToken,
                        () => errorBuild(cursor, word)
                    ),
                    (c) => c === char
                        ? { success: true }
                        : { success: false, error: errorBuild(cursor, word) }
                ))
        )
    ),
    // If the parse is succesful, return the parsed word
    () => word,
)
