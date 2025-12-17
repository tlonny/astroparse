import { parserAtomTry } from "@src/parser/atom/try"
import { parserAtomToken } from "@src/parser/atom/token"
import { parserAtomPredicate } from "@src/parser/atom/predicate"
import { test, expect } from "bun:test"

const INPUT = { data: "hi", cursor: 0 }

test("parserAtomTry returns inner success result and keeps input advance", () => {
    const tryToken = parserAtomTry(parserAtomToken)
    const result = tryToken(INPUT)
    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toEqual("h")
    expect(result.input.cursor).toEqual(1)
})

test("parserAtomTry rewinds input when wrapped parser fails", () => {
    const alwaysFailPredicate = parserAtomPredicate(
        parserAtomToken,
        () => ({ success: false, error: { errorType: "ALWAYS_FALSE" } })
    )
    const tryPredicate = parserAtomTry(alwaysFailPredicate)

    const result = tryPredicate(INPUT)
    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.error).toEqual({ errorType: "ALWAYS_FALSE" })
    expect(result.input.cursor).toEqual(0)
})
