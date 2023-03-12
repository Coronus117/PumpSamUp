import React from "react";

const ShowExercise = ({ exercise }) => {
  return (
    <div className="border-2 bg-white  border-gray-600 rounded-lg px-4 py-2 text-lg flex justify-between">
      <div>{exercise.name}</div>
      <div>1000</div>
    </div>
  );
};

export default ShowExercise;
