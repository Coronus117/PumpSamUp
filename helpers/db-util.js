import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const client = await MongoClient.connect(
    `mongodb+srv://${user}:${password}@pumpsamup.hwuvuww.mongodb.net/events?retryWrites=true&w=majority`
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}

// export async function getServerSideProps() {
//   const user = process.env.DB_USER;
//   const password = process.env.DB_PASSWORD;
//   return {
//     props: {
//       user: user,
//       password: password,
//     },
//   };
// }
