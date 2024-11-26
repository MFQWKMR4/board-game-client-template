
type MatchFn<T extends string | number | symbol, R> = (value: T, cases: Record<T, R>, defaultCase: R) => R;

export const match: MatchFn<any, any> = (value, cases, defaultCase) =>
    value in cases ? cases[value] : defaultCase;


export const ifThen = <T, R>(condition: boolean, then: () => T, otherwise: () => R): T | R =>
    condition ? then() : otherwise();