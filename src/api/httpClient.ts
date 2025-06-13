import axios from "axios";

export const httpClient = axios.create({
	baseURL: "https://api.mobula.io/api/1",
	timeout: 100_000,
});

httpClient.interceptors.response.use(
	(res) => res,
	(err) => {
		// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
		return Promise.reject(err);
	},
);
