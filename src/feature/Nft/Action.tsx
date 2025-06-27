import type { ServiceOutput } from "src/service/nft/types";

type Props = {
	isRefetching: boolean;
	pagination: { pageIndex: number; pageSize: number };
	onPageChange: (page: { pageIndex: number; pageSize: number }) => void;
	data: ServiceOutput;
};

function NavigationButton({
	onChange,
	step,
	disabled,
}: {
	onChange: () => void;
	disabled: boolean;
	step: string;
}) {
	return (
		<button
			disabled={disabled}
			className="p-2 border border-gray-500 rounded-sm disabled:bg-gray-500 disabled:cursor-not-allowed"
			onClick={onChange}
		>
			{step}
		</button>
	);
}

function Action({ isRefetching, pagination, data, onPageChange }: Props) {
	const handlePageChange = (delta: number) => {
		onPageChange({
			...pagination,
			pageIndex: pagination.pageIndex + delta,
		});
	};

	return (
		<div className="flex justify-center gap-2">
			{isRefetching ? (
				"Loading"
			) : (
				<>
					<NavigationButton
						disabled={pagination.pageIndex === 0}
						onChange={() => handlePageChange(-1)}
						step="Prev"
					/>
					<NavigationButton
						disabled={
							(pagination.pageIndex + 1) * pagination.pageSize >=
							data.pagination.total
						}
						onChange={() => handlePageChange(1)}
						step="Next"
					/>
				</>
			)}
		</div>
	);
}

export { Action };
