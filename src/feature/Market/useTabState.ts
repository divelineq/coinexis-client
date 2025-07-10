import { parseAsStringEnum, useQueryState } from "nuqs";
import { Tab } from "./enums";

export function useTabState() {
	return useQueryState(
		"tab",
		parseAsStringEnum(Object.values(Tab)).withDefault(Tab.All),
	);
}
