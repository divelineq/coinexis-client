import { getCategoriesSelectedData } from "./Categories";
import { getCoinsSelectedData } from "./Coins";
import { Market as MarketComponent } from "./Market";
import { Skeleton } from "./Skeleton";
import { Tab } from "./enums";
import type { SelectedData, SelectedDataAll } from "./types";
import { usePaginationState } from "./usePaginationState";
import { useTabState } from "./useTabState";

const TAB_OPTIONS = [
	{ id: Tab.All, label: "All Coins" },
	{ id: Tab.Categories, label: "Categories" },
];

function BaseMarket() {
	const [selectedTab, setSelectedTab] = useTabState();
	const [pagination, setPagination] = usePaginationState();
	const currentData: Record<Tab, SelectedData<SelectedDataAll>> = {
		[Tab.All]: getCoinsSelectedData(pagination),
		[Tab.Categories]: getCategoriesSelectedData(),
	};

	return (
		<MarketComponent
			{...currentData[selectedTab]}
			pagination={pagination}
			onPaginationChange={setPagination}
			selectedTab={selectedTab}
			onSelectedTabChange={setSelectedTab}
			tabOptions={TAB_OPTIONS}
		/>
	);
}

export const Market = Object.assign(BaseMarket, { Skeleton });
