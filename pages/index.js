import * as React from "react";
import PumpBank from "@/components/pump-bank/pump-bank";
import PumpVoteBar from "@/components/pump-vote-bar/pump-vote-bar";
import NextPump from "@/components/next-pump/next-pump";

export default function Home() {
  return (
    <div className="p-3 lg:p-4 leading-tight flex justify-center ">
      <div className="lg:w-1/2 flex flex-col w-full space-y-2">
        <NextPump />
        <PumpBank />
        <PumpVoteBar />
      </div>
    </div>
  );
}
