type Props = {
	pagination: {
		total: number;
		page: number;
		offset: number;
		limit: number;
	};
};

export function PaginationInfo({ pagination }: Props) {
	const { total, limit, offset } = pagination;
	const currentStart = offset + 1;
	const currentEnd = Math.min(offset + limit, total);

	return (
		<div className="text-sm text-gray-400">
			Showing <span className="text-white">{currentStart}</span>–
			<span className="text-white">{currentEnd}</span> of{" "}
			<span className="text-white">{total}</span> NFTs
		</div>
	);
}
