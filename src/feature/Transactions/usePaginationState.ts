import { parseAsInteger, useQueryStates } from "nuqs";

export function usePaginationState() {
	return useQueryStates(
		{
			pageIndex: parseAsInteger.withDefault(0),
			pageSize: parseAsInteger.withDefault(50),
		},
		{ history: "push" },
	);
}
