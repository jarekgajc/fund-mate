import {AccountType} from "./AccountType.ts";
import {Subaccount} from "./Subaccount.ts";

export type Account = {
    type: AccountType;
    subaccounts: Subaccount[];
    ts: Date;
}