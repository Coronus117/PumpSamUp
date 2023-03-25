import React from "react";
import ExerciseVote from "./exercise-vote";
import { useSelector } from "react-redux";
import PumpBank from "../pump-bank/pump-bank";
import { useSession, signOut } from "next-auth/client";

const PumpVoteBar = () => {
  const [session, loading] = useSession();
  const voteHistory = useSelector((state) => state.voteHistory);
  const nextShowName = useSelector((state) => state.nextShowName);

  return (
    <div className=" rounded-lg p-4 space-y-3">
      <div className="flex flex-row justify-between">
        <div className="text-xl font-medium flex items-center">
          Vote on exercises for the next show
        </div>
        {session && <PumpBank />}
      </div>
      <div className="gap-4 grid grid-cols-2 lg:grid-cols-4">
        {voteHistory &&
          nextShowName &&
          voteHistory[nextShowName].map((ex) => (
            <ExerciseVote
              key={ex.name}
              exerciseName={ex.name}
              exerciseVotes={ex.votes}
              showDate={nextShowName}
            />
          ))}
      </div>
    </div>
  );
};

export default PumpVoteBar;
