import { BsInfoCircle } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import { buildPercentageNumber } from "../hooks/buildPercentageNumber";
import { Sparkline } from "./Sparkline";

export const DEFAULT_MANY_COINS_COLUMNS = [
	{
		accessorKey: "#",
		header: () => <p className="text-left cursor-default">#</p>,
		size: 90,
		enableSorting: false,
		cell: (props: any) => {
			const pageIndex = props.table.options.state.pagination.pageIndex;
			const pageSize = props.table.options.state.pagination.pageSize;

			return pageIndex * pageSize + props.row.index + 1;
		},
	},
	{
		accessorKey: "name",
		header: () => <p className="text-left">Name</p>,
		cell: (props: any) => {
			return (
				<div className="flex items-center gap-2">
					<img
						src={props.row.original.logo ?? "logo.png"}
						alt="logo"
						className="w-7 h-7 rounded-sm"
						loading="lazy"
					/>
					<p className="text-md">{props.getValue()}</p>
					<p className="text-md text-gray-400">{props.row.original.symbol}</p>
				</div>
			);
		},
		enableSorting: true,
	},
	{
		accessorKey: "price",
		header: () => <p className="text-center">Price</p>,
		cell: (props: any) =>
			props.getValue().toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			}),
		enableSorting: true,
	},
	{
		accessorKey: "price_change_1h",
		header: () => <p className="text-center">1h %</p>,
		cell: (props: any) => buildPercentageNumber(props.getValue().toFixed(2)),
		enableSorting: true,
	},
	{
		accessorKey: "price_change_24h",
		header: () => <p className="text-center">24h %</p>,
		cell: (props: any) => buildPercentageNumber(props.getValue().toFixed(2)),
		enableSorting: true,
	},
	{
		accessorKey: "price_change_7d",
		header: () => <p className="text-center">7d %</p>,
		cell: (props: any) => buildPercentageNumber(props.getValue().toFixed(2)),
		enableSorting: true,
	},
	{
		accessorKey: "market_cap",
		header: () => (
			<div className="flex items-center gap-1">
				<p className="text-center">Market Cap</p>
				<BsInfoCircle
					size={16}
					color="gray"
					className="cursor-default"
					data-tooltip-id="market-cap"
					data-tooltip-content="Общая рыночная стоимость предложения криптовалюты в обращении. Она аналогична капитализации в свободном обращении на фондовом рынке. Рыночная капитализация = Текущая цена х предложение в обращении."
				/>
				<Tooltip
					delayShow={100}
					id="market-cap"
					place="bottom"
					style={{ fontWeight: "normal", width: "450px" }}
				/>
			</div>
		),
		cell: (props: any) =>
			props.getValue().toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			}),
		enableSorting: true,
	},
	{
		accessorKey: "volume",
		header: () => (
			<div className="flex items-center gap-1">
				<p className="text-center">Volume</p>
				<BsInfoCircle
					size={16}
					color="gray"
					className="cursor-default"
					data-tooltip-id="volume"
					data-tooltip-content="Показатель того, сколько криптовалюты было продано за последние 24 часа."
				/>
				<Tooltip
					delayShow={100}
					id="volume"
					place="bottom"
					style={{ fontWeight: "normal", width: "300px" }}
				/>
			</div>
		),
		cell: (props: any) =>
			props.getValue().toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			}),
		enableSorting: true,
	},
	{
		accessorKey: "Chart",
		header: () => <p className="text-center cursor-default">Last 7 Days</p>,
		cell: (props: any) => <Sparkline id={props.row.original.id} />,
		enableSorting: false,
	},
];
