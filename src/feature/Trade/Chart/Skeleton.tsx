export function Skeleton({ width, height }: { width: string; height: string }) {
	return (
		<div className="bg-[#101014] animate-pulse" style={{ width, height }} />
	);
}
