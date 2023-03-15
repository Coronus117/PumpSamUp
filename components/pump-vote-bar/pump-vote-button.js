import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Spinner from "../ui/Spinner";
import ArrowUp from "../icons/ArrowUp";
import ArrowDown from "../icons/ArrowDown";

const PumpVoteButton = ({ onClick, currVoteCount, loading }) => {
  const votes = useSelector((state) => state.votes);
  return (
    <Fragment>
      {currVoteCount === 0 ? (
        <button
          onClick={() => onClick("up")}
          disabled={!votes || loading}
          className="bg-gray-300 py-2 border-2 select-none border-gray-300 hover:bg-gray-400 active:bg-white rounded-md disabled:opacity-50 disabled:pointer-events-none w-full flex justify-center items-center"
        >
          {loading ? <Spinner /> : "VOTE"}
        </button>
      ) : (
        <div className="w-full gap-2 grid grid-cols-2">
          <button
            onClick={() => onClick("down")}
            disabled={loading}
            className="bg-gray-300 h-10 border-2 select-none border-gray-300 hover:bg-gray-400 active:bg-white rounded-md flex justify-center items-center"
          >
            <ArrowDown />
          </button>
          <button
            onClick={() => onClick("up")}
            disabled={!votes || loading}
            className="bg-gray-300 h-10 border-2 select-none border-gray-300 hover:bg-gray-400 active:bg-white rounded-md disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center"
          >
            <ArrowUp />
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default PumpVoteButton;
