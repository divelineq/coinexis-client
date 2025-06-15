import type { SmartTransactions } from "@api";
import { transactionService } from "@service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useTransactions(adress: string, limit: number, offset: number) {
	return useQuery<SmartTransactions>({
		queryKey: ["wallet-portfolio", adress, limit, offset],
		queryFn: () => transactionService.getTransactions(adress, limit, offset),
		enabled: !!adress,
		placeholderData: keepPreviousData,
	});
}
