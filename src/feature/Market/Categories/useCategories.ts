import { type CategoriesServiceType, categoriesService } from "@service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GC_TIME_DEFAULT, STALE_TIME_DEFAULT } from "../consts";

export function useCategories() {
	return useQuery<CategoriesServiceType>({
		queryKey: ["categories"],
		queryFn: ({ signal }) => categoriesService.getCategories(signal),
		select: (data) => ({
			...data,
			data: data.data.filter((category) => category.name !== "All"),
		}),
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		refetchInterval: 30_000,
		staleTime: STALE_TIME_DEFAULT,
		gcTime: GC_TIME_DEFAULT,
	});
}
