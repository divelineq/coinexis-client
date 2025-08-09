import { api } from "@api";

export const transactionService = {
	async getTransactions(address: string | null, limit: number, offset: number) {
		return api.transactions.getMany(address, limit, offset);
	},
};
