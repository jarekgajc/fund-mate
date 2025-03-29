import {TextField} from "@mui/material";
import {Subaccount} from "../../../models/accounts/Subaccount.ts";
import {SelectCurr} from "../../currs/SelectCurr.tsx";

interface Props {
    value: Subaccount;
    onChange: (subaccount: Subaccount) => void;
}

export function SubaccountForm(props: Props) {

    function setKey<T extends keyof Subaccount>(key: T, value: Subaccount[T] | any) {
        const result = {...props.value};
        result[key] = value;
        props.onChange(result);
    }

    return (
        <>
            <SelectCurr value={props.value.curr} onChange={curr => setKey("curr", curr)}/>
            <TextField type={"number"} value={props.value.value} onChange={event => setKey("value", event.target.value)}/>
        </>
    )
}