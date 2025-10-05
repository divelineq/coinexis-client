import type { TickerCategory } from "@api";

export interface CategoryData {
	params: {
		category: TickerCategory;
	};
	columns: any;
}

export type CategoriesMap = ReadonlyMap<TickerCategory, CategoryData>;
