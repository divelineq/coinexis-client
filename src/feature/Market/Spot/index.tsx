import { TickerCategory } from "@api";
import type { CategoryData } from "../types";
import { DEFAULT_COLUMNS } from "./defaultColumns";

export const SpotData: CategoryData = {
	params: {
		category: TickerCategory.Spot,
	},
	columns: DEFAULT_COLUMNS,
};
