import { parserAtomMapValue } from "@src/parser/atom/map/value"
import { parserAtomPredicate } from "@src/parser/atom/predicate"
import { parserAtomSequence } from "@src/parser/atom/sequence"
import { parserAtomCharacter } from "@src/parser/atom/character"
import { parserAtomTry } from "@src/parser/atom/try"
import type { Parser } from "@src/type"
import { parserAtomMapError } from "@src/parser/atom/map/error"

export type ParserTextParseResultError = {
    errorType: "ASTROPARSE::PARSER::TEXT::TEXT_INVALID",
    text: string
}

export const parserText = (
    text: string
) : Parser<string, ParserTextParseResultError> => parserAtomMapError(
    parserAtomMapValue(
    // If the parse fails halfway through, unwind the parsed input to avoid a fatal error
        parserAtomTry(
        // Parse each character of the text in sequence
            parserAtomSequence(
                [...text]
                // Parse the next character and check it matches the corresponding text character
                    .map((char) => parserAtomPredicate(
                        parserAtomCharacter,
                        (c) => c === char
                            ? { success: true }
                            : { success: false, error: null }
                    ))
            )
        ),
        // If the parse is succesful, return the parsed word
        () => text,
    ),
    () : ParserTextParseResultError => ({
        errorType: "ASTROPARSE::PARSER::TEXT::TEXT_INVALID",
        text: text
    })
)
