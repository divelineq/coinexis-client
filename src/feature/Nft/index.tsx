import { WalletField } from "@ui";
import { parseAsString, useQueryState } from "nuqs";
import { Cards } from "./Cards";
import { useNft } from "./useNft";
import { usePaginationState } from "./usePaginationState";

function Nft() {
	const [wallet, setWallet] = useQueryState(
		"wallet",
		parseAsString.withOptions({ clearOnDefault: false }),
	);
	const [pagination, setPagination] = usePaginationState();
	const { data, isLoading, error, isFetched, isFetching } = useNft(
		wallet,
		pagination.pageIndex * pagination.pageSize,
		pagination.pageSize,
	);

	return (
		<div className="p-4">
			<WalletField onChange={setWallet} isPending={isLoading} />
			<Cards
				error={error}
				data={data}
				isLoading={isLoading}
				pagination={pagination}
				onPageChange={setPagination}
				shouldShowSkeleton={!isFetched && isFetching}
			/>
		</div>
	);
}

export { Nft };
