import { test, expect } from "bun:test"
import type { ParseInput, ParseResultError, ParseResultValue } from "@src/type"
import { parserNewline, type ParserNewlineParseResultError } from "@src/parser/newline"

test("parserNewline correctly parses a \\n newline", () => {
    const input : ParseInput = { data: "\n", cursor: 0 }
    const result = parserNewline(input) as ParseResultValue<string>

    expect(result.success).toBe(true)
    expect(result.input.cursor).toEqual(1)
    expect(result.value).toEqual("\n")
})

test("parserNewline correctly parses a \\r\\n newline", () => {
    const input : ParseInput = { data: "\r\n", cursor: 0 }
    const result = parserNewline(input) as ParseResultValue<string>

    expect(result.success).toBe(true)
    expect(result.input.cursor).toEqual(2)
    expect(result.value).toEqual("\r\n")
})

test("parserNewline errors if we see just a carriage return with no input consumed", () => {
    const input : ParseInput = { data: "\rx", cursor: 0 }
    const result = parserNewline(input) as ParseResultError<ParserNewlineParseResultError>

    expect(result.success).toBe(false)
    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual({ errorType: "ASTROPARSE::PARSER::NEWLINE::NEWLINE_INVALID" })
})

test("parserNewline errors if we are at the end of the input", () => {
    const input : ParseInput = { data: "", cursor: 0 }
    const result = parserNewline(input) as ParseResultError<ParserNewlineParseResultError>

    expect(result.success).toBe(false)
    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual({ errorType: "ASTROPARSE::PARSER::NEWLINE::NEWLINE_INVALID" })
})

test("parserNewline errors if a carriage return is the final character", () => {
    const input : ParseInput = { data: "\r", cursor: 0 }
    const result = parserNewline(input) as ParseResultError<ParserNewlineParseResultError>

    expect(result.success).toBe(false)
    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual({ errorType: "ASTROPARSE::PARSER::NEWLINE::NEWLINE_INVALID" })
})
