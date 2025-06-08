import cx from "classix";
import type React from "react";

type Props = {
	className?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

function TextField({ className, ...props }: Props) {
	return (
		<input
			className={cx(
				"p-2 w-full border-2 border-gray-500 rounded-sm",
				className,
			)}
			{...props}
		/>
	);
}
export { TextField };
