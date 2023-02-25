import React from "react";
import ExerciseVote from "./exercise-vote";
import { getCurrentExerciseRoutine, getFilteredExercise } from "@/exercises";

const PumpVoteBar = () => {
  const currentExRoutine = getCurrentExerciseRoutine();
  return (
    <div className="bg-white rounded-lg p-4 border-2 border-gray-200 space-y-3 ">
      <div>Vote on exercises for the next show</div>
      <div className="gap-4 grid grid-cols-2 lg:grid-cols-4">
        {currentExRoutine &&
          currentExRoutine.map((ex) => {
            let exerciseData = getFilteredExercise(ex);
            return <ExerciseVote key={ex} exercise={exerciseData} />;
          })}
      </div>
    </div>
  );
};

export default PumpVoteBar;
