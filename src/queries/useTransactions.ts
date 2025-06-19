import type { SmartTransactions } from "@api";
import { transactionService } from "@service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useTransactions(
	address: string | null,
	limit: number,
	offset: number,
) {
	return useQuery<SmartTransactions>({
		queryKey: ["wallet-portfolio", address, limit, offset],
		queryFn: () => transactionService.getTransactions(address, limit, offset),
		enabled: !!address,
		placeholderData: keepPreviousData,
	});
}
