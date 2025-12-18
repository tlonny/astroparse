import { parserAtomMapError } from "@src/parser/atom/map/error"
import { parserAtomCharacter } from "@src/parser/atom/character"
import { test, expect } from "bun:test"

const INPUT = { data: "xy", cursor: 0 }
const MAP_FN = () => "MAPPED"

test("parserAtomMapError returns original success result unchanged", () => {
    const parser = parserAtomMapError(parserAtomCharacter, MAP_FN)
    const result = parser(INPUT)
    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toEqual("x")
    expect(result.input.cursor).toEqual(1)
})

test("parserAtomMapError maps error when parse fails", () => {
    const parser = parserAtomMapError(parserAtomCharacter, MAP_FN)
    const result = parser({ ...INPUT, cursor: 2 })
    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.error).toEqual("MAPPED")
    expect(result.input.cursor).toEqual(2)
})
