import React, { useState, useEffect } from "react";
import ExerciseVote from "./exercise-vote";
import { getFilteredExercise } from "@/exercises";

const PumpVoteBar = () => {
  const [showData, setShowData] = useState();

  useEffect(() => {
    fetch("/api/date-time")
      .then((response) => response.json())
      .then((data) => setShowData(data));
  }, []);

  console.log("showData ", showData);

  return (
    <div className="bg-white rounded-lg p-4 border-2 border-gray-200 space-y-3 ">
      <div>Vote on exercises for the next show</div>
      <div className="gap-4 grid grid-cols-2 lg:grid-cols-4">
        {showData &&
          showData.currentExercises.map((ex) => {
            let exerciseData = getFilteredExercise(ex);
            return (
              <ExerciseVote
                key={ex}
                exercise={exerciseData}
                nextShowDateUserHistoryKey={showData.nextShowDateUserHistoryKey}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PumpVoteBar;
