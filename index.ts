import {
    parserAtomMapValue,
    parserAtomSequence,
    parserAtomToken,
    parserAtomTry,
    parserAtomPredicate,
    parserText,
    parserWhitespace,
    parserAtomMany
} from "@src/index"

const parserName = parserAtomMapValue(
    parserAtomMany(
        parserAtomTry(
            parserAtomPredicate(
                parserAtomToken,
                c => /[a-zA-Z]/.test(c)
                    ? { success: true }
                    : { success: false, error: null }
            )
        )
    ),
    (chars) => chars.join("").toUpperCase()
)


const parserShout = parserAtomMapValue(
    parserAtomSequence([
        parserText({ word: "hello" }),
        parserWhitespace,
        parserName
    ]),
    ([,, name]) => `Hello, ${name}!`
)

const result = parserShout({ data: "hello \tsteven", cursor: 0 })

if (result.success) {
    console.log(result.value) // Hello, STEVEN!
} else {
    console.error(result.error)
}
