import cx from "classix";
import { ClipLoader } from "react-spinners";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
}

function Button({
	className,
	children,
	isLoading,
	disabled,
	...props
}: ButtonProps) {
	return (
		<button
			className={cx(
				"inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
				"bg-blue-600 text-white hover:bg-blue-700 transition-colors",
				"disabled:bg-zinc-600 disabled:text-zinc-400 disabled:cursor-not-allowed",
				isLoading && "opacity-80",
				className,
			)}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading && <ClipLoader size={6} color="rgb(238, 238, 238)" />}
			{children}
		</button>
	);
}

export { Button };
