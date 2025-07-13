import type { ServiceOutput } from "@service";
import { Skeleton } from "./Card/Sketeton.tsx";
import { Card } from "./Card/index.ts";
import { ListToolbar } from "./ListToolbar";

export type CardsProps = {
	data: ServiceOutput | undefined;
	shouldShowSkeleton: boolean;
	onPageChange: (page: { pageIndex: number; pageSize: number }) => void;
	pagination: { pageIndex: number; pageSize: number };
};

function Cards({
	data,
	pagination,
	shouldShowSkeleton,
	onPageChange,
}: CardsProps) {
	if (!data) return;

	return (
		<div className="rounded-md border border-zinc-700 bg-zinc-900 shadow-inner mt-4">
			<ListToolbar
				data={data}
				pagination={pagination}
				onPageChange={onPageChange}
				className="flex items-center justify-between px-4 py-3"
			/>
			<div className="grid grid-cols-5 p-4 gap-5">
				{data.data.map((nft, index) => {
					return shouldShowSkeleton ? (
						<Skeleton key={`${nft.name}-${index}`} />
					) : (
						<Card key={`${nft.name}-${index}`} value={nft} index={index} />
					);
				})}
			</div>
			<ListToolbar
				data={data}
				pagination={pagination}
				onPageChange={onPageChange}
				className="flex items-center justify-between px-4 py-3"
			/>
		</div>
	);
}

export { Cards };
