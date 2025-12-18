export type {
    ParseInput,
    ParseResultValue,
    ParseResultError,
    ParseResult,
    Parser
} from "@src/type"

export {
    parserAtomEither,
    type ParserAtomEitherParseResult
} from "@src/parser/atom/either"

export {
    parserAtomEnd,
    type ParserAtomEndParseResultError
} from "@src/parser/atom/end"

export { parserAtomError } from "@src/parser/atom/error"
export { parserAtomMany } from "@src/parser/atom/many"
export { parserAtomMapValue } from "@src/parser/atom/map/value"
export { parserAtomMapError } from "@src/parser/atom/map/error"
export { parserAtomPeek } from "@src/parser/atom/peek"

export {
    parserAtomPredicate,
    type ParserAtomPredicatePredicateResult
} from "@src/parser/atom/predicate"

export {
    parserAtomSequence,
    type ParserAtomSequenceParseResult
} from "@src/parser/atom/sequence"

export {
    parserAtomCharacter,
    type ParserAtomCharacterParseResultError
} from "@src/parser/atom/character"

export { parserAtomTry } from "@src/parser/atom/try"
export { parserAtomValue } from "@src/parser/atom/value"

export {
    parserAlpha,
    type ParserAlphaParseResultError
} from "@src/parser/alpha"

export {
    parserDigit,
    type ParserDigitParseResultError
} from "@src/parser/digit"

export {
    parserNewline,
    type ParserNewlineParseResultError
} from "@src/parser/newline"

export {
    parserText,
    type ParserTextParseResultError
} from "@src/parser/text"

export { parserWhitespace } from "@src/parser/whitespace"
