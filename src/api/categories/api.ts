import { httpClient } from "../httpClient";
import type { CategoriesType } from "./dto";

export const categoriesApi = {
	getMany: async (signal: AbortSignal) => {
		const res = await httpClient.get<CategoriesType[]>("/metadata/categories", {
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
			},
			signal,
		});

		return res.data;
	},
};
