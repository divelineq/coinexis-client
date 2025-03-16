import { create } from "zustand";

type LoginState = {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;}

export const useLogin = create<LoginState>((set) => ({
  loggedIn: false,
  setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
}));