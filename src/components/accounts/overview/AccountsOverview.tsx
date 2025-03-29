import {useStore} from "../../../contexts/StoreContext.tsx";
import {Curr} from "../../../models/Curr.ts";
import {DateUtils} from "../../../utils/DateUtils.ts";
import dayjs from "dayjs";

export function AccountsOverview() {
    const store = useStore();

    let curr = DateUtils.findClosestDate(Object.keys(store.save.market.curr), dayjs().format("YYYY-MM-DD"));
    if (!curr) {
        return <div>No data</div>;
    }

    let a = store.save.market.curr[curr];
    a[Curr.PLN] = 1;

    let sum = 0;
    store.save.accounts.map(account => {
        account.subaccounts.forEach(subaccount => {
            sum += subaccount.value * a[subaccount.curr];
        });
    });

    return (
        <>
            {sum}
        </>
    );
}