import { parserAtomError } from "@src/parser/atom/error"
import type { ParseInput } from "@src/type"
import { test, expect } from "bun:test"

const INPUT : ParseInput = {
    data: "hello world",
    cursor: 0,
}

test("parserAtomError returns an error without consuming input", () => {
    const parser = parserAtomError("boom")
    const result = parser(INPUT)

    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual("boom")
})
