import type { CardsProps } from "../Cards";
import { Action } from "./Action";
import { PaginationInfo } from "./PaginationInfo";

export function ListToolbar({
	data,
	isRefetching,
	pagination,
	className,
	onPageChange,
}: CardsProps & { className?: string }) {
	return (
		<div className={className}>
			<PaginationInfo pagination={data!.pagination} />
			<Action
				isRefetching={isRefetching}
				pagination={pagination}
				data={data!}
				onPageChange={onPageChange}
			/>
		</div>
	);
}
