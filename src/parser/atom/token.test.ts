import { parserAtomToken } from "@src/parser/atom/token"
import { test, expect } from "bun:test"

test("parserAtomToken returns current token and advances input", () => {
    const result = parserAtomToken({ data: "abc", cursor: 1 })
    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toEqual("b")
    expect(result.input.cursor).toEqual(2)
})

test("parserAtomToken errors when at the end of the input", () => {
    const result = parserAtomToken({ data: "abc", cursor: 3 })
    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.error).toEqual({
        errorType: "ASTROPARSE::PARSER::ATOM::TOKEN::INPUT_END"
    })

    expect(result.input.cursor).toEqual(3)
})
