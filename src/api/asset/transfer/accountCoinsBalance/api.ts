import axios from "axios";
import type {
	AccountCoinsBalanceParams,
	AccountCoinsBalanceResponse,
} from "../../../dto";

export class AccountCoinsBalance {
	public async getOne(params: AccountCoinsBalanceParams, signal: AbortSignal) {
		const res = await axios.get<AccountCoinsBalanceResponse>(
			`api/query-account-coins-balance?accountType=${params.accountType}&coin=${params.coin}`,
			{ signal },
		);

		return res.data;
	}

	public async getMany(
		params: Pick<AccountCoinsBalanceParams, "accountType">,
		signal: AbortSignal,
	) {
		const res = await axios.get<AccountCoinsBalanceResponse[]>(
			`api/query-account-coins-balance?accountType=${params.accountType}`,
			{ signal },
		);

		return res.data;
	}
}
