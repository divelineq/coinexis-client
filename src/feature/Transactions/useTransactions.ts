import { type SmartTransactions, api } from "@api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useTransactions(
	wallet: string | null,
	limit: number,
	offset: number,
) {
	return useQuery<SmartTransactions>({
		queryKey: ["wallet-portfolio", wallet, limit, offset],
		queryFn: () => api.transactions.getMany(wallet, limit, offset),
		enabled: !!wallet,
		placeholderData: keepPreviousData,
	});
}
