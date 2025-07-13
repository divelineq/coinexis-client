import { parseAsInteger, useQueryStates } from "nuqs";

export function usePaginationState(pageSize?: number) {
	return useQueryStates(
		{
			pageIndex: parseAsInteger.withDefault(0),
			pageSize: parseAsInteger.withDefault(pageSize ?? 100),
		},
		{ history: "push" },
	);
}
