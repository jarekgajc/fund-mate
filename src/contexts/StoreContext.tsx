import {Save, SaveUtils} from "../models/Save.ts";
import {create} from "zustand/react";
import {Account} from "../models/accounts/Account.ts";
import {ArrayUtils} from "../utils/ArrayUtils.ts";

type Store = {
    save: Save;
    addAccount: (account: Account) => void;
    updateAccount: (index: number, account: Account) => void;
    deleteAccount: (index: number) => void;
}

export const useStore = create<Store>()((set) => ({
    save: SaveUtils.read() || {
        accounts: [],
        balanceMap: {},
        market: {
            curr: {}
        }
    } as Save,

    addAccount: (account: Account) => set(state => {
        return saveKey(state, "accounts", ArrayUtils.addItem(state.save.accounts, account))
    }),

    updateAccount: (index: number, account: Account) => set(state => {
        return saveKey(state, "accounts", ArrayUtils.updateItem(state.save.accounts, index, account))
    }),

    deleteAccount: (index: number) => set(state => {
        return saveKey(state, "accounts", ArrayUtils.removeItem(state.save.accounts, index))
    }),
}))

function saveKey<T extends keyof Save>(state: Store, key: T, value: Save[T]) {
    let result = {...state.save, [key]: value};
    SaveUtils.write(result);
    return {save: result}
}