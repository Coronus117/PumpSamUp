import { getSession } from "next-auth/client";
import { connectDatabase, getAllDocuments } from "@/helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "GET") {
    // Make sure user is authenticated, then use their email to get their data (vote history)
    const session = await getSession({ req: req });
    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }
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
    const user = await usersCollection.findOne({ email: userEmail });
    client.close();

    res.status(200).json({ voteHistory: user.voteHistory, votes: user.votes });
  }
  if (req.method === "PUT") {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const userEmail = session.user.email;
    const newVoteHistory = req.body.state.voteHistory;

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
      { $set: { voteHistory: newVoteHistory } }
    );

    client.close();
    res.status(200).json({ message: "voteHistory Updated!" });
  }
};

export default handler;
