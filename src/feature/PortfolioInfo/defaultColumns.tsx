import { CopyableText } from "@ui";
import { buildPercentageNumber } from "../hooks/buildPercentageNumber";

export const DEFAULT_PORTFOLIO_COLUMNS = [
	{
		accessorKey: "asset.name",
		header: () => <p className="text-left">Token Name</p>,
		cell: (props: any) => (
			<div className="flex gap-2 items-center">
				<img
					src={props.row.original.asset.logo ?? "logo.png"}
					alt=""
					className="w-7 h-7 rounded-sm"
					loading="lazy"
				/>
				<p className="text-md">{props.getValue()}</p>
				<p className="text-gray-400 text-md">
					{props.row.original.asset.symbol}
				</p>
			</div>
		),
	},
	{
		accessorKey: "token_balance",
		header: () => <p className="text-center">Token Balance</p>,
		cell: (props: any) => {
			return <p>{props.getValue().toFixed(2)}</p>;
		},
	},
	{
		accessorKey: "price",
		header: () => <p className="text-center">Price</p>,
		cell: (props: any) =>
			props.getValue().toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 6,
			}),
	},
	{
		accessorKey: "estimated_balance",
		header: () => <p className="text-center">Total value</p>,
		cell: (props: any) =>
			props.getValue().toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			}),
	},
	{
		accessorKey: "price_change_24h",
		header: () => <p className="text-center">24h %</p>,
		cell: (props: any) => buildPercentageNumber(props.getValue().toFixed(2)),
	},
	{
		accessorKey: "asset.contracts",
		header: () => <p className="text-center">Contract Address</p>,
		cell: (props: any) => CopyableText({ value: props.getValue() }),
		enableSorting: false,
	},
];
