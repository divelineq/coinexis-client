import cx from "classix";
import type React from "react";

type Props = {
	label?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

function TextField({ className, label, ...props }: Props) {
	return (
		<>
			{label && (
				<label
					htmlFor="wallet-adress"
					className="text-sm mt-6 flex gap-1 w-full justify-between"
				>
					{label}
				</label>
			)}
			<input
				className={cx(
					"p-2 w-full border-2 border-gray-500 rounded-sm",
					className,
				)}
				{...props}
			/>
		</>
	);
}
export { TextField };
