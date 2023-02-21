import * as React from "react";
import PumpBank from "@/components/pump-bank/pump-bank";
import PumpVoteBar from "@/components/pump-vote-bar/pump-vote-bar";

export default function Home() {
  return (
    <div className="p-4">
      <PumpBank />
      <div className="flex justify-center">
        <PumpVoteBar />
      </div>
    </div>
  );
}
