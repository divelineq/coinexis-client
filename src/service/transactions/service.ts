import { transactionsApi } from "../../api/transactions";

export const transactionService = {
	async getTransactions(adress: string, limit: number, offset: number) {
		return transactionsApi.getMany(adress, limit, offset);
	},
};
