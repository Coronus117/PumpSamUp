import React from "react";
import ExerciseVote from "./exercise-vote";
import { useSelector } from "react-redux";

const PumpVoteBar = () => {
  const voteHistory = useSelector((state) => state.voteHistory);
  const nextShowName = useSelector((state) => state.nextShowName);

  // console.log("voteHistory ", voteHistory);
  // console.log("nextShowName ", nextShowName);

  return (
    <div className=" rounded-lg p-4 space-y-3">
      <div className="text-lg font-medium">
        Vote on exercises for the next show
      </div>
      <div className="gap-4 grid grid-cols-2 lg:grid-cols-4">
        {voteHistory &&
          nextShowName &&
          voteHistory[nextShowName].map((ex) => (
            <ExerciseVote
              key={ex.name}
              exerciseName={ex.name}
              exerciseVotes={ex.votes}
              showDate={nextShowName}
            />
          ))}
      </div>
    </div>
  );
};

export default PumpVoteBar;
