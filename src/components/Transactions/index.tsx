import { WalletField } from "@ui";
import { useTransactions } from "../../queries/useTransactions";
import { TransactionsInfo } from "./TransactionsInfo";

function Transactions() {
	const { mutate, data, isPending, error } = useTransactions();

	return (
		<div>
			<WalletField onChange={mutate} isPending={isPending} />
			<TransactionsInfo data={data} error={error} />
		</div>
	);
}

export { Transactions };
