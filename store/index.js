import { createStore } from "redux";

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

const votesReducer = (state = { ...initialState }, action) => {
  if (action.type === "exerciseVoteIncrement") {
    const newState = {
      ...state,
      votes: state.votes - 1,
      voteHistory: {
        [action.date]: state.voteHistory[action.date].map((ex) => {
          if (ex.name === action.name) {
            ex.votes = ex.votes + 1;
          }
          return ex;
        }),
      },
    };
    return newState;
  }

  if (action.type === "exerciseVoteDecrement") {
    const newState = {
      ...state,
      votes: state.votes + 1,
      voteHistory: {
        [action.date]: state.voteHistory[action.date].map((ex) => {
          if (ex.name === action.name) {
            ex.votes = ex.votes - 1;
          }
          return ex;
        }),
      },
    };
    return newState;
  }

  return state;
};

const store = createStore(votesReducer);

export default store;
