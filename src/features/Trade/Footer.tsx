function Footer({ symbol }: { symbol: string }) {
	return (
		<div className="px-4 py-2 bg-[#101014] flex justify-between text-sm">
			<div>Footer left: {symbol}</div>
			<div>Footer right: info / links / stats</div>
		</div>
	);
}

export { Footer };
