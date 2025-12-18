import { parserAtomCharacter } from "@src/parser/atom/character"
import { parserAtomMapError } from "@src/parser/atom/map/error"
import { parserAtomPredicate } from "@src/parser/atom/predicate"
import { parserAtomTry } from "@src/parser/atom/try"

export type ParserDigitParseResultError = {
    errorType: "ASTROPARSE::PARSER::DIGIT::DIGIT_INVALID"
}

export const parserDigit = parserAtomMapError(
    parserAtomTry(
        parserAtomPredicate(
            parserAtomCharacter,
            (c) => /[0-9]/.test(c)
                ? { success: true }
                : { success: false, error: null }
        )
    ),
    () : ParserDigitParseResultError => ({
        errorType: "ASTROPARSE::PARSER::DIGIT::DIGIT_INVALID",
    })
)

