import React from "react";
import PumpVoteButton from "./pump-vote-button";

const ExerciseVote = ({ exercise }) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-xl p-4 border-2 border-gray-400">
      <div>{exercise.name}</div>
      <div className="text-5xl">10</div>
      <div className="mt-3">
        <PumpVoteButton />
      </div>
    </div>
  );
};

export default ExerciseVote;
