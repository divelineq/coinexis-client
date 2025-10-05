import axios from "axios";
import type { WalletBalanceResponse } from "../dto";
import type { AccountType } from "../dto/common";

export class WalletBalance {
	public async getMany(signal: AbortSignal, accountType: AccountType) {
		const res = await axios.get<WalletBalanceResponse>(
			`/api/wallet-balance?accountType=${accountType}`,
			{ signal },
		);

		return res.data;
	}
}
