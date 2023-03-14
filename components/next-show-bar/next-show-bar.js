import React from "react";
import ShowExercise from "./show-exercise";
import { useSelector } from "react-redux";

const NextShowBar = () => {
  const show = useSelector((state) => state.nextShowData);
  return (
    <div className="flex justify-center">
      <div className="space-y-3  lg:w-1/2 w-full">
        <div className="text-lg font-medium">NEXT SHOW:</div>
        {show.map((ex) => {
          return <ShowExercise key={ex.name} exercise={ex} />;
        })}
      </div>
    </div>
  );
};

export default NextShowBar;
