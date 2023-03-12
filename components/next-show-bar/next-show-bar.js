import React, { useState, useEffect } from "react";
import ShowExercise from "./show-exercise";
import { getFilteredExercise } from "@/exercises";

const NextShowBar = () => {
  const [showData, setShowData] = useState();

  useEffect(() => {
    fetch("/api/date-time")
      .then((response) => response.json())
      .then((data) => setShowData(data));
  }, []);
  return (
    <div className="flex justify-center">
      <div className="space-y-3  lg:w-1/2 w-full">
        <div className="text-lg font-medium">NEXT SHOW:</div>
        {showData &&
          showData.currentExercises.map((ex) => {
            let exerciseData = getFilteredExercise(ex);
            return <ShowExercise key={ex} exercise={exerciseData} />;
          })}
      </div>
    </div>
  );
};

export default NextShowBar;
