import { connectDatabase } from "@/helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    // Connect to mongodb
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Connecting to the database failed!" });
    }

    // Get all documents for all users
    const usersCollection = client.db().collection("users");
    const result = await usersCollection.updateMany(
      {}, // filter
      { $inc: { votes: 5 } }
    );
    client.close();

    return res
      .status(200)
      .json({ message: "All Users Votes have been incremented by 5!" });
  }
};

export default handler;
