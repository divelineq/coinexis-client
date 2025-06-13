import type React from "react";

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
	label?: React.ReactNode;
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	startIcon?: React.ReactNode;
};

function TextField({
	className,
	label,
	value,
	onChange,
	placeholder,
	startIcon,
	...props
}: Props) {
	return (
		<div className={className} {...props}>
			{label && (
				<label
					htmlFor="wallet-adress"
					className="text-sm mt-6 flex justify-between"
				>
					{label}
				</label>
			)}
			<div className="flex border-1 w-full border-gray-500 rounded-sm h-full items-center">
				{startIcon}
				<input
					placeholder={placeholder}
					value={value}
					onChange={(e) => onChange?.(e.target.value)}
					className={"p-2 w-full focus:outline-none focus:ring-0"}
				/>
			</div>
		</div>
	);
}

export { TextField };
