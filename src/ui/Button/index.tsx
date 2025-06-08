import cx from "classix";

type Props = {
	children: React.ReactNode;
	isLoading?: boolean;
	disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className, isLoading, disabled, ...props }: Props) {
	return (
		<button
			disabled={disabled || isLoading}
			type="button"
			className={cx(
				className,
				"p-2 rounded-sm cursor-pointer flex justify-center disabled:bg-gray-700 disabled:cursor-not-allowed",
			)}
			{...props}
		>
			{isLoading ? (
				<svg
					className="animate-spin h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					role="img"
					aria-labelledby="loading-title"
				>
					<title id="loading-title">Loading...</title>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
					/>
				</svg>
			) : (
				children
			)}
		</button>
	);
}

export { Button };
