import { http, HttpResponse } from "msw";
import type { SmartTransactions } from "src/api/transactions/dto";

export const transactionsHandler = [
	http.get<never, never, SmartTransactions>(
		"https://api.mobula.io/api/1/wallet/transactions?wallet=0xc58de0bc6548bbd6d9439c4f6abf51f717f5e74e&limit=10",
		({ request }) => {
			const auth = request.headers.get("Authorization");
			if (!auth || !auth.startsWith("Bearer ")) {
				return new HttpResponse(null, { status: 401 });
			}

			return HttpResponse.json({
				data: {
					transactions: Array.from({ length: 30 }, (_, i) => ({
						timestamp: Date.now(),
						asset: {
							name: `name-${i}`,
							symbol: `symbol-${i}`,
							id: i + 1,
							logo: "https://metacore.mobula.io/fde8226ca6b18057c48534006ee2482b83f7cf138a83e1d90ea53f65b76133ae.png",
							contract: `contract-${i}`,
						},
						type: "buy",
						method_id: `method_id-${i}`,
						hash: `hash-${i}`,
						blockchain: `blockchain-${i}`,
						amount: i + 500,
						amount_usd: i + 20,
						to: `to-${i}`,
						from: `from-${i}`,
					})),
					wallets: ["712yuh4j12j4901"],
				},
				details: 123,
				pagination: {
					page: 1,
					total: 1,
					limit: 10,
					offset: 0,
				},
			});
		},
	),
];
