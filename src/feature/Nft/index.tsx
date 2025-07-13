import { WalletField } from "@ui";
import { parseAsString, useQueryState } from "nuqs";
import { Cards } from "./Cards";
import { useNft } from "./useNft";
import { usePaginationState } from "./usePaginationState";

function Nft() {
	const [address, setAddress] = useQueryState(
		"address",
		parseAsString.withOptions({ clearOnDefault: false }),
	);
	const [pagination, setPagination] = usePaginationState();
	const { data, isLoading, error, isRefetching } = useNft(
		address,
		pagination.pageIndex * pagination.pageSize,
		pagination.pageSize,
	);

	if (error) return <div className="m-auto p-6">{error.message}</div>;

	return (
		<div className="p-4">
			<WalletField onChange={setAddress} isPending={isLoading} />
			<Cards
				data={data}
				pagination={pagination}
				onPageChange={setPagination}
				isRefetching={isRefetching}
			/>
		</div>
	);
}

export { Nft };
