import type { SmartTransactions } from "@api";
import { transactionService } from "@service";
import { useMutation } from "@tanstack/react-query";

export function useTransactions() {
	return useMutation<SmartTransactions, Error, string>({
		mutationKey: ["wallet-portfolio"],
		mutationFn: (adress: string) => transactionService.getTransactions(adress),
	});
}
