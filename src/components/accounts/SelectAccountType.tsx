import {MenuItem, Select} from "@mui/material";
import {AccountType} from "../../models/accounts/AccountType.ts";

interface Props {
    value: AccountType;
    onChange: (value: AccountType) => void;
}

export function SelectAccountType(props: Props) {
    return (
        <Select
            value={props.value}
            onChange={event => props.onChange(event.target.value as AccountType)}
            label="AccountType"
        >
            {Object.values(AccountType).map((curr) => (
                <MenuItem key={curr} value={curr}>
                    {curr}
                </MenuItem>
            ))}
        </Select>
    )
}