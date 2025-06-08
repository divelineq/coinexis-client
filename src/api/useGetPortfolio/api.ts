import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { PORTFOLIO_VALIDATION_SHEMA, type PortfolioType } from "./types";
const API = import.meta.env.VITE_API_KEY;

export function useGetPortfolio() {
	return useMutation<PortfolioType, Error, string>({
		mutationKey: ["wallet-portfolio"],
		mutationFn: async (adress: string) => {
			const res = await axios.get(
				`https://api.mobula.io/api/1/wallet/portfolio?wallet=${adress}`,
				{
					headers: {
						Authorization: `Bearer ${API}`,
					},
				},
			);

			const validationRes = PORTFOLIO_VALIDATION_SHEMA.parse(res.data.data);

			return validationRes;
		},
	});
}
