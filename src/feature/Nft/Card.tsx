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

	return (
		<div>
			<Action
				isRefetching={isRefetching}
				pagination={pagination}
				data={data}
				onPageChange={onPageChange}
			/>
			<div className="grid grid-cols-4 p-4 m-4 gap-5">
				{data.data.map((nft, index) => (
					<div
						className="border border-gray-500 rounded-sm p-4 text-center flex flex-col gap-2"
						key={`${nft.name}-${index}`}
					>
						{(nft.image || nft.url) && (
							<img
								className="rounded-sm"
								src={nft.image ?? nft.url}
								alt={nft.name}
							/>
						)}
						<span>{nft.name}</span>
						<span>{nft.description}</span>
						<span>{nft.token_address}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export { Card };
