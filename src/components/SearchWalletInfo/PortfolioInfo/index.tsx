import type { PortfolioType } from "@api";

type Props = {
	data: PortfolioType | undefined;
	error: Error | null;
};

function PortfolioInfo({ data, error }: Props) {
	if (error) return <div>{error.message}</div>;
	return <div>{data?.total_wallet_balance}</div>;
}

export { PortfolioInfo };
