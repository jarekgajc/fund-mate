import {Curr} from "../Curr.ts";

export type Subaccount = {
    value: number;
    curr: Curr;
    ts: Date;
}