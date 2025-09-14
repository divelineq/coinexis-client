import { TickerCategory } from "@api";
import { LinearData } from "./Linear";
import { SpotData } from "./Spot";
import type { CategoriesMap } from "./types";

export const categoriesMap: CategoriesMap = new Map([
	[TickerCategory.Spot, SpotData],
	[TickerCategory.Linear, LinearData],
]);
