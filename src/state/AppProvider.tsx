import axios from "axios";
import { useCallback, useMemo, useReducer } from "react";
import { AppContext } from "./useAppContext";

interface Props {
	children: React.ReactNode;
}

export type History = {
	name: string;
	symbol: string;
	price_history: [number, number][];
};

type HistoryObject = Record<string, History>;

export type initialStateProps = {
	coin: HistoryObject;
	loading: boolean;
	error: string | null;
};

const initialState: initialStateProps = {
	coin: {},
	loading: false,
	error: null,
};

type Action =
	| { type: "FETCH_START" }
	| { type: "FETCH_SUCCESS"; payload: History }
	| { type: "FETCH_ERROR"; payload: string };

const reducer = (state: initialStateProps, action: Action) => {
	switch (action.type) {
		case "FETCH_START":
			return { ...state, loading: true };
		case "FETCH_SUCCESS":
			return {
				...state,
				loading: false,
				coin: {
					...state.coin,
					[action.payload.name.toLowerCase()]: action.payload,
				},
			};
		case "FETCH_ERROR":
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export function AppProvider({ children }: Props) {
	const [historyCoin, dispatchHistoryCoin] = useReducer(reducer, initialState);

	console.log(historyCoin);

	const getHistoryCoin = useCallback(async (currency: string) => {
		dispatchHistoryCoin({ type: "FETCH_START" });

		try {
			const res = await axios.get(
				`https://production-api.mobula.io/api/1/market/history?asset=${currency}&from=1697648158`,
			);
			dispatchHistoryCoin({
				type: "FETCH_SUCCESS",
				payload: res.data.data,
			});
		} catch (error: any) {
			dispatchHistoryCoin({ type: "FETCH_ERROR", payload: error.message });
		}
	}, []);

	const contextValue = useMemo(
		() => ({
			historyCoin,
			getHistoryCoin,
		}),
		[historyCoin, getHistoryCoin],
	);

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	);
}
