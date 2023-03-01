import React from "react";
import { useSelector } from "react-redux";

const PumpBank = () => {
  // const votes = useSelector((state) => state.votes);
  const votes = 11;
  return (
    <div className="flex justify-end">
      {votes && (
        <div className="bg-gray-300 p-4 rounded-xl text-lg font-semibold">{`Vote Bank: ${votes}/10`}</div>
      )}
    </div>
  );
};

export default PumpBank;
