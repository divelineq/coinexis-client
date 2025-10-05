import axios from "axios";
import type {
	AccountCoinsBalanceParams,
	AccountCoinsBalanceResponse,
} from "../../../dto";

export class AccountCoinsBalance {
	public async getOne(signal: AbortSignal, params: AccountCoinsBalanceParams) {
		const res = await axios.get<AccountCoinsBalanceResponse>(
			`api/asset/transfer/query-account-coins-balance?accountType=${params.accountType}&coin=${params.coin}`,
			{ signal },
		);

		return res.data;
	}

	public async getMany(
		signal: AbortSignal,
		params: Pick<AccountCoinsBalanceParams, "accountType">,
	) {
		const res = await axios.get<AccountCoinsBalanceResponse[]>(
			`api/asset/transfer/query-account-coins-balance?accountType=${params.accountType}`,
			{ signal },
		);

		return res.data;
	}
}
