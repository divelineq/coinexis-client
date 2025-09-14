import type { TickersLinearResponse } from "@api";
import { createColumnHelper } from "@tanstack/react-table";
import { BsInfoCircle } from "react-icons/bs";
import { Tooltip } from "react-tooltip";

const columnHelper =
	createColumnHelper<TickersLinearResponse["list"][number]>();

export const DEFAULT_COLUMNS = [
	columnHelper.accessor("symbol", {
		header: "Symbol",
		cell: (props) => <span>{props.getValue()}</span>,
		enableSorting: true,
	}),

	columnHelper.accessor("lastPrice", {
		header: "Last Price",
		cell: (props) => (
			<span>${Number.parseFloat(props.getValue()).toFixed(4)}</span>
		),
		enableSorting: true,
	}),

	columnHelper.accessor("price24hPcnt", {
		header: "24h Change %",
		cell: (props) => {
			const percent = Number.parseFloat(props.getValue()) * 100;
			const color =
				percent > 0 ? "text-green-500" : percent < 0 ? "text-red-500" : "";

			return <span className={color}>{percent.toFixed(2)}%</span>;
		},
		enableSorting: true,
	}),

	columnHelper.accessor("highPrice24h", {
		header: "24h High",
		cell: (props) => (
			<span>${Number.parseFloat(props.getValue()).toFixed(5)}</span>
		),
		enableSorting: true,
	}),

	columnHelper.accessor("lowPrice24h", {
		header: "24h Low",
		cell: (props) => (
			<span>${Number.parseFloat(props.getValue()).toFixed(5)}</span>
		),
		enableSorting: true,
	}),

	columnHelper.accessor("volume24h", {
		header: () => (
			<div className="flex items-center gap-1">
				<p>Volume (24h)</p>
				<BsInfoCircle
					size={14}
					color="gray"
					data-tooltip-id="volume-tooltip"
					data-tooltip-content="Объём торговли за последние 24 часа, в количестве монет."
				/>
				<Tooltip id="volume-tooltip" place="bottom" />
			</div>
		),
		cell: (props) =>
			Number(props.getValue()).toLocaleString("en-US", {
				maximumFractionDigits: 0,
			}),
		enableSorting: true,
	}),

	columnHelper.accessor("turnover24h", {
		header: () => (
			<div className="flex items-center gap-1">
				<p>Turnover (USD)</p>
				<BsInfoCircle
					size={14}
					color="gray"
					data-tooltip-id="turnover-tooltip"
					data-tooltip-content="Общий денежный объём сделок за 24 часа в USD."
				/>
				<Tooltip id="turnover-tooltip" place="bottom" />
			</div>
		),
		cell: (props) =>
			Number(props.getValue()).toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
				maximumFractionDigits: 0,
			}),
		enableSorting: true,
	}),

	columnHelper.accessor("openInterest", {
		header: () => (
			<div className="flex items-center gap-1">
				<p>Open Interest</p>
				<BsInfoCircle
					size={14}
					color="gray"
					data-tooltip-id="bid-tooltip"
					data-tooltip-content="Размер открытых позиций"
				/>
				<Tooltip id="bid-tooltip" place="bottom" />
			</div>
		),
		cell: (props) => (
			<span>${Number.parseFloat(props.getValue()).toFixed(5)}</span>
		),
		enableSorting: true,
	}),

	columnHelper.accessor("fundingRate", {
		header: () => (
			<div className="flex items-center gap-1">
				<p>Funding Rate</p>
				<BsInfoCircle
					size={14}
					color="gray"
					data-tooltip-id="bid-tooltip"
					data-tooltip-content="Процентная ставка, которая периодически списывается или начисляется трейдерам по бессрочным фьючерсам"
				/>
				<Tooltip id="bid-tooltip" place="bottom" />
			</div>
		),
		cell: (props) => {
			const percent = Number.parseFloat(props.getValue()) * 100;
			const color =
				percent > 0 ? "text-green-500" : percent < 0 ? "text-red-500" : "";

			return <span className={color}>{percent.toFixed(2)}%</span>;
		},
		enableSorting: true,
	}),
];
