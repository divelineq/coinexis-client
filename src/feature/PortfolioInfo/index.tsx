import { WalletField } from "@ui";
import { parseAsString, useQueryState } from "nuqs";
import { PortfolioTable } from "./PortfolioTable";
import { usePortfolio } from "./usePortfolio";

function PortfolioInfo() {
	const [address, setAddress] = useQueryState("address", parseAsString);
	const { data, isLoading, error } = usePortfolio(address);

	if (error) return <div>{error.message}</div>;

	return (
		<div>
			<WalletField onChange={setAddress} isPending={isLoading} />
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

export { PortfolioInfo };
