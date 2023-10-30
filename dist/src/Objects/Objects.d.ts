import { HydrateModeEnum } from "./Enum/HydrateModeEnum";
import { HydrateOptions } from "./Type/HydrateOptions";
export declare class Objects {
    static clone<T extends Record<string | number, any>>(obj: T): T;
    static hydrate<Dest extends Object, Src extends Object, Options extends HydrateOptions<Dest, Src>>(dest: Dest, source: Src, options?: Options): Options extends {
        mode: HydrateModeEnum.DEST_PROPERTIES;
    } ? Dest : Src & Dest;
    static getByKeyPath(keyPath: Array<string | number>, obj: {
        [key: string | number]: any;
    }, defaultValue?: any): any;
    static setByKeyPath(keyPath: Array<string | number>, value: any, obj: Object): Object;
}
