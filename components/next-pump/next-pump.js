import React from "react";

const NextPump = () => {
  return (
    <div className="flex justify-center">
      <div className="text-lg w-full lg:w-2/3 bg-gray-300 p-3 rounded-xl space-y-2 leading-tight">
        <div className="flex flex-col lg:flex-row">
          <div className="font-bold">Next LIVE Pumps: </div>
          <div className="pl-8 lg:pl-1">Monday 2/13 @ 8pm EST</div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="font-bold">Countdown: </div>
          <div className="pl-8 lg:pl-1">154 hours, 33 minutes</div>
        </div>
      </div>
    </div>
  );
};

export default NextPump;
