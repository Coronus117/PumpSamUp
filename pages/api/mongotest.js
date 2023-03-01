import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../helpers/db-util";

async function handler(req, res) {
  let client;
  console.log("HANDLER ");
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "newsletter", {
        email: -1,
      });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed." });
    }
  }
}

export default handler;
