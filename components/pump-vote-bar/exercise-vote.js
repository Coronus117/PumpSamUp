import React, { useState } from "react";
import PumpVoteButton from "./pump-vote-button";
import { useSelector, useDispatch } from "react-redux";

import { voteActions } from "@/store";

import { useSession } from "next-auth/client";

import AuthForm from "../auth/auth-form";

const ExerciseVote = ({ exerciseName, exerciseVotes, showDate }) => {
  const [signinModalOpen, setSigninModalOpen] = useState(false);
  const [session, loading] = useSession();

  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const addVoteHandler = (voteModifier) => {
    // If user is logged in, modify votes
    if (session) {
      if (voteModifier === "up") {
        // console.log("dispatch increment");
        dispatch(
          voteActions.exerciseVoteIncrement({
            date: showDate,
            name: exerciseName,
          })
        );
      } else {
        // console.log("dispatch decrement");
        dispatch(
          voteActions.exerciseVoteDecrement({
            date: showDate,
            name: exerciseName,
          })
        );
      }
    } else {
      // if not logged in, show modal to log in
      setSigninModalOpen(true);
    }
  };

  return (
    <div>
      {signinModalOpen && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-60">
          <div className="relative w-80 my-6 mx-auto max-w-3xl">
            <AuthForm
              inModal={true}
              modalCloseHandler={() => setSigninModalOpen(false)}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col items-center bg-white rounded-xl p-2 border-2 border-gray-400 min-w-max">
        <div>{exerciseName}</div>
        <div className="text-5xl">{exerciseVotes}</div>
        <div className="mt-3 w-full">
          <PumpVoteButton
            onClick={addVoteHandler}
            currVoteCount={exerciseVotes}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ExerciseVote;
