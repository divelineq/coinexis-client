export function MainSkeleton() {
	return (
		<div className="flex flex-col gap-2 p-4">
			{Array.from({ length: 20 }).map((_, index) => (
				<div
					key={`skeleton-${index}`}
					className="w-full h-15 bg-gray-700 animate-pulse rounded-lg"
				/>
			))}
		</div>
	);
}
