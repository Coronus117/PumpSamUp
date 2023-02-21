import React from "react";
import ExerciseVote from "./exercise-vote";
import { getCurrentExerciseRoutine, getFilteredExercise } from "@/exercises";

const PumpVoteBar = () => {
  const currentExRoutine = getCurrentExerciseRoutine();
  console.log("currentExRoutine ", currentExRoutine);
  return (
    <div className="flex space-x-4">
      {currentExRoutine &&
        currentExRoutine.map((ex) => {
          let exerciseData = getFilteredExercise(ex);
          return <ExerciseVote key={ex} exercise={exerciseData} />;
        })}
    </div>
  );
};

export default PumpVoteBar;
