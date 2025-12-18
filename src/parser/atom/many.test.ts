import { parserAtomMany } from "@src/parser/atom/many"
import { parserAtomPredicate } from "@src/parser/atom/predicate"
import { parserAtomCharacter } from "@src/parser/atom/character"
import { parserAtomTry } from "@src/parser/atom/try"
import type { ParseInput } from "@src/type"
import { test, expect } from "bun:test"

const INPUT : ParseInput = {
    data: "AAC",
    cursor: 0
}

const ERROR = "ERROR" as const

test("parserAtomMany collects results until the inner parser errors", () => {
    const parser = parserAtomMany(
        parserAtomTry(
            parserAtomPredicate(
                parserAtomCharacter,
                (x) => x == "A"
                    ? { success: true }
                    : { success: false, error: ERROR }
            )
        )
    )

    const result = parser(INPUT)
    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toEqual(["A", "A"])
    expect(result.input.cursor).toEqual(2)
})

test("parserAtomMany errors if the inner parser errors and consumes input", () => {
    const parser = parserAtomMany(
        parserAtomPredicate(
            parserAtomCharacter,
            (x) => x == "A"
                ? { success: true }
                : { success: false, error: ERROR }
        )
    )

    const result = parser(INPUT)
    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.error).toEqual(ERROR)
    expect(result.input.cursor).toEqual(3)
})
