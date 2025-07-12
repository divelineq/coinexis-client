import type { CategoriesServiceResponse } from "@service";
import type { TableSource } from "../types";
import { useCategories } from "./useCategories";
import { useDefaultColumns } from "./useDefaultColumns";

export function getCategoriesTableSource(): TableSource<CategoriesServiceResponse> {
	return {
		queryResult: useCategories(),
		defaultColumns: useDefaultColumns(),
	};
}
