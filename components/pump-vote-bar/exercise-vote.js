import React, { useState } from "react";
import PumpVoteButton from "./pump-vote-button";
import { useSelector, useDispatch } from "react-redux";

import { voteActions } from "@/store";

import { useSession, signOut } from "next-auth/client";

import AuthForm from "../auth/auth-form";

const ExerciseVote = ({ exercise, nextShowDateUserHistoryKey }) => {
  const [signinModalOpen, setSigninModalOpen] = useState(false);
  const [session, loading] = useSession();

  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  // const voteHandler = (direction) => {
  //   if (direction === "up") {
  //     incrementCookie("votes", -1);
  //     setCurrUserVotes((prevState) => (prevState += 1));
  //   } else {
  //     incrementCookie("votes", 1);
  //     setCurrUserVotes((prevState) => (prevState -= 1));
  //   }
  // };

  // const { data, isLoading } = useSWR(
  //   "https://pumpsamup-default-rtdb.firebaseio.com/votes.json",
  //   (url) => fetch(url).then((res) => res.json())
  // );

  const addVoteHandler = (voteModifier) => {
    // If user is logged in, modify votes
    if (session) {
      if (voteModifier === "up") {
        console.log("dispatch increment");
        dispatch(
          voteActions.exerciseVoteIncrement({
            date: nextShowDateUserHistoryKey,
            name: exercise.name,
          })
        );
      } else {
        console.log("dispatch decrement");
        dispatch(
          voteActions.exerciseVoteDecrement({
            date: nextShowDateUserHistoryKey,
            name: exercise.name,
          })
        );
      }
    } else {
      // if not logged in, show modal to log in
      setSigninModalOpen(true);
    }
  };

  // Get how many votes the user spent on this exercise for the upcoming show
  // All spent points are in the user's voteHistory.
  // console.log("exercise-vote, store.voteHistory ", store.voteHistory);

  const thisExercise = store.voteHistory[nextShowDateUserHistoryKey].filter(
    (ex) => {
      return ex.name === exercise.name;
    }
  );
  const votesSpent = thisExercise[0].votes;

  return (
    <div>
      {signinModalOpen && (
        // <ModalSignin
        //   open={signinModalOpen}
        //   requestClose={() => setSigninModalOpen(false)}
        // />

        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-60">
          <div className="relative w-80 my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <button
                className="bg-transparent border-0 text-black"
                onClick={() => setSigninModalOpen(false)}
              >
                <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                  x
                </span>
              </button>

              <AuthForm />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center bg-white rounded-xl p-2 border-2 border-gray-400 min-w-max">
        <div>{exercise.name}</div>
        <div className="text-5xl">{votesSpent}</div>
        <div className="mt-3 w-full">
          <PumpVoteButton
            onClick={addVoteHandler}
            currVoteCount={votesSpent}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ExerciseVote;
