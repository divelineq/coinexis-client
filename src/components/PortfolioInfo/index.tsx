import { WalletField } from "@ui";
import { usePortfolio } from "../../queries/usePortfolio";
import { PortfolioTable } from "./PortfolioTable";

function SearchWalletInfo() {
	const { mutate, data, isPending, error } = usePortfolio();

	if (error) return <div>{error.message}</div>;

	return (
		<div>
			<WalletField onChange={mutate} isPending={isPending} />
			{data && (
				<div>
					<div className="flex text-2xl justify-center gap-2">
						<p>Total balance:</p>
						<p>{data.totalPrice}$</p>
					</div>
					<div>
						<PortfolioTable data={data.portfolio} />
					</div>
				</div>
			)}
		</div>
	);
}

export { SearchWalletInfo };
