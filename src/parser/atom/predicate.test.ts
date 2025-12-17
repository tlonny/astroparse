import { parserAtomPredicate } from "@src/parser/atom/predicate"
import { parserAtomToken } from "@src/parser/atom/token"
import { test, expect } from "bun:test"

const predicateIsA = parserAtomPredicate(
    parserAtomToken,
    (value) => value === "a"
        ? { success: true }
        : { success: false, error: { errorType: "NOT_A" } }
)

test("parserAtomPredicate propagates inner parser errors", () => {
    const result = predicateIsA({ data: "a", cursor: 1 })
    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.error).toEqual({ errorType: "ASTROPARSE::PARSER_ATOM_TOKEN::INPUT_END" })
    expect(result.input.cursor).toEqual(1)
})

test("parserAtomPredicate returns value if predicate passes", () => {
    const result = predicateIsA({ data: "ab", cursor: 0 })
    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toEqual("a")
    expect(result.input.cursor).toEqual(1)
})

test("parserAtomPredicate returns error when predicate fails", () => {
    const result = predicateIsA({ data: "cb", cursor: 0 })
    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.error).toEqual({ errorType: "NOT_A" })
    expect(result.input.cursor).toEqual(1)
})
