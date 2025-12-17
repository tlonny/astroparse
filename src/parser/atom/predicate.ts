import type { ParseInput, Parser, ParseResult } from "@src/type"

export type ParserAtomPredicatePredicateResult<TErrorPred> =
    | { success: true, error?: never }
    | { success: false, error: TErrorPred }

export type ParserAtomPredicatePredicateFn<TValue, TErrorPred> = (
    value : TValue
) => ParserAtomPredicatePredicateResult<TErrorPred>

export const parserAtomPredicate = <TValue, TError, TErrorPred>(
    parser: Parser<TValue, TError>,
    predicateFn: ParserAtomPredicatePredicateFn<TValue, TErrorPred>
) => (input : ParseInput) : ParseResult<TValue, TError | TErrorPred> => {
        const result = parser(input)
        if (!result.success) {
            return result
        }

        const predicateResult = predicateFn(result.value)
        if (predicateResult.success) {
            return result
        }

        return {
            success: false,
            error: predicateResult.error,
            input: result.input
        }
    }
