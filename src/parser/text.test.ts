import { test, expect } from "bun:test"
import type { ParseInput, ParseResultError, ParseResultValue } from "@src/type"
import { parserText, type ParserTextParseResultError } from "@src/parser/text"

const INPUT : ParseInput = {
    data: "hello",
    cursor: 0
}

test("parserText correctly parses a word", () => {
    const parser = parserText("hell")
    const result = parser(INPUT) as ParseResultValue<string>

    expect(result.success).toBe(true)
    expect(result.input.cursor).toEqual(4)
    expect(result.value).toEqual("hell")
})

test("parserText errors if the word doesn't match - consuming no input", () => {
    const parser = parserText("helg")
    const result = parser(INPUT) as ParseResultError<ParserTextParseResultError>

    expect(result.success).toBe(false)
    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual({
        errorType: "ASTROPARSE::PARSER::TEXT::TEXT_INVALID",
        text: "helg"
    })
})

test("parserText errors if the input runs out - consuming no input", () => {
    const parser = parserText("helloo")
    const result = parser(INPUT) as ParseResultError<ParserTextParseResultError>

    expect(result.success).toEqual(false)
    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual({
        errorType: "ASTROPARSE::PARSER::TEXT::TEXT_INVALID",
        text: "helloo"
    })
})
