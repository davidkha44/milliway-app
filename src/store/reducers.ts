import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Seed = number | number[];
type Gender = "male" | "female";

const indexSlice = createSlice({
  name: "index",
  initialState: {
    row1: 0,
    row2: [0, 0, 0, 0, 0, 0],
    row3: [0, 0, 0],
    gender: "male",
    seed: [0, 0, 0, [0, 0], [0, 0], [0, 0]],
  },
  reducers: {
    setRow1(state, action: PayloadAction<number>) {
      state.row1 = action.payload;
    },

    setRow2(state, action: PayloadAction<number[]>) {
      state.row2 = action.payload;
    },

    setRow3(state, action: PayloadAction<number[]>) {
      state.row3 = action.payload;
    },

    setGender(state, action: PayloadAction<Gender>) {
      state.gender = action.payload;
    },

    setSeed(state, action: PayloadAction<Seed[]>) {
      state.seed = action.payload;
    },
  },
});

export const { setRow1, setRow2, setRow3, setGender, setSeed } =
  indexSlice.actions;

export default indexSlice.reducer;
