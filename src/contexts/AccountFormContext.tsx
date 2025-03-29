import {createContext, useContext, useState} from "react";
import {Account} from "../models/accounts/Account.ts";
import {ObjectUtils} from "../utils/ObjectUtils.ts";
import {AccountForm} from "../components/accounts/AccountForm.tsx";
import {Dialog} from "@mui/material";
import {useToggle} from "../hooks/UseToggle.ts";

type State = {
    edit: (value: Account | undefined, onSave: (v: Account) => void) => void;
}

// @ts-ignore
const Context = createContext<State>();

export const useAccountForm = () => useContext(Context);

export function AccountFormProvider({ children }: { children: React.ReactNode }) {
    const [account, setAccount] = useState<{ value: Account | undefined, onSave: (v: Account) => void }>(null!);
    const [open, toggleOpen] = useToggle();

    function edit(value: Account | undefined, onSave: (v: Account) => void) {
        console.log(value);
        setAccount({ value: value && ObjectUtils.deepClone(value), onSave });
        toggleOpen();
    }

    function save(value: Account) {
        account.onSave(value);
        toggleOpen();
    }

    return (
        <Context.Provider value={{ edit }}>
            {open && (
                <Dialog open={open}>
                    <AccountForm value={account.value} onSave={save} onCancel={toggleOpen}/>
                </Dialog>
            )}
            {children}
        </Context.Provider>
    );
}