import { http, HttpResponse } from "msw";
import type { ManyCoinsType } from "src/api/coins/types";

export const allAssetsHandler = [
	http.get<never, never, { data: ManyCoinsType[] }>(
		"https://api.mobula.io/api/1/all?fields=id%2Cname%2Clogo%2Cprice%2Cprice_change_1h%2Cprice_change_24h%2Cprice_change_7d%2Cprice_change_1m%2Cprice_change_1y%2Cvolume",
		({ request }) => {
			const auth = request.headers.get("Authorization");
			if (!auth || !auth.startsWith("Bearer ")) {
				return new HttpResponse(null, { status: 401 });
			}

			return HttpResponse.json({
				data: Array.from({ length: 30 }).map((_, i) => ({
					id: i + 1,
					name: `coin-${i}`,
					logo: "https://cryptologos.cc/logos/logo.svg",
					price: i + 20,
					volume: i + 4000,
					price_change_1h: i,
					price_change_24h: i,
					price_change_7d: i,
					price_change_1m: i,
					price_change_1y: i,
				})),
			});
		},
	),
];
