import { useRouter, useSearch } from "@tanstack/react-router";
import { getCoinsTableSource } from "./Coins";
import { Market as MarketComponent } from "./Market";
import { Skeleton } from "./Skeleton";
import type { SelectedDataAll, TableSource } from "./types";
import { usePaginationState } from "./usePaginationState";

const TAB_OPTIONS = [{ id: "all", label: "Spot" }];

function BaseMarket() {
	const router = useRouter();
	const { tab = "all" } = useSearch({ strict: false });

	const [pagination, setPagination] = usePaginationState(50);
	const tableSources: Record<string, TableSource<SelectedDataAll>> = {
		all: getCoinsTableSource({
			category: "spot",
		}),
	};

	const handleTabChange = (newTab: string) => {
		router.navigate({
			to: "/market",
			search: (prev: any) => ({ ...prev, tab: newTab }),
		});
		setPagination({ ...pagination, pageIndex: 0 });
	};

	return (
		<MarketComponent
			{...tableSources[tab]}
			pagination={pagination}
			onPaginationChange={setPagination}
			value={tab}
			onChange={handleTabChange}
			tabOptions={TAB_OPTIONS}
		/>
	);
}

export const Market = Object.assign(BaseMarket, { Skeleton });
