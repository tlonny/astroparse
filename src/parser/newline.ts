import { parserAtomEither } from "@src/parser/atom/either"
import { parserAtomMapError } from "@src/parser/atom/map/error"
import { parserText } from "@src/parser/text"

export type ParserNewlineParseResultError = {
    errorType: "ASTROPARSE::PARSER::NEWLINE::NEWLINE_INVALID"
}

export const parserNewline = parserAtomMapError(
    parserAtomEither([
        parserText("\r\n"),
        parserText("\n"),
    ]),
    () : ParserNewlineParseResultError => ({
        errorType: "ASTROPARSE::PARSER::NEWLINE::NEWLINE_INVALID",
    })
)

