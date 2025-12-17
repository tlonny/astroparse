import { parserAtomPeek } from "@src/parser/atom/peek"
import { parserAtomToken } from "@src/parser/atom/token"
import { parserAtomPredicate } from "@src/parser/atom/predicate"
import { test, expect } from "bun:test"

const INPUT = { data: "ok", cursor: 0 }

test("parserAtomPeek returns value without consuming input on success", () => {
    const peekToken = parserAtomPeek(parserAtomToken)
    const result = peekToken(INPUT)
    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toEqual("o")
    expect(result.input.cursor).toEqual(0)
})

test("parserAtomPeek propagates consumption when wrapped parser fails", () => {
    const alwaysFailPredicate = parserAtomPredicate(
        parserAtomToken,
        () => ({ success: false, error: { errorType: "ALWAYS_FALSE" } })
    )
    const peekPredicate = parserAtomPeek(alwaysFailPredicate)

    const result = peekPredicate(INPUT)
    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.error).toEqual({ errorType: "ALWAYS_FALSE" })
    expect(result.input.cursor).toEqual(1)
})
