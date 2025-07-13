import { useState } from "react";
import { getCategoriesTableSource } from "./Categories";
import { getCoinsTableSource } from "./Coins";
import { Market as MarketComponent } from "./Market";
import { Skeleton } from "./Skeleton";
import type { SelectedDataAll, TableSource } from "./types";
import { usePaginationState } from "./usePaginationState";

enum Tab {
	All = "all",
	Categories = "categories",
}

const TAB_OPTIONS = [
	{ id: Tab.All, label: "All Coins" },
	{ id: Tab.Categories, label: "Categories" },
];

function BaseMarket() {
	const [selectedTab, setSelectedTab] = useState(Tab.All);
	const [pagination, setPagination] = usePaginationState(50);
	const tableSources: Record<Tab, TableSource<SelectedDataAll>> = {
		[Tab.All]: getCoinsTableSource(pagination),
		[Tab.Categories]: getCategoriesTableSource(),
	};

	return (
		<MarketComponent
			{...tableSources[selectedTab]}
			pagination={pagination}
			onPaginationChange={setPagination}
			value={selectedTab}
			onChange={setSelectedTab}
			tabOptions={TAB_OPTIONS}
		/>
	);
}

export const Market = Object.assign(BaseMarket, { Skeleton });
