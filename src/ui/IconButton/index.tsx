import cx from "classix";
import type * as React from "react";
import { ClipLoader } from "react-spinners";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	icon: React.ReactNode;
	isLoading?: boolean;
};

function IconButton({ icon, className, isLoading, ...props }: IconButtonProps) {
	return (
		<button
			type="button"
			className={cx(
				"items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none text-white transition-colors duration-200 ease-in-out disabled:bg-blue-950 disabled:cursor-not-allowed p-2",
				className,
			)}
			{...props}
		>
			{isLoading ? <ClipLoader size={18} color="rgb(238, 238, 238)" /> : icon}
		</button>
	);
}

export { IconButton };
