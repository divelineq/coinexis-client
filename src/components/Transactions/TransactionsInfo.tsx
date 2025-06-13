import type { SmartTransactions } from "@api";
import { Table } from "@ui";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
	data: SmartTransactions | undefined;
	error: Error | null;
};

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
					: type === "cell"
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

			return <p>{localTime.format("YYYY-MM-DD HH:mm:ss")}</p>;
		},
	},
	{
		accessorKey: "from",
		header: () => <p className="text-center">From</p>,
		cell: (props: any) => <p>{props.getValue()}</p>,
		enableSorting: false,
	},
	{
		accessorKey: "to",
		header: () => <p className="text-center">To</p>,
		cell: (props: any) => <p>{props.getValue()}</p>,
		enableSorting: false,
	},
	{
		accessorKey: "blockchain",
		header: () => <p className="text-center">Blockchain</p>,
		cell: (props: any) => <p>{props.getValue()}</p>,
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

function TransactionsInfo({ data, error }: Props) {
	if (error) return <div>{error.message}</div>;

	return (
		<div>
			{data?.data.transactions && (
				<Table
					data={data.data.transactions}
					searchId="asset_name"
					defaultColumns={DEFAULT_TRANSACTIONS_COLUMNS}
				/>
			)}
		</div>
	);
}

export { TransactionsInfo };
