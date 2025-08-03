import type { Level } from "./types";

export function applyUpdates(
	prev: Level[],
	updates: Level[],
	descending: boolean,
) {
	const map = new Map<string, string>(
		prev.map(([price, size]) => [price, size]),
	);

	for (const [price, size] of updates) {
		if (Number(size) === 0) {
			map.delete(price);
		} else {
			map.set(price, size);
		}
	}

	const arr = [...map.entries()].map(([price, size]) => [price, size] as Level);
	arr.sort((a, b) => {
		const pa = Number(a[0]);
		const pb = Number(b[0]);

		return descending ? pb - pa : pa - pb;
	});

	return arr;
}
