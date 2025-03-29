import {MenuItem, Select} from "@mui/material";
import {TimePeriod, TimePeriodType} from "../models/TimePeriod.ts";

interface Props {
    value: TimePeriodType;
    onChange: (value: TimePeriodType) => void;
}

export function SelectTimePeriod(props: Props) {
    return (
        <Select
            value={props.value}
            onChange={event => props.onChange(event.target.value as TimePeriodType)}
            label="TimePeriodType"
        >
            {Object.values(TimePeriod).map((value) => (
                <MenuItem key={value} value={value}>
                    {value}
                </MenuItem>
            ))}
        </Select>
    )
}