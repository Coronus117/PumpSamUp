import React from "react";
import ExerciseVote from "./exercise-vote";
import { getCurrentExerciseRoutine, getFilteredExercise } from "@/exercises";

const PumpVoteBar = () => {
  const currentExRoutine = getCurrentExerciseRoutine();
  console.log("currentExRoutine ", currentExRoutine);
  return (
    <div className="bg-white rounded-lg p-4 border-2 border-gray-200 space-y-3">
      <div>Vote on exercises for the next show</div>
      <div className="flex flex-wrap gap-4 justify-center lg:space-x-4 lg:flex-row lg:gap-0">
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
