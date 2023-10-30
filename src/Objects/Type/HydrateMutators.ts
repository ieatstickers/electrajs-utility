
export type HydrateMutators<Dest extends Record<string | number, any>, Src extends Record<string | number, any>> = {
    [K in keyof Dest]?: (value: Dest[K]) => any
  }
  & {
  [K in keyof Src]?: (value: Src[K]) => any
};
