import { TickerCategory } from "@api";
import { SpotData } from "./Spot";
import type { CategoriesMap } from "./types";

export const categoriesMap: CategoriesMap = new Map([
	[TickerCategory.Spot, SpotData],
]);
