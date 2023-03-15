import { getSession } from "next-auth/client";
import { connectDatabase, getAllDocuments } from "@/helpers/db-util";
import { getCurrentExerciseRoutine } from "@/pages/api/date-time";

import {
  getNextShowDate,
  getNextShowDateStringForHistory,
} from "@/helpers/helpers";

const handler = async (req, res) => {
  if (req.method === "GET") {
    // Connect to mongodb
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Connecting to the database failed!" });
    }

    const nextShowDate = getNextShowDate();
    const nextShowDateFormatted = getNextShowDateStringForHistory(nextShowDate);
    // Get the documents for this show
    const showsCollection = client.db().collection("shows");
    let nextShow = await showsCollection.findOne({
      name: nextShowDateFormatted,
    });
    client.close();

    // If we didn't get the data from the db, then we'll instantiate a brand new data now
    if (!nextShow) {
      const currentExercises = getCurrentExerciseRoutine();
      nextShow = {
        name: nextShowDateFormatted,
        exercises: currentExercises.map((ex) => {
          return {
            name: ex,
            votes: 0,
          };
        }),
      };
    }

    // console.log("nextShow ", nextShow);
    return res.status(200).json(nextShow);
  }
  if (req.method === "PUT") {
    const session = await getSession({ req: req });

    if (!session) {
      return res.status(401).json({ message: "Not authenticated!" });
    }

    // Connect to mongodb
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Connecting to the database failed!" });
    }

    const nextShowDate = getNextShowDate();
    const nextShowDateFormatted = getNextShowDateStringForHistory(nextShowDate);
    // Get the documents for this user
    const showsCollection = client.db().collection("shows");

    const newShowVotes = req.body.newShowVotes;
    // console.log("newShowVotes ", newShowVotes);

    // Check if user already exists
    const existingShow = await showsCollection.findOne({
      name: nextShowDateFormatted,
    });
    if (existingShow) {
      const result = await showsCollection.updateOne(
        { name: nextShowDateFormatted },
        { $set: { exercises: newShowVotes } }
      );
    } else {
      const result = await showsCollection.insertOne({
        name: nextShowDateFormatted,
        exercises: newShowVotes,
      });
    }

    client.close();
    return res.status(200).json({ message: "Show Votes Updated!" });
  }
  // res.status(500).json({ message: "HOW DID YOU GET HERE" });
};

export default handler;
