import { parserWhitespace } from "@src/parser/whitespace"
import type { ParseInput } from "@src/type"
import { test, expect } from "bun:test"

const createInput = (data: string, cursor = 0): ParseInput => ({
    data,
    cursor
})

test("parserWhitespace returns null without consuming empty input", () => {
    const result = parserWhitespace(createInput(""))

    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toBeNull()
    expect(result.input.cursor).toEqual(0)
})

test("parserWhitespace consumes whitespace until the first non-whitespace character", () => {
    const result = parserWhitespace(createInput(" \t\nabc"))

    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toBeNull()
    expect(result.input.cursor).toEqual(3)
})

test("parserWhitespace consumes all input when only whitespace is present", () => {
    const input = "  \r\n\t"
    const result = parserWhitespace(createInput(input))

    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toBeNull()
    expect(result.input.cursor).toEqual(input.length)
})
