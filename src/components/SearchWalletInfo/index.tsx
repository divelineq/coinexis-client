import { useGetPortfolio } from "@api";
import { PortfolioInfo } from "./PortfolioInfo";
import { SearchField } from "./SearchField";

function SearchWalletInfo() {
	const { mutate, data, isPending, error } = useGetPortfolio();

	return (
		<div>
			<SearchField onChange={mutate} isPending={isPending} />
			<PortfolioInfo data={data} error={error} />
		</div>
	);
}

export { SearchWalletInfo };
