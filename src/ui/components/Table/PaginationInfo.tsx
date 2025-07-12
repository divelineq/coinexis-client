import type { PaginationState } from "@tanstack/react-table";

type Props = {
	pagination: PaginationState;
	data: unknown[];
};

function PaginationInfo({ pagination, data }: Props) {
	return (
		<div>
			<div className="text-sm text-gray-400">
				Showing{" "}
				<span className="text-gray-400">
					{pagination?.pageIndex * pagination?.pageSize + 1}
				</span>{" "}
				–{" "}
				<span className="text-gray-400">
					{pagination?.pageIndex * pagination?.pageSize + pagination?.pageSize}
				</span>{" "}
				of <span className="text-gray-400">{data.length}</span> coins
			</div>
		</div>
	);
}

export { PaginationInfo };
