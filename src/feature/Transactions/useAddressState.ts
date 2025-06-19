import { parseAsString, useQueryState } from "nuqs";

export function useAddressState() {
	return useQueryState("address", parseAsString);
}
