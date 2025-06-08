import cx from "classix";

type Props = {
	children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className, ...props }: Props) {
	return (
		<button
			type="button"
			className={cx("p-2 rounded-sm cursor-pointer", className)}
			{...props}
		>
			{children}
		</button>
	);
}

export { Button };
