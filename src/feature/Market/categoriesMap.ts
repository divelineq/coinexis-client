import { TickerCategory } from "@api";
import { InverseData, LinearData } from "./LinearInverse";
import { OptionData } from "./Option";
import { SpotData } from "./Spot";
import type { CategoriesMap } from "./types";

export const categoriesMap: CategoriesMap = new Map([
	[TickerCategory.Spot, SpotData],
	[TickerCategory.Linear, LinearData],
	[TickerCategory.Inverse, InverseData],
	[TickerCategory.Option, OptionData],
]);
