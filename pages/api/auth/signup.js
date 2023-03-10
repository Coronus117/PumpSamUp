import { connectDatabase } from "../../../helpers/db-util";
import { hashPassword } from "@/helpers/auth";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;

    // validate data
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      return res.status(422).json({
        error:
          "Invalid Input - Password should also be at least 7 characters long.",
      });
    }

    const client = await connectDatabase();
    const db = client.db();

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ error: "User exists already!" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);
    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
      votes: 10,
      voteHistory: {},
    });

    // TODO: Error handling

    res.status(201).json({ message: "Created User!" });
    client.close();
  }
};

export default handler;
