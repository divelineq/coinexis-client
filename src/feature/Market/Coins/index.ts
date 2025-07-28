import type { TickersValidationType } from "src/api/tickers";
import type { DefaultResponse } from "src/api/types";
import type { TableSource } from "../types";
import { useDefaultColumns } from "./useDefaultColumns";
import { useQueryCoins } from "./useQueryCoins";

type Params = {
	category: string;
	symbol?: string;
	baseCoin?: string;
	expDate?: string;
};

export function getCoinsTableSource(
	params: Params,
): TableSource<DefaultResponse<TickersValidationType>> {
	return {
		queryResult: useQueryCoins(params),
		defaultColumns: useDefaultColumns(),
	};
}
