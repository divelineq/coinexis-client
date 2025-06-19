import { transactionsApi } from "../../api/transactions";

export const transactionService = {
	async getTransactions(address: string | null, limit: number, offset: number) {
		return transactionsApi.getMany(address, limit, offset);
	},
};
