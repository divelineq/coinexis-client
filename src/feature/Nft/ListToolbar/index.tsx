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
	const _pagination = { ...data!.pagination, ...pagination };

	return (
		<div className={className}>
			<PaginationInfo pagination={_pagination} />
			<Action
				isRefetching={isRefetching}
				pagination={_pagination}
				onPageChange={onPageChange}
			/>
		</div>
	);
}
