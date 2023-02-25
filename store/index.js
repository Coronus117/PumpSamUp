import { createStore } from "redux";

const initialState = {
  votes: 10,
  voteHistory: {
    v2023_02_27: [
      { name: "Bench Press", votes: 0 },
      { name: "Bent Over Row", votes: 0 },
      { name: "Squat", votes: 0 },
      { name: "Plank", votes: 0 },
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
