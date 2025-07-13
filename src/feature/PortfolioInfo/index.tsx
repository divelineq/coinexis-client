import { WalletField } from "@ui";
import { parseAsString, useQueryState } from "nuqs";
import { PortfolioTable } from "./PortfolioTable";
import { usePortfolio } from "./usePortfolio";

function PortfolioInfo() {
	const [address, setAddress] = useQueryState("address", parseAsString);
	const { data, isLoading, error, isFetched, isFetching } =
		usePortfolio(address);

	if (error) return <div>{error.message}</div>;

	return (
		<div className="p-4">
			<WalletField onChange={setAddress} isPending={isLoading} />
			{data && (
				<div>
					<div className="flex text-2xl justify-center gap-2 pt-2">
						<p>Balance:</p>
						<p>
							{Number(data.totalPrice).toLocaleString("en-US", {
								style: "currency",
								currency: "USD",
							})}
							$
						</p>
					</div>
					<div>
						<PortfolioTable
							data={data.portfolio}
							shouldShowSkeleton={!isFetched && isFetching}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export { PortfolioInfo };
