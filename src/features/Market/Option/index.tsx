import { TickerCategory } from "@api";
import type { CategoryData } from "../types";
import { DEFAULT_COLUMNS } from "./defaultColumns";

export const OptionData: CategoryData = {
	params: {
		category: TickerCategory.Option,
	},
	columns: DEFAULT_COLUMNS,
};
