import {SimulationProvider} from "../../contexts/SimulationContext.tsx";
import {useStore} from "../../contexts/StoreContext.tsx";
import {SimulationView} from "./SimulationView.tsx";

export function SimulationsView() {
    return (
        <SimulationProvider>
            <Component/>
        </SimulationProvider>
    );
}

function Component() {
    const store = useStore();

    return (
        <>
            {store.save.simulations.map((simulation) => (
                <SimulationView simulation={simulation}/>
            ))}
        </>
    )

}