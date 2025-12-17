import { parserAtomEnd } from "@src/parser/atom/end"
import { test, expect } from "bun:test"

test("parserAtomEnd returns null when at the end of the input", () => {
    const result = parserAtomEnd({ data: "hello", cursor: 5 })
    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toBeNull()
    expect(result.input.cursor).toEqual(5)
})

test("parserAtomEnd errors when not at the end of the input", () => {
    const result = parserAtomEnd({ data: "hello", cursor: 0 })
    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.error).toEqual({
        errorType: "ASTROPARSE::PARSER_ATOM_END::INPUT_NOT_END"
    })

    expect(result.input.cursor).toEqual(0)
})
