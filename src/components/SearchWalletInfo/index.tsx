import { usePortfolio } from "../../queries/usePortfolio";
import { PortfolioInfo } from "./PortfolioInfo";
import { SearchField } from "./SearchField";

function SearchWalletInfo() {
	const { mutate, data, isPending, error } = usePortfolio();

	if (error) return <div>{error.message}</div>;

	return (
		<div>
			<SearchField onChange={mutate} isPending={isPending} />
			<PortfolioInfo data={data} error={error} />
		</div>
	);
}

export { SearchWalletInfo };
