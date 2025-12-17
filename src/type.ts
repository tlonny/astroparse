export type ParseInput = Readonly<{
    data: string
    cursor: number
}>

export type ParseResultValue<TValue> = {
    success: true,
    input: ParseInput
    value: TValue
}

export type ParseResultError<TError> = {
    success: false,
    input: ParseInput
    error: TError,
}

export type ParseResult<TValue, TError> =
    | ParseResultValue<TValue>
    | ParseResultError<TError>

export type Parser<TValue, TError> = (
    input : ParseInput
) => ParseResult<TValue, TError>
