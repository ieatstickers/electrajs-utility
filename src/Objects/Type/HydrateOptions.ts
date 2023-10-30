import { HydrateModeEnum } from "../Enum/HydrateModeEnum";
import { HydrateMutators } from "./HydrateMutators";

export type HydrateOptions<Dest extends Object, Src extends Object> = {
  mode?: HydrateModeEnum,
  mutators?: HydrateMutators<Dest, Src>,
  includeNullValues?: boolean,
  includeMethods?: boolean
}
