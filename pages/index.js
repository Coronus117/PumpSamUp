import * as React from "react";
import PumpVoteBar from "@/components/pump-vote-bar/pump-vote-bar";
import NextPump from "@/components/next-pump/next-pump";
import NextShowBar from "@/components/next-show-bar/next-show-bar";

export default function Home() {
  return (
    <div className="p-3 lg:p-4 leading-tight flex justify-center ">
      <div className="lg:w-1/2 flex flex-col w-full space-y-8">
        {/* <NextPump /> */}
        <NextShowBar />
        <PumpVoteBar />
        <div>
          {/* <iframe
            className="w-full h-72"
            src={`https://rumble.com/embed/v6uz6v/?pub=7a20&rel=0&autoplay=2`}
            allowFullScreen
          /> */}
        </div>
      </div>
    </div>
  );
}
