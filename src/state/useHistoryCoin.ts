import axios from "axios";
import { create } from "zustand";

export type History = {
	name: string;
	symbol: string;
	price_history: [number, number][];
};

type HistoryObject = Record<string, History>;

interface HistoryStore {
	coin: HistoryObject
	loading: boolean;
	error: string | null;
	getHistoryCoin: (currency: string) => Promise<void>;
}

export const useHistoryCoin = create<HistoryStore>((set) => ({
  coin: {} ,
  loading: false,
  error: null,
  getHistoryCoin: async (currency: string) => {
    set({loading: true});

    try{
      const {data} = await axios.get(`https://production-api.mobula.io/api/1/market/history?asset=${currency}&from=1697648158`)

      set(state => ({
        loading: false,
        coin: {
          ...state.coin,
          [data.data.name.toLowerCase()]: data.data
        }
      }))
    }catch(error: any){
      set({
        loading: false,
        error: error.message
      })
    }
  }
}))



