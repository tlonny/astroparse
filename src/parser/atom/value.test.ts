import { parserAtomValue } from "@src/parser/atom/value"
import type { ParseInput } from "@src/type"
import { test, expect } from "bun:test"

const INPUT : ParseInput = {
    data: "hello world",
    cursor: 0,
}

test("parserAtomValue returns a value without consuming input", () => {
    const parser = parserAtomValue("hello")
    const result = parser(INPUT)

    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected error")
    }

    expect(result.input.cursor).toEqual(0)
    expect(result.value).toEqual("hello")
})
