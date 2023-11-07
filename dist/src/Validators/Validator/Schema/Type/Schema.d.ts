import { ValidatorInterface } from "../../ValidatorInterface";
export interface Schema {
    [key: string]: ValidatorInterface;
}
