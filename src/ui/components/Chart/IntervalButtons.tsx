import { INTERVALS } from "./Consts";

type Props = {
	value: string;
	onChange: (interval: string) => void;
};

function IntervalButtons({ value, onChange }: Props) {
	return (
		<ul className="flex gap-4 text-[12px] bg-[#101014] px-4 py-2">
			{Object.entries(INTERVALS).map(([key, interval]) => (
				<li key={interval}>
					<button
						className={
							key === value
								? "text-primary"
								: "text-zinc-400 hover:text-white cursor-pointer"
						}
						onClick={() => onChange(key)}
					>
						{interval}
					</button>
				</li>
			))}
		</ul>
	);
}

export { IntervalButtons };
