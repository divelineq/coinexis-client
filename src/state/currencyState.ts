import { create } from "zustand"

type CurrencyState = {
  currencyName: string
  setCurrency: (currency: string) => void
}

export const useCurrency = create<CurrencyState>((set) => ({
  currencyName: "BTC",
  setCurrency: (currencyName: string) => set({ currencyName }),
}))