import { useSimulation } from "../../contexts/SimulationContext.tsx";
import {LinearSimulation, LinearSimulationUtils} from "../../models/tests/LinearSimulation.ts";
import { LineChart } from '@mui/x-charts/LineChart';

interface Props {
    simulation: LinearSimulation;
}

export function SimulationView(props: Props) {
    const simulation = useSimulation();

    const result = LinearSimulationUtils.run(props.simulation, simulation.times[simulation.times.length - 1]);
    const resultTimes = Array.from(result.keys());
    const values = (simulation.times.map((time) => result.get(findClosestNumber(resultTimes, time.month() + 1 + time.year() * 100))));
    console.log(result);
    console.log(resultTimes);
    console.log(values);

    return (
        <>
            <LineChart
                xAxis={[{ data: simulation.times.map(time => time.month() + 1 + time.year() * 100),  }]}
                series={[
                    {
                        data: values,
                    },
                ]}
                width={500}
                height={300}
            />
        </>
    );
}

function replaceDuplicatesWithNull(arr: any[]): any[] {
    const seen = new Set();

    return arr.map((item) => {
        if (seen.has(item)) {
            return null; // Replace duplicate with null
        } else {
            seen.add(item);
            return item; // Keep the first occurrence
        }
    });
}

function findClosestNumber(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    let closest = arr[0];

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = arr[mid];

        // Check if the current mid is closer to the target than the closest
        if (Math.abs(midValue - target) < Math.abs(closest - target)) {
            closest = midValue;
        }

        // Binary search logic
        if (midValue < target) {
            left = mid + 1;
        } else if (midValue > target) {
            right = mid - 1;
        } else {
            return midValue; // Exact match found
        }
    }

    return closest; // Return the closest number found
}