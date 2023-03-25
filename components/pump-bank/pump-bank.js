import React from "react";
import { useSelector } from "react-redux";

const PumpBank = () => {
  const votes = useSelector((state) => state.votes);
  return (
    <div className="flex justify-end">
      <div className="hidden md:flex md:visible bg-gray-300 px-4 lg:px-6 lg:py-3 rounded-xl w-max lg:text-lg font-semibold flex items-center">{`Vote Bank: ${votes}`}</div>
      <div className="bg-gray-300 space-x-2 px-4 lg:px-6 lg:py-3 rounded-xl w-max lg:text-lg font-semibold flex items-center flex-row lg:hidden">
        <div className="flex flex-col text-center">
          <div>Vote</div>
          <div>Bank</div>
        </div>
        <div className="text-4xl">{votes}</div>
      </div>
    </div>
  );
};

export default PumpBank;
