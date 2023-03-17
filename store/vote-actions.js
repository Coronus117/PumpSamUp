import { getFilteredExercise } from "@/exercises";
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

    try {
      const voteData = await fetchUserData();
      // console.log("voteData ", voteData);
      dispatch(
        voteActions.replaceVotes({
          votes: voteData.votes,
          voteHistory: voteData.voteHistory,
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
      console.log("Sending vote data failed!");
    }
  };
};

export const fetchShowData = () => {
  return async (dispatch) => {
    // Get next show data
    const fetchShowData = async () => {
      const response = await fetch("/api/show");
      if (!response.ok) {
        throw new Error("Could not fetch show data!");
      }
      const data = await response.json();
      return data;
    };

    try {
      let showData = await fetchShowData();
      // console.log("showData ", showData);

      const exercises = showData.exercises.map((ex) => {
        const thisExData = getFilteredExercise(ex.name);
        return {
          ...thisExData,
          votes: ex.votes,
          reps: Math.floor(ex.votes / thisExData.pumpsPerRep),
        };
      });

      // console.log("exercises ", exercises);

      dispatch(
        voteActions.replaceShow({
          nextShowName: showData.name,
          nextShowExerciseData: exercises,
        })
      );
    } catch (error) {
      console.log("error ", error);
    }
  };
};

export const sendShowData = (state) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const newShowVotes = state.nextShowData.map((ex) => {
        return {
          name: ex.name,
          votes: ex.votes,
        };
      });
      const response = await fetch("/api/show", {
        method: "PUT",
        body: JSON.stringify({ newShowVotes }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Sending show data failed.");
      }
      return data;
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log("Sending show data failed!");
    }
  };
};
