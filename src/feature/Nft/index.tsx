import { useWebSocket } from "@hooks";
import { WalletField } from "@ui";
import { parseAsString, useQueryState } from "nuqs";
import { Cards } from "./Cards";
import { useNft } from "./useNft";
import { usePaginationState } from "./usePaginationState";

function Nft() {
	useWebSocket(["kline.1.BTCUSDT"], (_, __, data) => console.log(data[0]));

	const [address, setAddress] = useQueryState(
		"address",
		parseAsString.withOptions({ clearOnDefault: false }),
	);
	const [pagination, setPagination] = usePaginationState();
	const { data, isLoading, error, isFetched, isFetching } = useNft(
		address,
		pagination.pageIndex * pagination.pageSize,
		pagination.pageSize,
	);

	return (
		<div className="p-4">
			<WalletField onChange={setAddress} isPending={isLoading} />
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
