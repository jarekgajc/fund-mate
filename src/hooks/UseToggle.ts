import {useState} from "react";

export function useToggle(): [boolean, () => void] {
    const [toggle, setToggle] = useState(false);

    return [toggle, () => setToggle(!toggle)];
}