import dayjs, {Dayjs} from "dayjs";

export type LinearSimulation = {
    startValue: number;
    from: Date;
    frequency: number;
    percentage: number;
}

export const LinearSimulationUtils = {
    run(simulation: LinearSimulation, to: Dayjs) {
        let result: Map<number, number> = new Map();
        let value = simulation.startValue;
        let time = dayjs(simulation.from).startOf("day");
        let grow = 1 + simulation.percentage / 100;
        while (time.unix() < to.unix()) {
            result.set(time.month() + 1 + time.year() * 100, value);
            time = time.add(simulation.frequency, "day");
            value *= grow;
        }

        return result;
    }
}