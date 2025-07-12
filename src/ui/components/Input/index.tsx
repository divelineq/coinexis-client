import cx from "classix";
import type * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	inputClassName?: string;
	className?: string;
};

function Input({
	inputClassName,
	className,
	type = "text",
	startIcon,
	endIcon,
	...props
}: InputProps) {
	return (
		<div className={cx("relative flex items-center", className)}>
			{startIcon && (
				<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
					{startIcon}
				</span>
			)}
			<input
				inputMode="text"
				type={type}
				className={cx(
					"flex w-full rounded-md border border-custom bg-card py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-ellipsis whitespace-nowrap overflow-hidden",
					startIcon ? "pl-10" : "px-3",
					endIcon ? "pr-8" : "pr-3",
					inputClassName,
				)}
				{...props}
			/>
			{endIcon && (
				<span
					className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 cursor-pointer"
					title={
						props["aria-invalid"]
							? props["aria-errormessage"] || "Error"
							: undefined
					}
				>
					{endIcon}
				</span>
			)}
		</div>
	);
}

export { Input };
