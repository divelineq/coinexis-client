import axios from "axios";
import { create } from "zustand";
type Contracts = {
  address: string;
  blockchain: string;
  blockchainId: string;
  decimals: string;
};

type Api = {
  ath: number;
  atl: number;
  circulating_supply: number;
  contracts: Contracts[];
  decimals: number;
  id: number;
  is_listed: boolean;
  liquidity: number;
  logo: string;
  market_cap: number;
  market_cap_diluted: number;
  name: string;
  off_chain_volume: number;
  price: number;
  price_change_1h: number;
  price_change_1m: number;
  price_change_1y: number;
  price_change_7d: number;
  price_change_24h: number;
  rank: number;
  symbol: string;
  total_supply: string;
  volume: number;
  volume_7d: number;
  volume_change_24h: number;
} & {
  loading: boolean;
  error: string | null;
  getCurrencyCoin: (currency: string) => Promise<void>}

const initialApiState: Omit<Api, 'getCurrencyCoin'>  = {
  ath: 0,
  atl: 0,
  circulating_supply: 0,
  contracts: [],
  decimals: 0,
  id: 0,
  is_listed: false,
  liquidity: 0,
  logo: "",
  market_cap: 0,
  market_cap_diluted: 0,
  name: "",
  off_chain_volume: 0,
  price: 0,
  price_change_1h: 0,
  price_change_1m: 0,
  price_change_1y: 0,
  price_change_7d: 0,
  price_change_24h: 0,
  rank: 0,
  symbol: "",
  total_supply: "",
  volume: 0,
  volume_7d: 0,
  volume_change_24h: 0,
  loading: false,
  error: null,
}

export const useCurrencyCoin = create<Api>((set) => ({
  ...initialApiState,
  getCurrencyCoin: async (currency: string) => {
    set({ loading: true });

    try{
      const {data} = await axios.get(
        `https://production-api.mobula.io/api/1/market/data?asset=${currency}`,
      );
      set({ ...data.data, loading: false });
    }catch (error: any) {
      set({
        loading: false,
        error: error.message,
      });
    }
  }

}))