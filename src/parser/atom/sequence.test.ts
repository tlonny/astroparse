import { parserAtomSequence } from "@src/parser/atom/sequence"
import { parserAtomError } from "@src/parser/atom/error"
import { parserAtomMapValue } from "@src/parser/atom/map/value"
import { parserAtomCharacter } from "@src/parser/atom/character"
import type { ParseInput } from "@src/type"
import { test, expect } from "bun:test"

const INPUT : ParseInput = {
    data: "hello world",
    cursor: 0
}

test("parserAtomSequence parses in sequence", () => {
    const parser = parserAtomSequence([
        parserAtomCharacter,
        parserAtomCharacter,
        parserAtomMapValue(parserAtomCharacter, () => 5)
    ])

    const result = parser(INPUT)
    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toEqual(["h", "e", 5])
    expect(result.input.cursor).toEqual(3)
})

test("parserAtomSequence returns the first error it encounters", () => {
    const parser = parserAtomSequence([
        parserAtomCharacter,
        parserAtomCharacter,
        parserAtomError("boom")
    ])

    const result = parser(INPUT)
    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.input.cursor).toEqual(2)
    expect(result.error).toEqual("boom")
})
