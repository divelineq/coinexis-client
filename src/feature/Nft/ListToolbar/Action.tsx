import { cx } from "classix";
import {
	AiFillBackward,
	AiFillCaretLeft,
	AiFillCaretRight,
	AiFillForward,
} from "react-icons/ai";
import { PulseLoader } from "react-spinners";
import type { ServiceOutput } from "src/service/nft/types";

type Props = {
	isRefetching: boolean;
	pagination: { pageIndex: number; pageSize: number };
	onPageChange: (page: { pageIndex: number; pageSize: number }) => void;
	data: ServiceOutput;
};

type SwitchPageButtonProps = {
	symbol: React.ReactNode;
	onChange: () => void;
	className?: string;
	disabled?: boolean;
};

function SwitchPageButton({
	onChange,
	symbol,
	className,
	disabled,
}: SwitchPageButtonProps) {
	return (
		<button
			disabled={disabled}
			className={cx(
				"px-2 border-1 border-gray-500 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed",
				className,
			)}
			onClick={onChange}
		>
			{symbol}
		</button>
	);
}

export function Action({
	pagination,
	isRefetching,
	onPageChange,
	data,
}: Props) {
	const handlePageChange = (delta: number) => {
		onPageChange({
			...pagination,
			pageIndex: pagination.pageIndex + delta,
		});
	};

	return (
		<div className="flex py-2">
			{isRefetching && (
				<PulseLoader
					size={6}
					color="rgb(238, 238, 238)"
					className="pr-2 items-center"
				/>
			)}
			<SwitchPageButton
				disabled={pagination.pageIndex === 0}
				symbol={<AiFillBackward />}
				onChange={() =>
					handlePageChange(-(data.pagination.offset / data.pagination.limit))
				}
				className="rounded-l-md"
			/>
			<SwitchPageButton
				disabled={pagination.pageIndex === 0}
				symbol={<AiFillCaretLeft />}
				onChange={() => handlePageChange(-1)}
			/>
			<p className="px-4 border-y-1 border-gray-500">
				{pagination.pageIndex + 1}/
				{Math.round(data.pagination.total / data.pagination.limit)}
			</p>
			<SwitchPageButton
				disabled={
					(pagination.pageIndex + 1) * pagination.pageSize >=
					data.pagination.total
				}
				symbol={<AiFillCaretRight />}
				onChange={() => handlePageChange(1)}
			/>
			<SwitchPageButton
				disabled={
					data.pagination.offset + data.pagination.limit > data.pagination.total
				}
				symbol={<AiFillForward />}
				onChange={() =>
					handlePageChange(
						Math.round(data.pagination.total / data.pagination.limit),
					)
				}
				className="rounded-r-md"
			/>
		</div>
	);
}
