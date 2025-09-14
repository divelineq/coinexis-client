import { TickerCategory } from "@api";
import type { CategoryData } from "../types";
import { DEFAULT_COLUMNS } from "./defaultColumns";

export const LinearData: CategoryData = {
	params: {
		category: TickerCategory.Linear,
	},
	columns: DEFAULT_COLUMNS,
};

export const InverseData: CategoryData = {
	params: {
		category: TickerCategory.Inverse,
	},
	columns: DEFAULT_COLUMNS,
};
