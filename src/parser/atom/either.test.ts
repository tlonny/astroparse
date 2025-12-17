import { parserAtomEither } from "@src/parser/atom/either"
import { parserAtomError } from "@src/parser/atom/error"
import { parserAtomMapValue } from "@src/parser/atom/map/value"
import { parserAtomSequence } from "@src/parser/atom/sequence"
import { parserAtomToken } from "@src/parser/atom/token"
import { parserAtomValue } from "@src/parser/atom/value"
import type { ParseInput } from "@src/type"
import { test, expect } from "bun:test"

const INPUT : ParseInput = {
    data: "hello world",
    cursor: 0
}

test("parserAtomEither selects the first successful parse", () => {
    const parser = parserAtomEither([
        parserAtomToken,
        parserAtomToken,
        parserAtomMapValue(parserAtomToken, () => 5)
    ])

    const result = parser(INPUT)
    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toBe("h")
    expect(result.input.cursor).toEqual(1)
})

test("parserAtomEither selects the first successful parse", () => {
    const parser = parserAtomEither([
        parserAtomError("error"),
        parserAtomToken,
        parserAtomMapValue(parserAtomToken, () => 5)
    ])

    const result = parser(INPUT)
    expect(result.success).toBe(true)
    if (!result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.value).toEqual("h")
    expect(result.input.cursor).toEqual(1)
})

test("parserAtomEither returns the last error if all parsers error", () => {
    const parser = parserAtomEither([
        parserAtomError(5),
        parserAtomError("error"),
        parserAtomError("errorFinal"),
    ])

    const result = parser(INPUT)
    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.input.cursor).toEqual(0)
    expect(result.error).toEqual("errorFinal")
})

test("parserAtomEither errors if an errored parser consumes input", () => {
    const parser = parserAtomEither([
        parserAtomSequence([
            parserAtomToken,
            parserAtomError("errorFirst")
        ]),
        parserAtomValue("yo")
    ])

    const result = parser(INPUT)
    expect(result.success).toBe(false)
    if (result.success) {
        throw new Error("Unexpected success")
    }

    expect(result.input.cursor).toEqual(1)
    expect(result.error).toEqual("errorFirst")
})
