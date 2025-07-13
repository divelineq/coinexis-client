import type { ServiceOutput } from "@service";
import type { PaginationState } from "@tanstack/react-table";

type Props = {
	pagination: PaginationState & ServiceOutput["pagination"];
};

export function PaginationInfo({ pagination }: Props) {
	const { total, limit, offset } = pagination;
	const currentStart = offset + 1;
	const currentEnd = Math.min(offset + limit, total);

	return (
		<div className="text-sm text-gray-400">
			Showing <span className="text-white">{currentStart}</span>–
			<span className="text-white">{currentEnd}</span> of{" "}
			<span className="text-white">{total}</span> NFTs /{" "}
			<span className="text-white">{Math.ceil(total / limit)}</span> Pages
		</div>
	);
}
