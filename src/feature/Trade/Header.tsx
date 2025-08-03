function Header({ symbol }: { symbol: string }) {
	return (
		<div className="flex items-center justify-between px-4 py-2 bg-[#101014]">
			<div className="flex items-center gap-2">
				<div className="font-bold text-lg">{symbol}</div>
			</div>
			<div className="flex gap-2">
				<button className="px-3 py-1 bg-zinc-800 rounded">Settings</button>
				<button className="px-3 py-1 bg-zinc-800 rounded">Tools</button>
			</div>
		</div>
	);
}

export { Header };
