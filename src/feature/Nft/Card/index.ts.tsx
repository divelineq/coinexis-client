import type { ServiceOutput } from "@service";
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	CopyableText,
	Card as UiCard,
} from "@ui";
import { Tooltip } from "react-tooltip";

type Props = {
	value: ServiceOutput["data"][number];
	index: number;
};

function Card({ value, index }: Props) {
	return (
		<UiCard className="flex flex-col justify-between h-full">
			<CardHeader>
				<CardTitle>{value.name}</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<CardDescription className="flex gap-1">
					<span>Blockchain:</span> {value.blockchain}
				</CardDescription>

				<CardDescription className="flex gap-1">
					<span>Address:</span>
					<CopyableText value={value.token_address} />
				</CardDescription>
				<CardDescription>
					<span>Amount:</span> {value.amount}
				</CardDescription>
				{value.description && (
					<CardDescription
						className="line-clamp-3 leading-snug cursor-help"
						data-tooltip-id={`description-${index}`}
						data-tooltip-content={value.description}
					>
						{value.description}
						<Tooltip
							id={`description-${index}`}
							className="max-w-[300px] text-gray-100 border border-zinc-600"
							place="top"
							delayShow={200}
						/>
					</CardDescription>
				)}
			</CardContent>
			<CardFooter>
				<img
					className="rounded-md object-cover w-full h-48"
					src={value.image || value.url || "logo.png"}
					alt={value.name}
					onError={(e) => {
						if (e.currentTarget.src !== "logo.png") {
							e.currentTarget.src = "logo.png";
						}
					}}
				/>
			</CardFooter>
		</UiCard>
	);
}

export { Card };
