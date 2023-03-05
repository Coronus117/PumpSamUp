import React from "react";
import PumpVoteButton from "./pump-vote-button";
import { useSelector, useDispatch } from "react-redux";

import { voteActions } from "@/store";

const ExerciseVote = ({ exercise, nextShowDateUserHistoryKey }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  // const voteHandler = (direction) => {
  //   if (direction === "up") {
  //     incrementCookie("votes", -1);
  //     setCurrUserVotes((prevState) => (prevState += 1));
  //   } else {
  //     incrementCookie("votes", 1);
  //     setCurrUserVotes((prevState) => (prevState -= 1));
  //   }
  // };

  // const { data, isLoading } = useSWR(
  //   "https://pumpsamup-default-rtdb.firebaseio.com/votes.json",
  //   (url) => fetch(url).then((res) => res.json())
  // );

  const addVoteHandler = (voteModifier) => {
    let voteData = 0;
    if (voteModifier === "up") {
      // voteData = currUserVotes - 1;
      console.log("dispatch increment");
      dispatch(
        voteActions.exerciseVoteIncrement({
          date: nextShowDateUserHistoryKey,
          name: exercise.name,
        })
      );
    } else {
      // voteData = currUserVotes + 1;
      console.log("dispatch decrement");
      dispatch(
        voteActions.exerciseVoteDecrement({
          date: nextShowDateUserHistoryKey,
          name: exercise.name,
        })
      );
    }
  };

  // Get how many votes the user spent on this exercise for the upcoming show
  // All spent points are in the user's voteHistory.
  // console.log("exercise-vote, store.voteHistory ", store.voteHistory);

  const thisExercise = store.voteHistory[nextShowDateUserHistoryKey].filter(
    (ex) => {
      return ex.name === exercise.name;
    }
  );
  const votesSpent = thisExercise[0].votes;

  return (
    <div className="flex flex-col items-center bg-white rounded-xl p-2 border-2 border-gray-400 min-w-max">
      <div>{exercise.name}</div>
      <div className="text-5xl">{votesSpent}</div>
      <div className="mt-3 w-full">
        <PumpVoteButton onClick={addVoteHandler} currVoteCount={votesSpent} />
      </div>
    </div>
  );
};

export default ExerciseVote;
