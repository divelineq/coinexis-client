import type { TickersSpotResponse } from "@api";
import { createColumnHelper } from "@tanstack/react-table";
import { BsInfoCircle } from "react-icons/bs";
import { Tooltip } from "react-tooltip";

const columnHelper = createColumnHelper<TickersSpotResponse["list"][number]>();

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

	columnHelper.accessor("bid1Price", {
		header: () => (
			<div className="flex items-center gap-1">
				<p>Bid Price</p>
				<BsInfoCircle
					size={14}
					color="gray"
					data-tooltip-id="bid-tooltip"
					data-tooltip-content="Лучшая цена, по которой покупатели готовы купить актив."
				/>
				<Tooltip id="bid-tooltip" place="bottom" />
			</div>
		),
		cell: (props) => (
			<span>${Number.parseFloat(props.getValue()).toFixed(5)}</span>
		),
		enableSorting: true,
	}),

	columnHelper.accessor("ask1Price", {
		header: () => (
			<div className="flex items-center gap-1">
				<p>Ask Price</p>
				<BsInfoCircle
					size={14}
					color="gray"
					data-tooltip-id="ask-tooltip"
					data-tooltip-content="Лучшая цена, по которой продавцы готовы продать актив."
				/>
				<Tooltip id="ask-tooltip" place="bottom" />
			</div>
		),
		cell: (props) => (
			<span>${Number.parseFloat(props.getValue()).toFixed(5)}</span>
		),
		enableSorting: true,
	}),
	columnHelper.accessor("ask1Size", {
		header: "Ask Size",
		cell: (props) => (
			<span>{Number(props.getValue()).toLocaleString("en-US")}</span>
		),
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
];
