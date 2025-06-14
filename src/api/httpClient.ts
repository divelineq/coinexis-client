import axios from "axios";
import { toast } from "sonner";

export const httpClient = axios.create({
	baseURL: "https://api.mobula.io/api/1",
	timeout: 100_000,
});

httpClient.interceptors.response.use(
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
		} else if (err.request) {
			toast.error("Network error");
		} else {
			toast.error(`Error: ${err.message}`);
		}

		// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
		return Promise.reject(err);
	},
);
