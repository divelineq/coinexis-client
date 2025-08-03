type Props = {
	value: string;
	onChange: (interval: string) => void;
};

const INTERVALS = {
	1: "1m",
	3: "3m",
	5: "5m",
	15: "15m",
	30: "30m",
	60: "1H",
	240: "4H",
	D: "1D",
	W: "1W",
	M: "1M",
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
