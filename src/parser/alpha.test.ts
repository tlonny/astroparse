import { test, expect } from "bun:test"
import type { ParseInput, ParseResultError, ParseResultValue } from "@src/type"
import { parserAlpha, type ParserAlphaParseResultError } from "@src/parser/alpha"

test("parserAlpha correctly parses a letter", () => {
    const input : ParseInput = { data: "hello", cursor: 0 }
    const result = parserAlpha(input) as ParseResultValue<string>

    expect(result.success).toBe(true)
    expect(result.input.cursor).toEqual(1)
    expect(result.value).toEqual("h")
})

test("parserAlpha errors if the character isn't a letter - consuming no input", () => {
    const input : ParseInput = { data: "1ello", cursor: 0 }
    const result = parserAlpha(input) as ParseResultError<ParserAlphaParseResultError>

    expect(result.success).toBe(false)
    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual({ errorType: "ASTROPARSE::PARSER::ALPHA::ALPHA_INVALID" })
})

test("parserAlpha errors if the input has ended", () => {
    const input : ParseInput = { data: "", cursor: 0 }
    const result = parserAlpha(input) as ParseResultError<ParserAlphaParseResultError>

    expect(result.success).toBe(false)
    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual({ errorType: "ASTROPARSE::PARSER::ALPHA::ALPHA_INVALID" })
})
