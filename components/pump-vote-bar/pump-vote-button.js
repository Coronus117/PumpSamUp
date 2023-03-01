import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const PumpVoteButton = ({ onClick, currVoteCount }) => {
  let votes = 10;
  // votes = useSelector((state) => state.votes);
  return (
    <Fragment>
      {currVoteCount === 0 ? (
        <button
          onClick={() => onClick("up")}
          disabled={!votes}
          className="bg-gray-300 py-2 border-2 select-none border-gray-300 hover:bg-gray-400 active:bg-white rounded-md disabled:opacity-50 disabled:pointer-events-none w-full"
        >
          VOTE
        </button>
      ) : (
        <div className="w-full gap-2 grid grid-cols-2">
          <button
            onClick={() => onClick("down")}
            className="bg-gray-300 h-10 border-2 select-none border-gray-300 hover:bg-gray-400 active:bg-white rounded-md"
          >
            -
          </button>
          <button
            onClick={() => onClick("up")}
            disabled={!votes}
            className="bg-gray-300 h-10 border-2 select-none border-gray-300 hover:bg-gray-400 active:bg-white rounded-md disabled:opacity-50 disabled:pointer-events-none"
          >
            +
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default PumpVoteButton;
