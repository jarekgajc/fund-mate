import {Button, Card, CardActions, CardContent, Grid2} from "@mui/material";
import {useStore} from "../../contexts/StoreContext.tsx";
import {AccountFormProvider, useAccountForm} from "../../contexts/AccountFormContext.tsx";
import {AccountView} from "./AccountView.tsx";


export function AccountsView() {
    return (
        <AccountFormProvider>
            <Component/>
        </AccountFormProvider>
    )
}

function Component() {
    const store = useStore();
    const accountForm = useAccountForm();

    return (
        <>
            <Grid2 container spacing={2}>
                {store.save.accounts.map((account, i) => (
                    <Grid2 size={4} key={i}>
                        <Card>
                            <CardContent>
                                <AccountView account={account}/>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => accountForm.edit(account, v => store.updateAccount(i, v))}>
                                    Edit
                                </Button>
                                <Button size="small" color="error" onClick={() => store.deleteAccount(i)}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
            <Button onClick={() => accountForm.edit(undefined, v => store.addAccount(v))}>Add Account</Button>
        </>
    )
}