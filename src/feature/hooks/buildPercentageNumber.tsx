import cx from "classix";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export function buildPercentageNumber(value: number) {
	const color =
		value > 0 ? "text-green-500" : value < 0 ? "text-red-500" : "text-gray-200";

	return (
		<div className={cx("flex items-center", color)}>
			{value > 0 ? (
				<AiFillCaretUp className="w-4 h-4" />
			) : value < 0 ? (
				<AiFillCaretDown className="w-4 h-4" />
			) : null}
			<span>{value}%</span>
		</div>
	);
}
