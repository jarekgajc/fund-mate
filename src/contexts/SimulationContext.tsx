import {createContext, useContext, useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {TimePeriodType} from "../models/TimePeriod.ts";

type State = {
    times: Dayjs[];
    setTimePeriod: (timePeriod: TimePeriodType) => void;
}

// @ts-ignore
const Context = createContext<State>();

export const useSimulation = () => useContext(Context);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
    const [times, setTimes] = useState<Dayjs[]>([]);

    useEffect(() => {
        setTimePeriod("year");
    }, []);

    function setTimePeriod(timePeriod: TimePeriodType) {
        const result = [];
        const to = dayjs().startOf("day");
        let time = to.subtract(1, timePeriod);
        while (!to.isBefore(time, "day")) {
            result.push(time);
            time = time.add(30, "day");
        }
        setTimes(result);
    }

    return (
        <Context.Provider value={{ times, setTimePeriod }}>
            {times.length > 0 && children}
        </Context.Provider>
    );
}