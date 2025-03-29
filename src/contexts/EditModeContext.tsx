import {createContext, useContext, useState} from "react";

type State = {
    active: boolean;
    setActive: (value: boolean) => void;
}

// @ts-ignore
const Context = createContext<State>();

export const useEditMode = () => useContext(Context);

export function EditModeProvider({ children }: { children: React.ReactNode }) {
    const [editMode, setEditMode] = useState(false);

    return (
        <Context.Provider value={{ active: editMode, setActive: setEditMode }}>
            {children}
        </Context.Provider>
    );
}