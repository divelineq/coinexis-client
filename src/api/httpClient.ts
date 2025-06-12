import axios from "axios";

export const httpClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 10_000,
});

httpClient.interceptors.response.use(
	(res) => res,
	(err) => {
		// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
		return Promise.reject(err);
	},
);
