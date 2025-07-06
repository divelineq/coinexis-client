import { CopyableText } from "@ui";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Tooltip } from "react-tooltip";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export const DEFAULT_TRANSACTIONS_COLUMNS = [
	{
		accessorKey: "type",
		header: () => <p className="text-center">Type</p>,
		size: 80,
		enableSorting: false,
		cell: (props: any) => {
			const type = props.getValue();
			const color =
				type === "buy"
					? "text-green-500"
					: type === "sell"
						? "text-red-500"
						: "text-blue-500";

			return <p className={color}>{type}</p>;
		},
	},
	{
		accessorKey: "asset.name",
		header: () => <p className="text-center">Name</p>,
		cell: (props: any) => <p>{props.getValue()}</p>,
	},
	{
		accessorKey: "timestamp",
		header: () => <p className="text-center">Time</p>,
		cell: (props: any) => {
			const timestamp = props.getValue();
			const userTimezone = dayjs.tz.guess();

			const localTime = dayjs.utc(timestamp).tz(userTimezone);

			return (
				<>
					<p
						data-tooltip-id="full-time"
						data-tooltip-content={localTime.format("YYYY-MM-DD HH:mm:ss")}
						className="cursor-default"
					>
						{localTime.fromNow()}
					</p>
					<Tooltip id="full-time" place="top" />
				</>
			);
		},
	},
	{
		accessorKey: "from",
		header: () => <p className="text-center">From</p>,
		cell: (props: any) => CopyableText({ value: props.getValue() }),
		enableSorting: false,
	},
	{
		accessorKey: "to",
		header: () => <p className="text-center">To</p>,
		cell: (props: any) => CopyableText({ value: props.getValue() }),
		enableSorting: false,
	},
	{
		accessorKey: "blockchain",
		header: () => <p className="text-center">Blockchain</p>,
		cell: (props: any) => (
			<div className="truncate">
				<p className="truncate">{props.getValue()}</p>
			</div>
		),
		enableSorting: false,
	},
	{
		accessorKey: "amount",
		header: () => <p className="text-center">Amount</p>,
		cell: (props: any) => <p>{props.getValue().toFixed(2)}</p>,
	},
	{
		accessorKey: "amount_usd",
		header: () => <p className="text-center">Amount USD</p>,
		cell: (props: any) => <p>{props.getValue().toFixed(2)}$</p>,
	},
];
