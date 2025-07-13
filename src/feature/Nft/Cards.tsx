import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	CopyableText,
} from "@ui";
import { Tooltip } from "react-tooltip";
import type { ServiceOutput } from "src/service/nft/types";
import { Action } from "./Action";

type Props = {
	data: ServiceOutput | undefined;
	onPageChange: (page: { pageIndex: number; pageSize: number }) => void;
	isRefetching: boolean;
	pagination: { pageIndex: number; pageSize: number };
};

function Cards({ data, isRefetching, pagination, onPageChange }: Props) {
	if (!data) return;

	const { total, limit, offset } = data.pagination;
	const currentStart = offset + 1;
	const currentEnd = Math.min(offset + limit, total);

	const PaginationInfo = (
		<div className="text-sm text-gray-400">
			Showing <span className="text-white">{currentStart}</span>–
			<span className="text-white">{currentEnd}</span> of{" "}
			<span className="text-white">{total}</span> NFTs
		</div>
	);

	return (
		<div className="rounded-md border border-zinc-700 bg-zinc-900 shadow-inner mt-4">
			<div className="flex items-center justify-between px-4 py-3">
				{PaginationInfo}
				<Action
					isRefetching={isRefetching}
					pagination={pagination}
					data={data}
					onPageChange={onPageChange}
				/>
			</div>
			<div className="grid grid-cols-5 p-4 gap-5">
				{data.data.map((nft, index) => (
					<Card
						key={`${nft.name}-${index}`}
						className="flex flex-col justify-between h-full"
					>
						<CardHeader>
							<CardTitle>{nft.name}</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-2">
							<CardDescription className="flex gap-1">
								<span>Blockchain:</span> {nft.blockchain}
							</CardDescription>

							<CardDescription className="flex gap-1">
								<span>Address:</span>
								<CopyableText value={nft.token_address} />
							</CardDescription>
							<CardDescription>
								<span>Amount:</span> {nft.amount}
							</CardDescription>
							{nft.description && (
								<CardDescription
									className="line-clamp-3 leading-snug cursor-help"
									data-tooltip-id={`description-${index}`}
									data-tooltip-content={nft.description}
								>
									{nft.description}
									<Tooltip
										id={`description-${index}`}
										className="max-w-[300px] text-gray-100 border border-zinc-600"
										place="top"
										delayShow={200}
									/>
								</CardDescription>
							)}
						</CardContent>
						<CardFooter>
							<img
								className="rounded-md object-cover w-full h-48"
								src={nft.image || nft.url || "logo.png"}
								alt={nft.name}
								onError={(e) => {
									if (e.currentTarget.src !== "logo.png") {
										e.currentTarget.src = "logo.png";
									}
								}}
							/>
						</CardFooter>
					</Card>
				))}
			</div>
			<div className="flex items-center justify-between px-4 py-3">
				{PaginationInfo}
				<Action
					isRefetching={isRefetching}
					pagination={pagination}
					data={data}
					onPageChange={onPageChange}
				/>
			</div>
		</div>
	);
}

export { Cards };
