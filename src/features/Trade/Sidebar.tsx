function Sidebar() {
	return (
		<div className="basis-1/6 flex flex-col size-full bg-[#101014] p-4 gap-4">
			<div className="font-semibold mb-2">Trade Panel</div>
			<div className="space-y-3 flex-1 overflow-auto h-full flex flex-col justify-between">
				<div className="bg-zinc-900 rounded p-3 flex flex-col gap-2">
					<div className="text-xs uppercase">Limit</div>
					<div className="flex flex-col gap-1">
						<label htmlFor="price" className="text-[11px]">
							Price
						</label>
						<input
							id="price"
							type="text"
							placeholder="115,000"
							className="bg-zinc-700 rounded px-2 py-1 text-sm w-full"
						/>
						<label htmlFor="quantity" className="text-[11px]">
							Quantity
						</label>
						<input
							id="quantity"
							type="text"
							placeholder="0.01"
							className="bg-zinc-700 rounded px-2 py-1 text-sm w-full"
						/>
					</div>
					<button className="mt-2 w-full py-2 bg-green-500 rounded font-semibold">
						Buy
					</button>
					<button className="w-full py-2 bg-red-500 rounded font-semibold">
						Sell
					</button>
				</div>
				<div className="bg-zinc-900 rounded p-3 text-[12px]">
					<div>Available Balance</div>
					<div className="mt-1 flex justify-between">
						<div>USDT:</div>
						<div>********</div>
					</div>
					<div className="mt-1 flex justify-between">
						<div>BTC:</div>
						<div>********</div>
					</div>
				</div>
			</div>
			<div className="text-[10px] text-zinc-500">Margin Mode: Cross</div>
		</div>
	);
}

export { Sidebar };
