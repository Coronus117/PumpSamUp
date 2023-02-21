import React from "react";
import PumpVoteButton from "./pump-vote-button";

const ExerciseVote = ({ exercise }) => {
  return (
    <div className="flex flex-col items-center">
      <div>{exercise.name}</div>
      <div className="text-5xl">10</div>
      <PumpVoteButton />
    </div>
  );
};

export default ExerciseVote;
