import { type SmartTransactions, api } from "@api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useTransactions(
	address: string | null,
	limit: number,
	offset: number,
) {
	return useQuery<SmartTransactions>({
		queryKey: ["wallet-portfolio", address, limit, offset],
		queryFn: () => api.transactions.getMany(address, limit, offset),
		enabled: !!address,
		placeholderData: keepPreviousData,
	});
}
