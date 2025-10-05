import { parseAsString, useQueryState } from "nuqs";

const DEFAULT_INTERVAL = "1";

export function useIntervalState() {
	return useQueryState("interval", parseAsString.withDefault(DEFAULT_INTERVAL));
}
