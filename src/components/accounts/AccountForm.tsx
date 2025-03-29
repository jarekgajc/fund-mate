import {Button} from "@mui/material";
import {Account} from "../../models/accounts/Account.ts";
import {useState} from "react";
import {AccountType} from "../../models/accounts/AccountType.ts";
import {SelectAccountType} from "./SelectAccountType.tsx";
import {Subaccount} from "../../models/accounts/Subaccount.ts";
import {ArrayUtils} from "../../utils/ArrayUtils.ts";
import {SubaccountForm} from "./subaccounts/SubaccountForm.tsx";
import {Curr} from "../../models/Curr.ts";

interface Props {
    value: Account | undefined;
    onSave: (account: Account) => void;
    onCancel: () => void;
}

export function AccountForm(props: Props) {
    const [account, setAccount] = useState<Account>(props.value || {
        type: AccountType.XTB,
        subaccounts: [],
        ts: new Date(),
    });

    function setKey<T extends keyof Account>(key: T, value: Account[T] | any) {
        const result = {...account};
        result[key] = value;
        setAccount(result);
    }

    function addSubaccount() {
        setKey("subaccounts", ArrayUtils.addItem(account.subaccounts, {
            value: 0,
            curr: Curr.PLN,
            ts: new Date(),
        }));
    }

    function updateSubaccount(index: number, subaccount: Subaccount) {
        setKey("subaccounts", ArrayUtils.updateItem(account.subaccounts, index, subaccount));
    }

    return (
        <>
            <SelectAccountType value={account.type} onChange={type => setKey("type", type)}/>
            {account.subaccounts.map((subaccount: Subaccount, index: number) => (
                <SubaccountForm key={index} value={subaccount} onChange={v => updateSubaccount(index, v)}/>
            ))}
            <Button onClick={addSubaccount}>Add Subaccount</Button>
            <Button onClick={() => props.onSave(account)}>Save</Button>
            <Button onClick={() => props.onCancel()}>Cancel</Button>
        </>
    )
}