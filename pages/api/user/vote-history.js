import { getSession } from "next-auth/client";
import { connectDatabase, getAllDocuments } from "@/helpers/db-util";
import { getCurrentExerciseRoutine } from "@/pages/api/date-time";
import {
  getNextShowDate,
  getNextShowDateStringForHistory,
} from "@/helpers/helpers";

const handler = async (req, res) => {
  if (req.method === "GET") {
    // Make sure user is authenticated, then use their email to get their data (vote history)
    const session = await getSession({ req: req });

    // console.log("session ", session);
    if (session) {
      const userEmail = session.user.email;

      // Connect to mongodb
      let client;
      try {
        client = await connectDatabase();
      } catch (error) {
        res.status(500).json({ message: "Connecting to the database failed!" });
        return;
      }

      // Get the documents for this user
      const usersCollection = client.db().collection("users");
      let user = await usersCollection.findOne({ email: userEmail });
      client.close();

      // console.log("user ", user);
      // Look inside voteHistory and see if we can find the current exercise date
      const nextShowDate = getNextShowDate();
      const nextShowDateFormatted =
        getNextShowDateStringForHistory(nextShowDate);
      if (!user.voteHistory.hasOwnProperty(nextShowDateFormatted)) {
        const currentExercises = getCurrentExerciseRoutine();
        user.voteHistory[nextShowDateFormatted] = currentExercises.map((ex) => {
          return { name: ex, votes: 0 };
        });
      }

      res
        .status(200)
        .json({ voteHistory: user.voteHistory, votes: user.votes });
    } else {
      // No user logged in, put placeholder variables for current user votes

      // Look inside voteHistory and see if we can find the current exercise date
      const nextShowDate = getNextShowDate();
      const nextShowDateFormatted =
        getNextShowDateStringForHistory(nextShowDate);

      const currentExercises = getCurrentExerciseRoutine();
      const blankVoteHistory = {};
      blankVoteHistory[nextShowDateFormatted] = currentExercises.map((ex) => {
        return { name: ex, votes: 0 };
      });

      res.status(200).json({ voteHistory: blankVoteHistory, votes: 1 });
    }
  }
  if (req.method === "PUT") {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const userEmail = session.user.email;
    const newVoteHistory = req.body.state.voteHistory;
    const votes = req.body.state.votes;

    const client = await connectDatabase();

    const usersCollection = client.db().collection("users");

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      client.close();
      return;
    }

    const result = await usersCollection.updateOne(
      { email: userEmail },
      { $set: { voteHistory: newVoteHistory, votes: votes } }
    );

    client.close();
    res.status(200).json({ message: "voteHistory Updated!" });
  }
};

export default handler;
