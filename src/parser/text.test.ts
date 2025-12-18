import { test, expect } from "bun:test"
import type { ParseInput } from "@src/type"
import { parserText } from "@src/parser/text"

const INPUT : ParseInput = {
    data: "hello",
    cursor: 0
}

test("parserText correctly parses a word", () => {
    const parser = parserText("hell")
    const result = parser(INPUT)

    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.input.cursor).toEqual(4)
    expect(result.value).toEqual("hell")
})

test("parserText errors if the word doesn't match - consuming no input", () => {
    const parser = parserText("helg")
    const result = parser(INPUT)

    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual({
        errorType: "ASTROPARSE::PARSER::TEXT::CHARACTER_INVALID",
        word: "helg",
        position: 3
    })
})

test("parserText errors if the input runs out - consuming no input", () => {
    const parser = parserText("helloo")
    const result = parser(INPUT)

    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual({ errorType: "ASTROPARSE::PARSER::ATOM::CHARACTER::INPUT_END" })
})
