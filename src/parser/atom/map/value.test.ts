import { parserAtomMapValue } from "@src/parser/atom/map/value"
import { parserAtomCharacter } from "@src/parser/atom/character"
import { test, expect } from "bun:test"

const INPUT = { data: "xy", cursor: 0 }
const MAP_FN = () => "MAPPED"

test("parserAtomMapValue applies mapping when parse succeeds", () => {
    const parser = parserAtomMapValue(parserAtomCharacter, MAP_FN)
    const result = parser(INPUT)
    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toEqual("MAPPED")
    expect(result.input.cursor).toEqual(1)
})

test("parserAtomMapValue returns error unchanged when parse fails", () => {
    const mapCharacter = parserAtomMapValue(parserAtomCharacter, MAP_FN)
    const result = mapCharacter({ ...INPUT, cursor: 2 })
    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.error).toEqual({ errorType: "ASTROPARSE::PARSER::ATOM::CHARACTER::INPUT_END" })
    expect(result.input.cursor).toEqual(2)
})
