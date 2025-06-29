function Skeleton() {
	return (
		<div className="flex flex-col gap-2 pt-10 items-center">
			<div className="flex justify-between w-2/3">
				<div className="w-56 h-8 bg-card animate-pulse rounded-lg" />
				<div className="w-38 h-8 bg-card animate-pulse rounded-lg" />
			</div>
			{Array.from({ length: 15 }).map((_, index) => (
				<div
					key={`skeleton-${index}`}
					className="w-2/3 h-12 bg-card animate-pulse rounded-lg"
				/>
			))}
		</div>
	);
}

export { Skeleton };
