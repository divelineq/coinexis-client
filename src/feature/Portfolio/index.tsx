import { Table, WalletField } from "@ui";
import { parseAsString, useQueryState } from "nuqs";
import { DEFAULT_PORTFOLIO_COLUMNS } from "./defaultColumns";
import { usePaginationState } from "./usePaginationState";
import { usePortfolio } from "./usePortfolio";

function Portfolio() {
	const [pagination, setPagination] = usePaginationState();

	const [address, setAddress] = useQueryState("address", parseAsString);
	const { data, isLoading, error, isFetched, isFetching } =
		usePortfolio(address);

	if (error) return <div>{error.message}</div>;

	if (data?.portfolio.assets.length === 0) {
		return (
			<div className="w-full flex justify-center p-4">
				Нет данных для отображения
			</div>
		);
	}

	return (
		<div className="p-4">
			<WalletField onChange={setAddress} isPending={isLoading} />
			{data && (
				<div>
					<div className="flex text-2xl justify-center gap-2 pt-2">
						<p>
							Balance:{" "}
							<span>
								{Number(data.totalPrice).toLocaleString("en-US", {
									style: "currency",
									currency: "USD",
								})}
								$
							</span>
						</p>
					</div>
					<div>
						<Table
							shouldShowSkeleton={!isFetched && isFetching}
							pagination={pagination}
							onPaginationChange={setPagination}
							searchId="asset_name"
							defaultColumns={DEFAULT_PORTFOLIO_COLUMNS}
							data={data?.portfolio.assets ?? []}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export { Portfolio };
