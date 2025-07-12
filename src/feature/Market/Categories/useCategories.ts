import { type CategoriesServiceResponse, categoriesService } from "@service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCategories() {
	return useQuery<CategoriesServiceResponse>({
		queryKey: ["categories"],
		queryFn: ({ signal }) => categoriesService.getCategories(signal),
		select: (data) => ({
			...data,
			data: data.data.filter((category) => category.name !== "All"),
		}),
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		refetchInterval: 30_000,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
}
