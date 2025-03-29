import {Account} from "../../models/accounts/Account.ts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
    account: Account;
}

export function AccountView(props: Props) {
    return (
        <>
            <Typography gutterBottom variant="h5" component="div">
                {props.account.type}
            </Typography>
            {props.account.subaccounts.map((subaccount) => (
                <Box key={subaccount.curr}>
                    {subaccount.curr}
                    {subaccount.value}
                </Box>
            ))}
        </>
    )
}