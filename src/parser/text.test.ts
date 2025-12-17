import { test, expect } from "bun:test"
import type { ParseInput } from "@src/type"
import { parserText } from "@src/parser/text"

const INPUT : ParseInput = {
    data: "hello",
    cursor: 0
}

test("parserText correctly parses a word", () => {
    const parser = parserText({ word: "hell" })
    const result = parser(INPUT)

    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.input.cursor).toEqual(4)
    expect(result.value).toEqual("hell")
})

test("parserText errors if the word doesn't match - consuming no input", () => {
    const parser = parserText({ word: "helg" })
    const result = parser(INPUT)

    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual({
        errorType: "PARSER_TEXT::TOKEN_INCORRECT",
        word: "helg",
        position: 3
    })
})

test("parserText errors if the input runs out - consumign no input", () => {
    const parser = parserText({ word: "helloo" })
    const result = parser(INPUT)

    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual({
        errorType: "PARSER_TEXT::TOKEN_INCORRECT",
        word: "helloo",
        position: 5
    })
})
