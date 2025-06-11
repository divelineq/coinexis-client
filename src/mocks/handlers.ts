import { http, HttpResponse } from "msw";

export const handlers = [
	http.get("https://api.mobula.io/api/1/query", () => {
		return HttpResponse.json({
			id: "abc-123",
			logo: "John",
			price: 1,
			price_change_1h: 2,
			price_change_24h: 3,
			price_change_7d: 4,
			price_change_1m: 5,
		});
	}),
];
