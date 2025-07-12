import { AiOutlineCopy } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { toast } from "sonner";

export function CopyableText(props: { value: string }) {
	const handleCopy = () => {
		navigator.clipboard
			.writeText(props.value)
			.then(() => toast.success("Copied to clipboard"))
			.catch((error) => {
				console.error("Failed to copy:", error);
			});
	};

	return (
		<div className="flex gap-3 truncate items-center cursor-default">
			<Tooltip delayShow={200} id="wallet" place="top" />
			<p
				data-tooltip-content={props.value}
				data-tooltip-id="wallet"
				className="truncate text-ellipsis whitespace-nowrap"
			>
				{props.value}
			</p>
			<button
				onClick={handleCopy}
				className="text-gray-400 hover:text-white transition"
			>
				<AiOutlineCopy />
			</button>
		</div>
	);
}
