import type { CardsProps } from "../Cards";
import { Action } from "./Action";
import { PaginationInfo } from "./PaginationInfo";

type Props = Omit<CardsProps, "error" | "shouldShowSkeleton"> & {
	className?: string;
};

export function ListToolbar({
	data,
	pagination,
	className,
	isLoading,
	onPageChange,
}: Props) {
	const _pagination = { ...data!.pagination, ...pagination };

	return (
		<div className={className}>
			{isLoading ? (
				<>
					<div className="w-48 h-6 animate-pulse bg-accent rounded-md" />
					<div className="w-48 h-6 animate-pulse bg-accent rounded-md" />
				</>
			) : (
				<>
					<PaginationInfo pagination={_pagination} />
					<Action pagination={_pagination} onPageChange={onPageChange} />
				</>
			)}
		</div>
	);
}
