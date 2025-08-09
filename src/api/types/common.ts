export type DefaultResponse<T> = {
	result: T;
	retCode: number;
	retExtInfo: Record<string, unknown> | undefined;
	retMsg: string;
	time: number;
	bybit: string;
};
