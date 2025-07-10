import { categoriesApi } from "@api";
import type { CategoriesServiceResponse } from "./types";

export const categoriesService = {
	getCategories: async (
		signal: AbortSignal,
	): Promise<CategoriesServiceResponse> => {
		const res = await categoriesApi.getMany(signal);

		return {
			data: res,
			total: res.length,
		};
	},
};
