import { parserAtomCharacter } from "@src/parser/atom/character"
import { parserAtomMapError } from "@src/parser/atom/map/error"
import { parserAtomPredicate } from "@src/parser/atom/predicate"
import { parserAtomTry } from "@src/parser/atom/try"

export type ParserAlphaParseResultError = {
    errorType: "ASTROPARSE::PARSER::ALPHA::ALPHA_INVALID",
}

export const parserAlpha = parserAtomMapError(
    parserAtomTry(
        parserAtomPredicate(
            parserAtomCharacter,
            (c) => /[a-zA-Z]/.test(c)
                ? { success: true }
                : { success: false, error: null }
        ),
    ),
    () : ParserAlphaParseResultError => ({
        errorType: "ASTROPARSE::PARSER::ALPHA::ALPHA_INVALID",
    })
)
