import { parserAtomMapValue } from "@src/parser/atom/map/value"
import { parserAtomPredicate, type ParserAtomPredicatePredicateResult } from "@src/parser/atom/predicate"
import { parserAtomSequence } from "@src/parser/atom/sequence"
import { parserAtomCharacter, type ParserAtomCharacterParseResultErrorInputEnd } from "@src/parser/atom/character"
import { parserAtomTry } from "@src/parser/atom/try"
import type { Parser } from "@src/type"

export type ParserTextParseResultErrorCharacterInvalid = {
    errorType: "ASTROPARSE::PARSER::TEXT::CHARACTER_INVALID",
    word: string,
}

export type ParserTextParseResultError =
    | ParserTextParseResultErrorCharacterInvalid
    | ParserAtomCharacterParseResultErrorInputEnd

export const parserText = (
    word: string
) : Parser<string, ParserTextParseResultError> => parserAtomMapValue(
    // If the parse fails halfway through, unwind the parsed input to avoid a fatal error
    parserAtomTry(
        // Parse each character of the text in sequence
        parserAtomSequence(
            [...word]
            // Parse the next character and check it matches the corresponding text character
                .map((char) => parserAtomPredicate(
                    parserAtomCharacter,
                    (c) : ParserAtomPredicatePredicateResult<ParserTextParseResultErrorCharacterInvalid> => c === char
                        ? { success: true }
                        : { success: false, error: { errorType: "ASTROPARSE::PARSER::TEXT::CHARACTER_INVALID", word } }
                ))
        )
    ),
    // If the parse is succesful, return the parsed word
    () => word,
)
