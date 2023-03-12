import { voteActions } from "@/store";

export const fetchVoteData = () => {
  return async (dispatch) => {
    // Get user vote history
    const fetchUserData = async () => {
      const response = await fetch("/api/user/vote-history");
      if (!response.ok) {
        throw new Error("Could not fetch user data!");
      }
      const data = await response.json();
      return data;
    };

    // Get global info on next show date
    const fetchNextShowData = async () => {
      const response = await fetch("/api/date-time");
      if (!response.ok) {
        throw new Error("Could not fetch date-time data!");
      }
      const data = await response.json();
      return data;
    };

    try {
      const voteData = await fetchUserData();
      const showData = await fetchNextShowData();
      console.log("voteData ", voteData);
      console.log("showData ", showData);
      dispatch(
        voteActions.replaceVotes({
          votes: voteData.votes,
          voteHistory: voteData.voteHistory,
          nextShowDateUserHistoryKey: showData.nextShowDateUserHistoryKey,
          currentExercises: showData.currentExercises,
        })
      );
    } catch (error) {
      console.log("error ", error);
    }
  };
};

export const sendVoteData = (state) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("/api/user/vote-history", {
        method: "PUT",
        body: JSON.stringify({ state }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Sending vote data failed.");
      }
      return data;
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log("Sending cart data failed!");
    }
  };
};
