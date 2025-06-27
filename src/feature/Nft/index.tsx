import { WalletField } from "@ui";
import { parseAsString, useQueryState } from "nuqs";
import { Card } from "./Card";
import { useNft } from "./useNft";
import { usePaginationState } from "./usePaginationState";

function Nft() {
	const [address, setAddress] = useQueryState("address", parseAsString);
	const [pagination, setPagination] = usePaginationState();
	const { data, isLoading, error, isRefetching } = useNft(
		address,
		pagination.pageIndex * pagination.pageSize,
		pagination.pageSize,
	);

	if (error) return <div className="m-auto p-6">{error.message}</div>;

	return (
		<div>
			<WalletField onChange={setAddress} isPending={isLoading} />
			<Card
				data={data}
				pagination={pagination}
				onPageChange={setPagination}
				isRefetching={isRefetching}
			/>
		</div>
	);
}

export { Nft };
