import type { CategoriesType } from "@api";

export type CategoriesServiceResponse = {
	data: CategoriesType[];
	total: number;
};
