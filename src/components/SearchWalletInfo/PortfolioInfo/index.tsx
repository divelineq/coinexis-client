import type { PortfolioType } from "@api";
import { PortfolioTable } from "./PortfolioTable";

type Props = {
	data: PortfolioType | undefined;
	error: Error | null;
};

function PortfolioInfo({ data, error }: Props) {
	if (error) return <div>{error.message}</div>;

	if (!data) return;

	return (
		<div>
			<div className="flex text-2xl justify-center gap-2">
				<p>Total balance:</p>
				<p>
					{data?.assets
						.reduce((acc, val) => acc + val.estimated_balance, 0)
						.toFixed(2)}
					$
				</p>
			</div>
			<div>
				<PortfolioTable data={data} />
			</div>
		</div>
	);
}

export { PortfolioInfo };
