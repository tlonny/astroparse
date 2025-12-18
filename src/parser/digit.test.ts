import { test, expect } from "bun:test"
import type { ParseInput, ParseResultError, ParseResultValue } from "@src/type"
import { parserDigit, type ParserDigitParseResultError } from "@src/parser/digit"

test("parserDigit correctly parses a digit", () => {
    const input : ParseInput = { data: "1ello", cursor: 0 }
    const result = parserDigit(input) as ParseResultValue<string>

    expect(result.success).toBe(true)
    expect(result.input.cursor).toEqual(1)
    expect(result.value).toEqual("1")
})

test("parserDigit errors if the character isn't a digit - consuming no input", () => {
    const input : ParseInput = { data: "hello", cursor: 0 }
    const result = parserDigit(input) as ParseResultError<ParserDigitParseResultError>

    expect(result.success).toBe(false)
    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual({ errorType: "ASTROPARSE::PARSER::DIGIT::DIGIT_INVALID" })
})

test("parserDigit errors if input has ended", () => {
    const input : ParseInput = { data: "", cursor: 0 }
    const result = parserDigit(input) as ParseResultError<ParserDigitParseResultError>

    expect(result.success).toBe(false)
    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual({ errorType: "ASTROPARSE::PARSER::DIGIT::DIGIT_INVALID"})
})
