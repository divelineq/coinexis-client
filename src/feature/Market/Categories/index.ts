import type { CategoriesServiceType } from "@service";
import type { SelectedData } from "../types";
import { DEFAULT_CATEGORIES_COLUMNS } from "./defaultColumns";
import { useCategories } from "./useCategories";

export function getCategoriesSelectedData(): SelectedData<CategoriesServiceType> {
	return {
		query: useCategories(),
		defaultColumns: DEFAULT_CATEGORIES_COLUMNS,
	};
}
