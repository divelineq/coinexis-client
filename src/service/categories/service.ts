import { categoriesApi } from "@api";
import type { CategoriesServiceType } from "./types";

export const categoriesService = {
	getCategories: async (
		signal: AbortSignal,
	): Promise<CategoriesServiceType> => {
		const res = await categoriesApi.getMany(signal);

		return {
			data: res,
			lengthData: res.length,
		};
	},
};
