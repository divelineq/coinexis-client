import { transactionsApi } from "../../api/transactions";

export const transactionService = {
	async getTransactions(adress: string) {
		return transactionsApi.getMany(adress);
	},
};
