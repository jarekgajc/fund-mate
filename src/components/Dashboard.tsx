import {AccountsView} from "./accounts/AccountsView.tsx";
import {AccountsOverview} from "./accounts/overview/AccountsOverview.tsx";
import {SimulationsView} from "./simulations/SimulationsView.tsx";

export function Dashboard() {


    return (
        <>
            <AccountsOverview/>
            <AccountsView/>
            <SimulationsView/>
        </>
    )
}