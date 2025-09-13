import type { WalletNFTsResponse } from "@api";
import { ErrorScreen } from "@ui";
import { Skeleton } from "./Card/Skeleton.tsx";
import { Card } from "./Card/index.ts";
import { ListToolbar } from "./ListToolbar";

export type CardsProps = {
	data: WalletNFTsResponse | undefined;
	shouldShowSkeleton: boolean;
	isLoading: boolean;
	error: Error | null;
	onPageChange: (page: { pageIndex: number; pageSize: number }) => void;
	pagination: { pageIndex: number; pageSize: number };
};

function Cards({
	data,
	error,
	isLoading,
	pagination,
	shouldShowSkeleton,
	onPageChange,
}: CardsProps) {
	if (!data) return;

	if (error) return <ErrorScreen error={error} />;

	if (data.data.length === 0) {
		return (
			<div className="w-full flex justify-center p-4">
				Нет данных для отображения
			</div>
		);
	}

	return (
		<div className="rounded-md border border-zinc-700 bg-zinc-900 shadow-inner mt-4">
			<ListToolbar
				isLoading={isLoading}
				data={data}
				pagination={pagination}
				onPageChange={onPageChange}
				className="flex items-center justify-between px-4 py-3"
			/>
			<div className="grid grid-cols-5 p-4 gap-5">
				{isLoading
					? Array.from({ length: 50 }).map((_, index) => (
							<Skeleton key={`${index}`} />
						))
					: data.data.map((nft, index) =>
							shouldShowSkeleton ? (
								<Skeleton key={`${nft.name}-${index}`} />
							) : (
								<Card key={`${nft.name}-${index}`} value={nft} index={index} />
							),
						)}
			</div>
			<ListToolbar
				isLoading={isLoading}
				data={data}
				pagination={pagination}
				onPageChange={onPageChange}
				className="flex items-center justify-between px-4 py-3"
			/>
		</div>
	);
}

export { Cards };
