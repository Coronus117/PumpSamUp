import React from "react";

const ShowExercise = ({ exercise }) => {
  const { bodyPart, name, pumpType, pumpsPerRep, votes, reps } = exercise;
  return (
    <div className="border-2 bg-white  border-gray-600 rounded-lg px-4 py-2 text-lg flex flex-col">
      <div className=" flex justify-between">
        <div>{name}</div>
        <div>
          {reps} {pumpType}
        </div>
      </div>
      <div className="text-sm flex justify-between">
        <div>
          {pumpsPerRep} votes for 1 {pumpType}
        </div>
        <div className="text-sm">{votes} votes</div>
      </div>
    </div>
  );
};

export default ShowExercise;
