import { TickerCategory } from "@api";
import type { CategoryData } from "../types";
import { DEFAULT_COLUMNS } from "./defaultColumns";

export const LinearData: CategoryData = {
	params: {
		category: TickerCategory.Linear,
	},
	columns: DEFAULT_COLUMNS,
};
