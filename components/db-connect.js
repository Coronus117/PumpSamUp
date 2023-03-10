import React, { useEffect } from "react";
import {
  fetchVoteData,
  sendVoteData,
  fetchShowData,
  sendShowData,
} from "@/store/vote-actions";
import { useSelector, useDispatch } from "react-redux";

let isInitial = true;

const DbConnect = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchVoteData());
    dispatch(fetchShowData());
  }, [dispatch]);

  useEffect(() => {
    // console.log("isInitial ", isInitial);
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (state.changed) {
      // console.log("State CHANGED!");
      dispatch(sendVoteData(state));
      dispatch(sendShowData(state));
    }
  }, [state, dispatch]);
  return <div></div>;
};

export default DbConnect;
