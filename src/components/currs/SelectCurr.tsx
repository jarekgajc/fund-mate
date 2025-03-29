import {Curr} from "../../models/Curr.ts";
import {MenuItem, Select} from "@mui/material";

interface Props {
    value: Curr;
    onChange: (value: Curr) => void;
}

export function SelectCurr(props: Props) {
    return (
        <Select
            value={props.value}
            onChange={event => props.onChange(event.target.value as Curr)}
            label="Currency"
        >
            {Object.values(Curr).map((curr) => (
                <MenuItem key={curr} value={curr}>
                    {curr}
                </MenuItem>
            ))}
        </Select>
    )
}