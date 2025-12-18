import { parserAtomCharacter } from "@src/parser/atom/character"
import { test, expect } from "bun:test"

test("parserAtomCharacter returns current character and advances input", () => {
    const result = parserAtomCharacter({ data: "abc", cursor: 1 })
    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toEqual("b")
    expect(result.input.cursor).toEqual(2)
})

test("parserAtomCharacter errors when at the end of the input", () => {
    const result = parserAtomCharacter({ data: "abc", cursor: 3 })
    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.error).toEqual({
        errorType: "ASTROPARSE::PARSER::ATOM::CHARACTER::INPUT_END"
    })

    expect(result.input.cursor).toEqual(3)
})
