import type { SortedCoinsServiceResponse } from "@service";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import { buildPercentageNumber } from "../../hooks/buildPercentageNumber";
import { Sparkline } from "./Sparkline";

const columnHelper = createColumnHelper<SortedCoinsServiceResponse["data"]>();

export function useDefaultColumns() {
	return useMemo(
		() => [
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
			columnHelper.accessor("name", {
				header: () => <p className="text-left cursor-default">Name</p>,
				cell: (props: any) => {
					return (
						<div className="flex items-center gap-2">
							<img
								src={props.row.original.logo ?? "logo.png"}
								alt="logo"
								className="w-7 h-7 rounded-sm"
							/>
							<p className="text-md">{props.getValue()}</p>
							<p className="text-md text-gray-400">
								{props.row.original.symbol}
							</p>
						</div>
					);
				},
			}),
			columnHelper.accessor("price", {
				header: () => <p className="text-center">Price</p>,
				cell: (props: any) =>
					props.getValue().toLocaleString("en-US", {
						style: "currency",
						currency: "USD",
					}),
				enableSorting: true,
			}),
			columnHelper.accessor("price_change_1h", {
				header: () => <p className="text-center">1h %</p>,
				cell: (props: any) =>
					buildPercentageNumber(props.getValue().toFixed(2)),
				enableSorting: true,
			}),
			columnHelper.accessor("price_change_24h", {
				header: () => <p className="text-center">24h %</p>,
				cell: (props: any) =>
					buildPercentageNumber(props.getValue().toFixed(2)),
				enableSorting: true,
			}),
			columnHelper.accessor("price_change_7d", {
				header: () => <p className="text-center">7d %</p>,
				cell: (props: any) =>
					buildPercentageNumber(props.getValue().toFixed(2)),
				enableSorting: true,
			}),
			columnHelper.accessor("market_cap", {
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
							style={{ fontWeight: "normal", width: "450px", zIndex: 10 }}
						/>
					</div>
				),
				cell: (props: any) =>
					props.getValue().toLocaleString("en-US", {
						style: "currency",
						currency: "USD",
					}),
				enableSorting: true,
			}),
			columnHelper.accessor("volume", {
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
							style={{ fontWeight: "normal", width: "300px", zIndex: 10 }}
						/>
					</div>
				),
				cell: (props: any) =>
					props.getValue().toLocaleString("en-US", {
						style: "currency",
						currency: "USD",
					}),
				enableSorting: true,
			}),
			{
				accessorKey: "Chart",
				header: () => <p className="text-center cursor-default">Last 7 Days</p>,
				cell: (props: any) => <Sparkline data={props.row.original.history} />,
				enableSorting: false,
			},
		],
		[],
	);
}
