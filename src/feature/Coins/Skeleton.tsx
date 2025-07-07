function Skeleton() {
	return (
		<div className="flex flex-col gap-2 py-2 px-5 items-center">
			<div className="flex justify-between w-full">
				<div className="w-56 h-8 bg-card animate-pulse rounded-lg" />
				<div className="w-38 h-8 bg-card animate-pulse rounded-lg" />
			</div>
			{Array.from({ length: 15 }).map((_, index) => (
				<div
					key={`skeleton-${index}`}
					className="w-full h-19 bg-card animate-pulse rounded-lg"
				/>
			))}
		</div>
	);
}

export { Skeleton };
