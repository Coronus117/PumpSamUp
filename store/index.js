import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  votes: 10,
  // voteHistory: {
  // v2023_03_13: [
  //   { name: "Tricep Dips", votes: 0 },
  //   { name: "Bent Over Row", votes: 0 },
  //   { name: "Lunge", votes: 0 },
  //   { name: "Glute Bridge", votes: 0 },
  // ],
  // },
  changed: false,
  nextShowData: [
    // { name: "Tricep Dips", pumpType: "rep", pumps: 0 },
    // { name: "Bent Over Row", pumpType: "rep", pumps: 0 },
    // { name: "Lunge", pumpType: "rep", pumps: 0 },
    // { name: "Glute Bridge", pumpType: "rep", pumps: 0 },
  ],
};

const voteSlice = createSlice({
  name: "voteData",
  initialState: initialState,
  reducers: {
    replaceVotes(state, action) {
      state.votes = action.payload.votes;
      state.voteHistory = action.payload.voteHistory;
      // If the date is NOT found in the user history, add it
      // if (
      //   !state.voteHistory.hasOwnProperty(
      //     action.payload.nextShowDateUserHistoryKey
      //   )
      // ) {
      //   state.voteHistory[action.payload.nextShowDateUserHistoryKey] =
      //     action.payload.currentExercises.map((ex) => {
      //       return { name: ex, votes: 0 };
      //     });
      // }
    },
    exerciseVoteIncrement(state, action) {
      state.changed = true;
      state.votes -= 1;
      // Increase the vote for the specific exercise in user history
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
      // Increase the vote for the specific exercise for this show
      state.nextShowData = state.nextShowData.map((ex) => {
        if (ex.name === action.payload.name) {
          ex.votes = ex.votes + 1;
        }
        return ex;
      });
    },
    exerciseVoteDecrement(state, action) {
      state.changed = true;
      state.votes += 1;
      // Decrease the vote for the specific exercise
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
      // Decrease the vote for the specific exercise for this show
      state.nextShowData = state.nextShowData.map((ex) => {
        if (ex.name === action.payload.name) {
          ex.votes = ex.votes - 1;
        }
        return ex;
      });
    },
    replaceShow(state, action) {
      state.nextShowData = action.payload.nextShowExerciseData;
      state.nextShowName = action.payload.nextShowName;
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
