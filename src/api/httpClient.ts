import axios from "axios";
import { toast } from "sonner";

export const httpModulaClient = axios.create({
	baseURL: "https://api.mobula.io/api/1",
	timeout: 15_000,
});

httpModulaClient.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err.response) {
			switch (err.response.status) {
				case 400:
					toast.error("Bad request");
					break;
				case 401:
					toast.error("Unauthorized");
					break;
				case 403:
					toast.error("Forbidden");
					break;
				case 404:
					toast.error("Not found");
					break;
				case 500:
					toast.error("Internal server error");
					break;
				default:
					toast.error("Unknown error");
			}
		}

		// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
		return Promise.reject(err);
	},
);

export const httpBinanceClient = axios.create({
	baseURL: "https://api.binance.com/api/v3",
	timeout: 15_000,
});

httpModulaClient.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err.response) {
			switch (err.response.status) {
				case 400:
					toast.error("Bad request");
					break;
				case 401:
					toast.error("Unauthorized");
					break;
				case 403:
					toast.error("Forbidden");
					break;
				case 404:
					toast.error("Not found");
					break;
				case 500:
					toast.error("Internal server error");
					break;
				default:
					toast.error("Unknown error");
			}
		}

		// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
		return Promise.reject(err);
	},
);
