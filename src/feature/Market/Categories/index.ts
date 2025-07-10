import type { CategoriesServiceResponse } from "@service";
import type { TableSource } from "../types";
import { DEFAULT_CATEGORIES_COLUMNS } from "./defaultColumns";
import { useCategories } from "./useCategories";

export function getCategoriesTableSource(): TableSource<CategoriesServiceResponse> {
	return {
		queryResult: useCategories(),
		defaultColumns: DEFAULT_CATEGORIES_COLUMNS,
	};
}
