import { createContext, useContext } from "react";

type AppContext = {
  historyCoin: {
    coin: any
    loading: boolean;
    error: string | null;
  };
  getHistoryCoin: (currency: string) => Promise<void>;
}

export const AppContext = createContext<AppContext | null>(null);

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
