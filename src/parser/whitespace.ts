import { parserAtomMany } from "@src/parser/atom/many"
import { parserAtomMapError } from "@src/parser/atom/map/error"
import { parserAtomMapValue } from "@src/parser/atom/map/value"
import { parserAtomPredicate } from "@src/parser/atom/predicate"
import { parserAtomCharacter } from "@src/parser/atom/character"
import { parserAtomTry } from "@src/parser/atom/try"

const REGEX = /\s/
const INVARIANT_MSG = "Invariant: Parser errored unexpectedly"

export const parserWhitespace = parserAtomMapValue(
    parserAtomMapError(
        parserAtomMany(
            parserAtomTry(
                parserAtomPredicate(
                    parserAtomCharacter,
                    c => REGEX.test(c)
                        ? { success: true }
                        : { success: false, error: null }
                )
            )
        ),
        () => { throw new Error(INVARIANT_MSG) }
    ),
    () => null
)
