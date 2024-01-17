import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const saveStateToLocalStorage = (state: RootState) => {
  if (typeof window !== "undefined") {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("walletState", serializedState);
  }
};

const loadStateFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const serializedState = localStorage.getItem("walletState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  }
  return undefined;
};

const INITIAL_STATE = loadStateFromLocalStorage() || {
  money: 0,
  cryptoCurrency: [],
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState: INITIAL_STATE,
  reducers: {
    addMoney: (state, action) => {
      state.money += action.payload;
      saveStateToLocalStorage(state);
    },

    removeMoney: (state, action) => {
      state.money -= action.payload;
      saveStateToLocalStorage(state);
    },
    addCryptoCurrency: (state, action) => {
      const { coinName, value } = action.payload;
      console.log("value", value);
      const newCryptoCurrency = {
        coinName,
        value,
        id: state.cryptoCurrency.length,
      };

      state.cryptoCurrency.push(newCryptoCurrency);
      state.money -= value;

      saveStateToLocalStorage(state);
    },

    loadMoneyFromLocalStorage: (state, action) => {
      const loadedState = loadStateFromLocalStorage();
      if (loadedState) {
        state.money = loadedState.money;
      }
    },
  },
});

export const {
  addMoney,
  removeMoney,
  loadMoneyFromLocalStorage,
  addCryptoCurrency,
} = walletSlice.actions;

export const selectWallet = (state: RootState) => state.wallet;

export default walletSlice.reducer;
