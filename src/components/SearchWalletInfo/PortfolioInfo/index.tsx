import type { PortfolioService } from "@service";
import { PortfolioTable } from "./PortfolioTable";

type Props = {
	data?: PortfolioService;
	error: Error | null;
};

function PortfolioInfo({ data, error }: Props) {
	if (error) return <div>{error.message}</div>;

	if (!data) return;

	return (
		<div>
			<div className="flex text-2xl justify-center gap-2">
				<p>Total balance:</p>
				<p>{data.totalPrice}$</p>
			</div>
			<div>
				<PortfolioTable data={data.portfolio} />
			</div>
		</div>
	);
}

export { PortfolioInfo };
