import { http, HttpResponse } from "msw";
import type { AllAssetsTypes } from "../useGetAllAssets/types";

export const allAssetsHandler = [
	http.get<never, never, { data: AllAssetsTypes[] }>(
		"https://api.mobula.io/api/1/all?fields=id%2Cname%2Clogo%2Cprice%2Cprice_change_1h%2Cprice_change_24h%2Cprice_change_7d%2Cprice_change_1m%2Cprice_change_1y%2Cvolume",
		({ request }) => {
			const auth = request.headers.get("Authorization");
			if (!auth || !auth.startsWith("Bearer ")) {
				return new HttpResponse(null, { status: 401 });
			}

			return HttpResponse.json({
				data: [
					{
						id: 1,
						name: "coin",
						logo: "https://cryptologos.cc/logos/logo.svg",
						price: 200,
						volume: 60_000,
						price_change_1h: 1,
						price_change_24h: 2,
						price_change_7d: 3,
						price_change_1m: 4,
						price_change_1y: 5,
					},
				],
			});
		},
	),
];
