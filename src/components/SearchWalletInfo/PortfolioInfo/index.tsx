import type { PortfolioType } from "@api";
import { PortfolioTable } from "./PortfolioTable";

type Props = {
	data: PortfolioType | undefined;
	error: Error | null;
};

function PortfolioInfo({ data, error }: Props) {
	if (error) return <div>{error.message}</div>;
	return (
		<div>
			<p>
				Total balance:{" "}
				{data?.assets
					.reduce((acc, val) => acc + val.estimated_balance, 0)
					.toFixed(2)}
				$
			</p>
			<div>
				<PortfolioTable data={data} />
			</div>
		</div>
	);
}

export { PortfolioInfo };
