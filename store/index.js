import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  votes: 10,
  voteHistory: {
    v2023_03_02: [
      { name: "Tricep Dips", votes: 0 },
      { name: "Bicep Curls", votes: 0 },
      { name: "Calf Raise", votes: 0 },
      { name: "Crunch", votes: 0 },
    ],
  },
};

const voteSlice = createSlice({
  name: "voteData",
  initialState: initialState,
  reducers: {
    exerciseVoteIncrement(state, action) {
      state.votes -= 1;
      state.voteHistory = {
        [action.payload.date]: state.voteHistory[action.payload.date].map(
          (ex) => {
            if (ex.name === action.payload.name) {
              ex.votes = ex.votes + 1;
            }
            return ex;
          }
        ),
      };
    },
    exerciseVoteDecrement(state, action) {
      state.votes += 1;
      state.voteHistory = {
        [action.payload.date]: state.voteHistory[action.payload.date].map(
          (ex) => {
            if (ex.name === action.payload.name) {
              ex.votes = ex.votes - 1;
            }
            return ex;
          }
        ),
      };
    },
  },
});
// Multiple reducers can be used / combined like this!...
// const store = configureStore({ reducer: { votes: voteSlice.reducer } });
// Just one reducer
const store = configureStore({
  reducer: voteSlice.reducer,
});

export const voteActions = voteSlice.actions;

export default store;
