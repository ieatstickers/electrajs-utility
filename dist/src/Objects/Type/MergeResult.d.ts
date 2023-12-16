export type MergeResult<T extends any[]> = T extends [infer First, ...infer Rest] ? First & MergeResult<Rest> : unknown;
