import { getCategoriesTableSource } from "./Categories";
import { getCoinsTableSource } from "./Coins";
import { Market as MarketComponent } from "./Market";
import { Skeleton } from "./Skeleton";
import { Tab } from "./enums";
import type { SelectedDataAll, TableSource } from "./types";
import { usePaginationState } from "./usePaginationState";
import { useTabState } from "./useTabState";

const TAB_OPTIONS = [
	{ id: Tab.All, label: "All Coins" },
	{ id: Tab.Categories, label: "Categories" },
];

function BaseMarket() {
	const [selectedTab, setSelectedTab] = useTabState();
	const [pagination, setPagination] = usePaginationState();
	const tableSources: Record<Tab, TableSource<SelectedDataAll>> = {
		[Tab.All]: getCoinsTableSource(pagination),
		[Tab.Categories]: getCategoriesTableSource(),
	};

	return (
		<MarketComponent
			{...tableSources[selectedTab]}
			pagination={pagination}
			onPaginationChange={setPagination}
			selectedTab={selectedTab}
			onSelectedTabChange={setSelectedTab}
			tabOptions={TAB_OPTIONS}
		/>
	);
}

export const Market = Object.assign(BaseMarket, { Skeleton });
