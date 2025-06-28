import { CopyableText } from "@ui";
import { Tooltip } from "react-tooltip";
import type { ServiceOutput } from "src/service/nft/types";
import { Action } from "./Action";

type Props = {
	data: ServiceOutput | undefined;
	onPageChange: (page: { pageIndex: number; pageSize: number }) => void;
	isRefetching: boolean;
	pagination: { pageIndex: number; pageSize: number };
};

function Card({ data, isRefetching, pagination, onPageChange }: Props) {
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
					<div
						key={`${nft.name}-${index}`}
						className="bg-zinc-800 border border-zinc-700 rounded-md p-2 flex flex-col gap-3 w-full max-w-[320px] shadow-md hover:shadow-lg transition-shadow"
					>
						{(nft.image || nft.url) && (
							<img
								loading="lazy"
								className="rounded-md object-cover w-full h-48"
								src={nft.image ?? nft.url}
								alt={nft.name}
							/>
						)}

						<div className="flex flex-col gap-1 text-sm">
							<div className="text-white text-base font-semibold">
								{nft.name}
							</div>

							<div className="text-gray-300">
								<span className="font-medium text-gray-400">Amount:</span>{" "}
								{nft.amount}
							</div>

							<div className="text-gray-300">
								<span className="font-medium text-gray-400">Blockchain:</span>{" "}
								{nft.blockchain}
							</div>

							{nft.description && (
								<div
									className="line-clamp-3 text-gray-300 leading-snug cursor-help"
									data-tooltip-id={`description-${index}`}
									data-tooltip-content={nft.description}
								>
									<span className="font-medium text-gray-400">
										Description:
									</span>{" "}
									{nft.description}
									<Tooltip
										id={`description-${index}`}
										className="max-w-[300px] bg-zinc-900 text-gray-100 border border-zinc-600"
										place="top"
										delayShow={200}
									/>
								</div>
							)}

							<div className="text-gray-300 flex items-center gap-1">
								<span className="font-medium text-gray-400">Address:</span>
								<CopyableText value={nft.token_address} />
							</div>
						</div>
					</div>
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

export { Card };
