import axios from "axios";
import type { AccountType } from "../types/common";
import type { WalletBalanceResponse } from "./types";

export class WalletBalance {
	public async getMany(signal: AbortSignal, accountType: AccountType) {
		const res = await axios.get<WalletBalanceResponse>(
			`/api/wallet-balance?accountType=${accountType}`,
			{ signal },
		);

		return res.data;
	}
}
