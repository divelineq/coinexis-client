import type { CardsProps } from "../Cards";
import { Action } from "./Action";
import { PaginationInfo } from "./PaginationInfo";

export function ListToolbar({
	data,
	pagination,
	className,
	onPageChange,
}: Omit<CardsProps, "shouldShowSkeleton"> & { className?: string }) {
	const _pagination = { ...data!.pagination, ...pagination };

	return (
		<div className={className}>
			<PaginationInfo pagination={_pagination} />
			<Action pagination={_pagination} onPageChange={onPageChange} />
		</div>
	);
}
