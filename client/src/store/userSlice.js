import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "aum bangkok",
  user: [],
};

export const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.value = "aum login";
      state.user = "aum user";
    },
    logout: (state) => {
      state.value = "aum logout";
      state.user = " aum user logout";
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, incrementByAmount } = useSlice.actions;

export default useSlice.reducer;
