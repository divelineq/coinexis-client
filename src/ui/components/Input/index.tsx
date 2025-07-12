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
				type={type}
				className={cx(
					"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
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
