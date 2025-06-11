import type React from "react";

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
	label?: React.ReactNode;
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
};

function TextField({
	className,
	label,
	value,
	onChange,
	placeholder,
	...props
}: Props) {
	return (
		<div className={className} {...props}>
			{label && (
				<label
					htmlFor="wallet-adress"
					className="text-sm mt-6 flex gap-1 justify-between"
				>
					{label}
				</label>
			)}
			<input
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				className={"p-2 border-1 w-full border-gray-500 rounded-sm"}
			/>
		</div>
	);
}

export { TextField };
