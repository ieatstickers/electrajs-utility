import { PromiseMap } from "./PromiseMap";

export type ResolvedPromiseMap<Promises extends PromiseMap> = {
  [K in keyof Promises]: Promises[K] extends Promise<infer R> ? R : never
};
