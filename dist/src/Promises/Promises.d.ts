import { PromiseMap } from "./Type/PromiseMap";
import { ResolvedPromiseMap } from "./Type/ResolvedPromiseMap";
export declare class Promises {
    static all<Promises extends PromiseMap>(promises: Promises): Promise<ResolvedPromiseMap<Promises>>;
}
