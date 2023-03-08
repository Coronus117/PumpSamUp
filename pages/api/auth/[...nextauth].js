import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../helpers/auth";
import { connectDatabase } from "@/helpers/db-util";

export default NextAuth({
  session: { jwt: true },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectDatabase();

        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          // throw new Error("No user found!");
          res.status(422).json({ message: "No user found!" });
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          // throw new Error("invalid");
          res.status(422).json({ message: "Invalid credentials" });
        }

        client.close();

        // to be encoded in json web token
        return { email: user.email };
      },
    }),
  ],
});
